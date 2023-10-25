"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store } from "lucide-react";

interface AddCompanyProps {
  addCompany: (formData: FormData) => void;
}
const AddCompany = ({ addCompany }: AddCompanyProps) => {
  const { data: user } = trpc.userRouter.getUser.useQuery();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
      {/* Begrüßung zum Setup */}
      <div className="flex flex-col justify-center items-center text-center">
        <div className="shadow text-sm px-8 py-2 bg-white ring-1 ring-inset ring-gray-200 rounded-full text-gray-600">
          Angemeldet mit: {user?.email}
        </div>
        <Store className="w-10 h-10 text-gray-900 mt-8" />
        <h1 className="text-2xl lg:text-3xl font-bold text-center">
          Hallo {user?.firstName} <br /> willkommen bei talentstark.
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Lege zuerst dein Unternehmen an. {user?.email} wird dann der Besitzer
          dieses Unternehmens sein.
        </p>
      </div>
      <form
        className="max-w-2xl mx-auto flex flex-col items-center mt-8 space-y-4"
        action={addCompany}
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name des Unternehmens</Label>
          <Input
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
            required
            type="text"
            id="street"
            name="street"
            placeholder="Unter den Linden 13"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 w-full max-w-sm gap-1">
          <div className="md:col-span-3">
            <Label htmlFor="city">Ort</Label>
            <Input
              required
              type="text"
              id="city"
              name="city"
              placeholder="München"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="postcode">Postleitzahl</Label>
            <Input
              required
              type="number"
              id="postcode"
              name="postcode"
              placeholder="205921"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Checkbox id="terms" defaultChecked />
          <Label htmlFor="terms">Dies ist auch die Rechnungsadresse</Label>
        </div>
        <input type="hidden" name="path" value={1} />
        <Button type="submit">Weiter</Button>
      </form>
    </div>
  );
};

export default AddCompany;
