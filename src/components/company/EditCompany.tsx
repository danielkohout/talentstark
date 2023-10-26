"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

const EditCompany = () => {
  const [companyName, setCompanyName] = useState<string>("");
  const [companyStreet, setCompanyStreet] = useState<string>("");
  const [companyPostcode, setCompanyPostcode] = useState<number>(0);
  const [companyCity, setCompanyCity] = useState<string>();
  const { data: company, isLoading } = trpc.companyRouter.getCompany.useQuery();

  useEffect(() => {
    const initCompanyCity = async () => {
      const x = company?.city;
      setCompanyCity(x);
    };
    initCompanyCity();
  }, [company?.city]);

  useEffect(() => {
    const changeCompanyCity = async () => {
      try {
        const response = await fetch(
          `https://openplzapi.org/de/Localities?postalCode=${companyPostcode}`
        );
        const data = await response.json();
        if (data && data[0] && data[0].name) {
          setCompanyCity(data[0].name);
        }
      } catch (error) {
        console.error("Es gab ein Problem mit der Abfrage:", error);
      }
    };

    if (companyPostcode) {
      changeCompanyCity();
    }
  }, [companyPostcode]);

  return (
    <div className="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
      <h1 className="text-2xl font-bold lg:text-3xl">Unternehmen bearbeiten</h1>
      <div className="mx-auto mt-8 max-w-sm space-y-4">
        <div>
          <Label>Unternehmensname</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              onChange={(e) => setCompanyName(e.target.value)}
              defaultValue={company?.name}
            />
          )}
        </div>
        <div>
          <Label>Straße des Unternehmens</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              onChange={(e) => setCompanyStreet(e.target.value)}
              defaultValue={company?.street}
            />
          )}
        </div>
        <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
          <div className="md:col-span-2">
            <Label>Postleitzahl</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                type="number"
                maxLength={5}
                onChange={(e) => {
                  setCompanyPostcode(Number(e.target.value));
                }}
                defaultValue={company?.postCode}
              />
            )}
          </div>
          <div className="md:col-span-3">
            <Label>Stadt</Label>
            {isLoading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Input
                defaultValue={companyCity}
                onChange={(e) => {
                  setCompanyCity(e.target.value);
                }}
              />
            )}
          </div>
        </div>
        <div className="flex justify-center">
          <Button>Speichern</Button>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
