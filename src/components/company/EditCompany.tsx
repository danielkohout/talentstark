"use client";
import { trpc } from "@/app/_trpc/client";
import { editCompanySchema } from "@/app/validators/company";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
type Input = z.infer<typeof editCompanySchema>;

const EditCompany = () => {
  const countryMapping: Record<string, string> = {
    de: "Deutschland",
    at: "Österreich",
    ch: "Schweiz",
    fr: "Frankreich",
    it: "Italien",
    es: "Spanien",
    nl: "Niederlande",
    be: "Belgien",
    pt: "Portugal",
    gb: "Vereinigtes Königreich",
    ie: "Irland",
    dk: "Dänemark",
    no: "Norwegen",
    se: "Schweden",
    fi: "Finnland",
    ae: "Vereinigte Arabische Emirate",
  };
  const { data: user } = trpc.userRouter.getUser.useQuery();

  const { mutate: editCompany, isLoading } =
    trpc.companyRouter.editCompany.useMutation({
      onSuccess: () => {
        toast({
          title: "Dein Unternehmen wurde erfolgreich angelegt.",
          description: "Du wirst nun weitergeleitet...",
        });
      },
    });

  const form = useForm<Input>({
    resolver: zodResolver(editCompanySchema),
  });

  const watchedPostcode = form.watch().postcode;

  useEffect(() => {
    const companyCityFromApi = async () => {
      try {
        const response = await fetch(
          `https://openplzapi.org/de/Localities?postalCode=${watchedPostcode}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched data:", data[0].name);
          form.setValue("city", data[0].name);
        } else {
          console.log("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    if (watchedPostcode) {
      // Nur ausführen, wenn eine Postleitzahl vorhanden ist
      companyCityFromApi();
    }
  }, [watchedPostcode]); // Abhängigkeitsliste aktualisiert

  useEffect(() => {
    const getDefaultValues = async () => {
      if (user) {
        form.setValue("name", user.company?.name as string);
        form.setValue("city", user.company?.city as string);
        form.setValue("country", user.company?.country as string);
        form.setValue("postcode", user.company?.postCode as string);
        form.setValue("street", user.company?.street as string);
      }
    };
    getDefaultValues();
  }, [user]);

  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Unternehmen</CardTitle>
          <CardDescription>
            Passe die Informationen zu deinem Unternehmen an.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => editCompany(data))}
              className="space-y-4"
            >
              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unternehmensname</FormLabel>
                    <FormControl>
                      <Input placeholder="Demo GmbH" {...field} />
                    </FormControl>
                    <FormDescription>
                      Gib hier bitte deinen ofiziellen Unternehmensnamen ein.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Country */}
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Land</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Wähle ein Land" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.keys(countryMapping).map((country: string) => {
                          return (
                            <SelectItem value={country} key={country}>
                              <span className={`fi fi-${country}`}></span>{" "}
                              {countryMapping[country]}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Street */}
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Straße und Hausnummer</FormLabel>
                    <FormControl>
                      <Input placeholder="Musterstraße 12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Plz */}
              <FormField
                control={form.control}
                name="postcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postleitzahl</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Postleitzahl"
                        {...field}
                        type="number"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* City */}
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stadt</FormLabel>
                    <FormControl>
                      <Input placeholder="München" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2 pt-8">
                <Button type="submit">
                  {isLoading ? (
                    <Loader2 className="h-4 w-4" />
                  ) : (
                    "Speichern"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditCompany;
