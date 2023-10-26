"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { UserCog2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const EditUserDetails = () => {
  const utils = trpc.useUtils();
  const { data: user, isLoading } = trpc.userRouter.getUser.useQuery();
  const { toast } = useToast();
  const updateUser = trpc.userRouter.updateUser.useMutation({
    onSuccess: () => {
      utils.userRouter.getUser.invalidate();
      toast({
        title: "Benutzer erfolgreich geändert",
        description: `Dein Benutzer wurde erfolgreich geändert.`,
        variant: "default",
        action: (
          <ToastAction altText="Zurück zum Dashboard">
            <Link href={"/"}>Dashboard</Link>
          </ToastAction>
        ),
      });
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
    <div className="mx-auto my-8 max-w-7xl px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <div className="mx-auto inline-block rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200">
          Angemeldet mit: {user?.email}
        </div>
        <UserCog2 className="mt-8 h-10 w-10" />
        <h1 className="text-center text-2xl font-bold">
          Bearbeite deinen Account
        </h1>
      </div>

      <div className="mx-auto mt-8 max-w-sm space-y-2 rounded-lg border p-6 shadow-sm">
        <div>
          <Label>Vorname</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              onChange={(e) => setFirstName(e.target.value)}
              defaultValue={`${user?.firstName}`}
            />
          )}
        </div>

        <div>
          <Label>Nachname</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              onChange={(e) => setLastName(e.target.value)}
              defaultValue={`${user?.lastName}`}
            />
          )}
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={async () => {
            updateUser.mutate({
              firstName: firstName,
              lastName: lastName,
            });
          }}
        >
          Speichern
        </Button>
      </div>
    </div>
  );
};

export default EditUserDetails;
