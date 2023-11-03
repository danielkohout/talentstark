"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Store } from "lucide-react";

import { addTeamSchema } from "@/validators/team";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { trpc } from "@/app/_trpc/client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";
type Input = z.infer<typeof addTeamSchema>;

const TeamSetup = () => {
  const utils = trpc.useUtils();
  const router = useRouter();
  const { mutate: addTeam, isLoading } = trpc.teamRouter.addTeam.useMutation({
    onSuccess: () => {
      utils.userRouter.getUser.invalidate();
      toast({
        title: "Erfolgreich! Dein Account ist nun bereit!",
        description: "Du wirst gleich weitergeleitet gib uns noch kurz...",
      });
      router.push("/");
    },
  });
  const { data: user } = trpc.userRouter.getUser.useQuery();

  const form = useForm<Input>({
    resolver: zodResolver(addTeamSchema),
    defaultValues: {
      name: "",
    },
  });

  const watchedPostcode = form.watch().postcode;
  useEffect(() => {
    const teamCityFromApi = async () => {
      try {
        const response = await fetch(
          `https://openplzapi.org/de/Localities?postalCode=${watchedPostcode}`
        );
        if (response.ok) {
          const data = await response.json();
          // console.log("Fetched data:", data[0].name);
          form.setValue("city", data[0].name);
        } else {
          // console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        // console.log("An error occurred:", error);
      }
    };

    if (watchedPostcode) {
      // Nur ausführen, wenn eine Postleitzahl vorhanden ist
      teamCityFromApi();
    }
  }, [watchedPostcode]); // Abhängigkeitsliste aktualisiert

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="mx-auto flex max-w-sm flex-col items-center">
        <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400">
          Angemeldet mit: {user?.email || <Skeleton className="h-5 w-40" />}
        </div>
        <Badge variant="secondary" className="mb-2 mt-8">
          Schritt 3: Team
        </Badge>
        <Progress className="mt-1 h-2" value={100} />
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Ein Team hilft dir später Struktur und Ordnung zu bewahren. Teams in
          talentstark können beispielsweise Abteilungen, Standorte oder eigene
          Ideen sein.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-md">
        <Card className="mx-auto mt-8 max-w-sm">
          <CardHeader>
            <CardTitle>Lege ein Team an</CardTitle>
            <CardDescription>
              Dein Teamname kann später bearbeitet werden.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => addTeam(data))}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Team</FormLabel>
                      <FormControl>
                        <Input placeholder="Vertrieb" {...field} />
                      </FormControl>
                      <FormDescription>
                        Der Teamname kann später geändert werden.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ansprechpartner Vorname</FormLabel>
                      <FormControl>
                        <Input placeholder="Vorname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="contactLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ansprechpartner Nachname</FormLabel>
                      <FormControl>
                        <Input placeholder="Nachname" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Straße und Hausnummer</FormLabel>
                      <FormControl>
                        <Input placeholder="Wo sitzt dieses Team?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="postcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Postleitzahl</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Gib eine Postleitzahl ein"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stadt</FormLabel>
                      <FormControl>
                        <Input placeholder="Gib eine Stadt ein" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Erzähl etwas über dieses Team"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Alert>
                  <Store className="h-4 w-4" />
                  <AlertTitle>
                    {user?.company?.name || <Skeleton className="h-8 w-full" />}
                  </AlertTitle>
                  <AlertDescription>
                    Dieses Team wird automatisch deinem Unternehmen zugeordnet.
                  </AlertDescription>
                </Alert>
                <Button disabled={isLoading} type="submit" className="w-full">
                  {isLoading ? <Loader2 className="h-4 w-4" /> : "Team anlegen"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeamSetup;
