"use client";
import React, { useEffect, useState } from "react";
import { ModeToggle } from "../DarkModeToggle";
import Link from "next/link";
import "../components.css";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";

const VerifyLogin = () => {
  const [randomCode, setRandomCode] = useState<number>(0);

  useEffect(() => {
    setRandomCode(Math.floor(Math.random() * (9999 - 1000 + 1) + 1000));
  }, []);

  return (
    <div className="min-w-screen flex min-h-screen flex-col justify-between px-6 lg:px-8">
      <div className="flex justify-between py-4">
        <h1 className="font-bold">talentstark.</h1>
        <ModeToggle />
      </div>
      <div className="min-w-full">
        <Card className="mx-auto max-w-md text-center">
          <CardHeader>
            <svg
              className="checkmark animateElement"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle animateElement"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check animateElement"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <CardTitle>Anmelde Link gesendet</CardTitle>
            <CardDescription>Öffne den Link auf diesem Gerät.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Nach der Bestätigung kannst <br />
              du dieses Fenster Schließen.
            </p>
            <p className="mb-1 mt-4 text-sm">Vorgangsnummer:</p>
            <p className="text-lg font-bold">{randomCode}</p>
          </CardContent>
        </Card>
      </div>
      <div className="pb-4">
        <div className="flex justify-center gap-1 text-xs">
          <Link target="_blank" href={"https://talentstark.de/impressum"}>
            Impressum
          </Link>
          <Link target="_blank" href={"https://talentstark.de/datenschutz"}>
            Datenschutz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyLogin;
