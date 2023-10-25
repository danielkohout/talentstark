"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

interface UpdateUser {
  updateUser: (formData: FormData) => void;
}

const AddDetails = ({ updateUser }: UpdateUser) => {
  const { data: user } = trpc.userRouter.getUser.useQuery();

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-10">
      {/* Begrüßung zum Setup */}
      <div className="flex flex-col justify-center items-center text-center">
        <div className="shadow text-sm px-8 py-2 bg-white ring-1 ring-inset ring-gray-200 rounded-full text-gray-600">
          Angemeldet mit: {user?.email}
        </div>
        <User className="w-10 h-10 text-gray-900 mt-8" />
        <h1 className="text-2xl lg:text-3xl font-bold text-center">
          Wer bist du?
        </h1>
        <p className="text-gray-600 mt-2 max-w-xl mx-auto">
          Wir benötigen noch ein deinen Namen von dir.
        </p>
      </div>
      <form className="max-w-sm mx-auto mt-8 space-y-4" action={updateUser}>
        <div>
          <Label htmlFor="firstName">Vorname</Label>
          <Input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Dein Vorname"
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Nachname</Label>
          <Input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Dein Nachname"
            required
          />
        </div>
        <input type="hidden" name="path" value={1} />
        <div className="flex justify-center">
          <Button type="submit">Weiter</Button>
        </div>
      </form>
    </div>
  );
};

export default AddDetails;
