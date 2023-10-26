"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import { useRouter } from "next/navigation";

const AddUserDetails = () => {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: updateUser, isLoading: updateUserLoading } =
    trpc.userRouter.updateUser.useMutation({
      onSuccess: () => {
        utils.userRouter.getUser.invalidate();
        toast({
          title: "Benutzer erfolgreich geändert",
          description: `Dein Benutzer wurde erfolgreich geändert. Du wirst gleich weitergeleitet.`,
          variant: "default",
          action: (
            <ToastAction altText="Zurück zum Dashboard">
              <Link href={"/"}>Dashboard</Link>
            </ToastAction>
          ),
        });
        setTimeout(() => {
          router.push("/company");
        }, 2000);
      },
    });
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  useEffect(() => {
    if (!isLoading && user) {
      if (user.firstName !== null) {
        setFirstName(user.firstName);
      }
      if (user.lastName !== null) {
        setLastName(user.lastName);
      }
    }
  }, [isLoading, user]);

  return (
    <div className="py-10">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400">
          Angemeldet mit: {user?.email || <Skeleton className="h-5 w-40" />}
        </div>
        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Benutzer Informationen
        </p>
        <Progress className="mt-1 h-2" value={33} />
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <h1 className="text-center text-2xl font-bold lg:text-4xl">
            Willkommen bei talentstark.
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Du hast dich für eine ausgezeichnete Lösung im HR & Recruiting
            Bereich entschieden. Um starten zu können richten wir nun deinen
            Account vollständig ein.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-sm space-y-2">
          <div>
            <Label>Vorname</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input required onChange={(e) => setFirstName(e.target.value)} />
            )}
          </div>

          <div>
            <Label>Nachname</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input required onChange={(e) => setLastName(e.target.value)} />
            )}
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <Button
            onClick={() => {
              if (firstName && lastName) {
                updateUser({ firstName, lastName });
              } else {
                toast({
                  title: "Gib deinen Vor- & Nachnamen ein",
                  description: `Deine Daten werden sicher gespeichert und niemals an Dritte weitergegeben. Mehr dazu findest du unter Datenschutz.`,
                  variant: "destructive",
                });
              }
            }}
          >
            {updateUserLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Speichern & weiter"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUserDetails;
