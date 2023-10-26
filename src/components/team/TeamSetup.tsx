"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
const TeamSetup = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const [teamName, setTeamName] = useState<string>("");
  const { data: user } = trpc.userRouter.getUser.useQuery();
  const { mutate: addTeam, isLoading: addTeamLoading } =
    trpc.teamRouter.addTeam.useMutation({
      onSuccess: () => {
        toast({
          title: "Team erfolgreich angelegt.",
          description:
            "Dein Team wurde erfolgreich angelegt. Der Setup-Prozess ist damit zu ende.",
        });
        utils.invalidate();
        router.push("/");
      },
    });

  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center">
          <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400">
            Angemeldet mit: {user?.email || <Skeleton className="h-5 w-40" />}
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Team erstellen
          </p>
          <Progress className="mt-1 h-2" value={100} />
        </div>
        <h1 className="mt-8 flex items-center gap-2 text-center text-2xl font-bold lg:text-4xl">
          Erstelle dein erstes Team
        </h1>
        <p className="mx-auto mt-2 max-w-md text-gray-600 dark:text-gray-400">
          Erstelle nun dein erstes Team. Teams können beispielsweise sein: "
          <span className="text-blue-600">Abteilung Vertrieb</span>" oder auch "
          <span className="text-blue-600">Niederlassung Heilbronn</span>"
        </p>
        <Card className="mt-8 w-[350px]">
          <CardHeader>
            <CardTitle>Team erstellen</CardTitle>
            <CardDescription>
              Erstelle dein erstes Team in wenigen Sekunden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Teamname</Label>
                  <Input
                    onChange={(e) => setTeamName(e.target.value)}
                    id="name"
                    placeholder="Dein Team"
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => {
                if (!teamName) {
                  toast({
                    title: "Vergib einen Teamnamen",
                    description:
                      "Teamnamen können Abteilungen, Standorte oder eigene Ideen sein.",
                    variant: "destructive",
                  });
                } else {
                  addTeam({
                    teamName: teamName,
                  });
                }
              }}
              className="w-full"
            >
              {addTeamLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Team anlegen"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TeamSetup;
