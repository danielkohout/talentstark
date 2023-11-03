"use client";
import { trpc } from "@/app/_trpc/client";
import { editTeamSchema } from "@/validators/team";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Settings } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";
import { useEffect } from "react";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

interface TeamProps {
  id: string;
}

type Input = z.infer<typeof editTeamSchema>;
const EditTeam = ({ id }: TeamProps) => {
  const { data: team } = trpc.teamRouter.getTeam.useQuery({ id: id });

  const utils = trpc.useUtils();
  const form = useForm<Input>({
    resolver: zodResolver(editTeamSchema),
  });
  const { mutate: editTeamName, isLoading } =
    trpc.teamRouter.editTeam.useMutation({
      onSuccess: () => {
        utils.teamRouter.getTeam.invalidate();
        toast({
          title: "Team aktualisiert",
        });
      },
      onError: () => {
        utils.teamRouter.getTeam.invalidate();
        toast({
          title: "Es ist ein Fehler aufgetreten.",
          variant: "destructive",
        });
      },
    });

  // console.log(form.watch());
  useEffect(() => {
    const setInitalValues = async () => {
      form.setValue("id", team?.id as string);
      form.setValue("name", team?.name as string);
      form.setValue("contactFirstName", team?.contactFirstName as string);
      form.setValue("contactLastName", team?.contactLastName as string);
      form.setValue("street", team?.street as string);
      form.setValue("postcode", team?.postCode as string);
      form.setValue("city", team?.city as string);
      form.setValue("description", team?.description as string);
    };
    setInitalValues();
  }, [team]);

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
    <Sheet>
      <SheetTrigger asChild>
        <div className="inline-block cursor-pointer px-2">
          <Settings className="h-4 w-4 transition hover:rotate-90" />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{team?.name}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => editTeamName(data))}
            className="mt-8 space-y-3 p-1"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teamname</FormLabel>
                  <FormControl>
                    {team?.name ? (
                      <Input {...field} />
                    ) : (
                      <Skeleton className="h-10 w-full" />
                    )}
                  </FormControl>
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
                    <Input placeholder="Gib eine Postleitzahl ein" {...field} />
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
            <div className="space-y-2">
              <SheetClose className="block w-full">
                <Button type="button" className="w-full" variant={"outline"}>
                  Abbrechen
                </Button>
              </SheetClose>
              <Button type="submit" className="w-full">
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Speichern"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default EditTeam;
