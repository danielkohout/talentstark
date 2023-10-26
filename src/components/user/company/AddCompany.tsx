"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Store } from "lucide-react";

interface AddCompanyProps {}
const AddCompany = () => {
  const { data: user } = trpc.userRouter.getUser.useQuery();

  return (
    <div className="mx-auto mt-10 max-w-7xl px-6 lg:px-8">
      {/* Begrüßung zum Setup */}
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-white px-8 py-2 text-sm text-gray-600 shadow ring-1 ring-inset ring-gray-200">
          Angemeldet mit: {user?.email}
        </div>
        <Store className="mt-8 h-10 w-10 text-gray-900" />
        <h1 className="text-center text-2xl font-bold lg:text-3xl">
          Hallo {user?.firstName} <br /> willkommen bei talentstark.
        </h1>
        <p className="mx-auto mt-2 max-w-xl text-gray-600">
          Lege zuerst dein Unternehmen an. {user?.email} wird dann der Besitzer
          dieses Unternehmens sein.
        </p>
      </div>
      <form className="mx-auto mt-8 flex max-w-2xl flex-col items-center space-y-4">
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
        <div className="grid w-full max-w-sm grid-cols-1 gap-1 md:grid-cols-5">
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
