"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { addCompanySchema } from "@/app/validators/company";
type Input = z.infer<typeof addCompanySchema>;

const AddCompany = () => {
  const [formStep, setFormStep] = useState(0);
  const form = useForm<Input>({
    resolver: zodResolver(addCompanySchema),
    defaultValues: {
      city: "",
      country: "de",
      name: "",
      postcode: "",
      street: "",
    },
  });

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

  const router = useRouter();

  const { mutate: addCompany, isLoading } =
    trpc.companyRouter.addCompany.useMutation({
      onSuccess: () => {
        toast({
          title: "Dein Unternehmen wurde erfolgreich angelegt.",
          description: "Du wirst nun weitergeleitet...",
        });
        router.push("/team");
      },
    });
  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden">
      <Card className="w-[90vw] lg:w-[30vw]">
        <CardHeader>
          <CardTitle>Unternehmen</CardTitle>
          <CardDescription>Lege dein Unternehmen an</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => addCompany(data))}
              className="relative space-y-3 overflow-x-hidden"
            >
              <motion.div
                className={cn("absolute left-0 right-0 top-0 space-y-3 p-1", {
                  // hidden: formStep == 1,
                })}
                animate={{
                  translateX: `-${formStep * 100}%`,
                }}
                transition={{
                  ease: "easeInOut",
                }}
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
              </motion.div>
              <motion.div
                className={cn("left-0 right-0 top-0 space-y-3 p-1", {
                  // hidden: formStep == 0,
                })}
                animate={{
                  translateX: `${100 - formStep * 100}%`,
                }}
                transition={{
                  ease: "easeInOut",
                }}
              >
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
                          {Object.keys(countryMapping).map(
                            (country: string) => {
                              return (
                                <SelectItem value={country} key={country}>
                                  <span className={`fi fi-${country}`}></span>{" "}
                                  {countryMapping[country]}
                                </SelectItem>
                              );
                            }
                          )}
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
              </motion.div>

              <div className="flex items-center gap-2 pt-8">
                <Button
                  type="button"
                  variant={"ghost"}
                  className={cn({
                    hidden: formStep == 1,
                  })}
                  onClick={() => {
                    form.trigger(["name"]);
                    const nameState = form.getFieldState("name");
                    if (!nameState.isDirty || nameState.invalid) return;
                    setFormStep(formStep + 1);
                  }}
                >
                  Weiter
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant={"ghost"}
                  type="button"
                  className={cn({
                    hidden: formStep == 0,
                  })}
                  onClick={() => setFormStep(formStep - 1)}
                >
                  <ArrowLeft className="ml-2 h-4 w-4" />
                  Zurück
                </Button>
                <Button
                  type="submit"
                  className={cn({
                    hidden: formStep == 0,
                  })}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4" />
                  ) : (
                    "Speichern & weiter"
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

export default AddCompany;
