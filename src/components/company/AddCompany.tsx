"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "../ui/progress";
import { Skeleton } from "../ui/skeleton";
import { useState } from "react";
import { toast } from "../ui/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AddCompany = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyStreet, setCompanyStreet] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyPostcode, setCompanyPostcode] = useState(0);
  const router = useRouter();

  const { data: user } = trpc.userRouter.getUser.useQuery();
  const { mutate: addCompany, isLoading: addCompanyLoading } =
    trpc.companyRouter.addCompany.useMutation({
      onSuccess: () => {
        toast({
          title:
            "Dein Unternehmen wurde erfolgreich bei talentstark registriert.",
          description: "Du wirst in wenigen Augenblicken weitergeleitet...",
        });
        setTimeout(() => {
          router.push("/team");
        }, 2000);
      },
    });

  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
      {/* Begrüßung zum Setup */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mx-auto flex max-w-sm flex-col items-center">
          <div className="mx-auto flex items-center gap-2 rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200 dark:bg-gray-900 dark:text-gray-400 dark:ring-gray-400">
            Angemeldet mit: {user?.email || <Skeleton className="h-5 w-40" />}
          </div>
          <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Unternehmens Informationen
          </p>
          <Progress className="mt-1 h-2" value={66} />
        </div>
        <h1 className="mt-8 flex items-center gap-2 text-center text-2xl font-bold lg:text-4xl">
          Hallo {user?.firstName || <Skeleton className="h-8 w-32" />}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-gray-600 dark:text-gray-400">
          Trage nun dein Unternehmen ein.
        </p>
      </div>
      <div className="mx-auto mt-8 flex max-w-2xl flex-col items-center space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name des Unternehmens</Label>
          <Input
            onChange={(e) => setCompanyName(e.target.value)}
            required
            type="text"
            id="name"
            name="name"
            placeholder="Muster GmbH"
          />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="street">Straße und Hausnummer</Label>
          <Input
            onChange={(e) => setCompanyStreet(e.target.value)}
            required
            type="text"
            id="street"
            name="street"
            placeholder="Unter den Linden 13"
          />
        </div>
        <div className="grid w-full max-w-sm grid-cols-1 gap-1 md:grid-cols-5">
          <div className="md:col-span-2">
            <Label htmlFor="postcode">Postleitzahl</Label>
            <Input
              onChange={(e) => setCompanyPostcode(Number(e.target.value))}
              required
              type="number"
              id="postcode"
              name="postcode"
              placeholder="205921"
            />
          </div>
          <div className="md:col-span-3">
            <Label htmlFor="city">Ort</Label>
            <Input
              onChange={(e) => setCompanyCity(e.target.value)}
              required
              type="text"
              id="city"
              name="city"
              placeholder="München"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">Dies ist auch die Rechnungsadresse</Label>
        </div>
        <input type="hidden" name="path" value={1} />
        <Button
          onClick={() => {
            const missingFields = [];
            if (!companyName) missingFields.push("Name des Unternehmens");
            if (!companyStreet) missingFields.push("Straße");
            if (!companyPostcode) missingFields.push("Postleitzahl");
            if (!companyCity) missingFields.push("Stadt");

            if (missingFields.length === 0) {
              addCompany({
                name: companyName,
                street: companyStreet,
                city: companyCity,
                postcode: companyPostcode,
              });
            } else {
              const missingText = missingFields.join(", ");
              toast({
                title: `Bitte prüfe deine Angaben: ${missingText}`,
                variant: "destructive",
              });
            }
          }}
        >
          {addCompanyLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Speichern und weiter"
          )}
        </Button>
      </div>
    </div>
  );
};

export default AddCompany;
