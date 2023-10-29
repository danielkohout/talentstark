"use client";
import { ModeToggle } from "@/components/DarkModeToggle";
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
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const page = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    signIn("email", {
      email: email,
      callbackUrl: callbackUrl,
    });
  };
  return (
    <>
      <div className="flex justify-between p-4">
        <h1 className="font-bold">talentstark.</h1>
        <ModeToggle />
      </div>
      <div className="absolute left-1/2 top-1/2 max-w-sm -translate-x-1/2 -translate-y-1/2">
        <Card>
          <CardHeader className="text-center">
            <CardTitle>Jetzt starten</CardTitle>
            <CardDescription>
              Du erhältst in wenigen Sekunden ein Mail mit deiner Anmeldung.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="">
              <form onSubmit={onSubmit} className="space-y-2">
                <Input
                  id="emai"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
                <Button className="w-full" color="primary" type="submit">
                  Weiter
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
        <div className="flex gap-1 text-xs">
          <Link target="_blank" href={"https://talentstark.de/impressum"}>Impressum</Link>
          <Link target="_blank" href={"https://talentstark.de/datenschutz"}>Datenschutz</Link>
        </div>
      </div>
    </>
  );
};

export default page;
