"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { trpc } from "@/app/_trpc/client";
import { Label } from "../ui/label";
import { Loader2 } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "../ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const EditCompany = () => {
  const utils = trpc.useUtils();
  const [companyName, setCompanyName] = useState<string>("");
  const [companyStreet, setCompanyStreet] = useState<string>("");
  const [companyPostcode, setCompanyPostcode] = useState<string>("");
  const [companyCity, setCompanyCity] = useState<string>("");
  const { data: company, isLoading } = trpc.companyRouter.getCompany.useQuery();
  const { mutate: editCompany, isLoading: editCompanyLoading } =
    trpc.companyRouter.editCompany.useMutation({
      onSuccess: () => {
        toast({
          title: "Unternehmen erfolgreich gespeichert",
          description: "Dein Unternehmen wurde erfolgreich aktualisiert",
        });
      },
      onError: () => {
        toast({
          title: "Es ist ein Fehler aufgetreten",
          description: "Speichern nicht möglich. Kontaktiere den Support.",
          variant: "destructive",
        });
      },
    });

  useEffect(() => {
    const initCompanyCity = async () => {
      if (company) {
        setCompanyCity(company?.city);
        setCompanyName(company?.name);
        setCompanyStreet(company.street);
        setCompanyPostcode(company.postCode);
      }
    };
    initCompanyCity();
  }, [company]);

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
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              defaultValue={companyName}
            />
          )}
        </div>
        <div>
          <Label>Straße des Unternehmens</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              value={companyStreet}
              onChange={(e) => setCompanyStreet(e.target.value)}
              defaultValue={company?.street}
            />
          )}
        </div>
        <div className="">
          <Label>Land</Label>
          <Select defaultValue="de">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Wähle ein Land" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Länder</SelectLabel>
                <SelectItem value="de">
                  <span className="fi fi-de"></span> Deutschland
                </SelectItem>
                <SelectItem value="aus">
                  <span className="fi fi-at"></span> Österreich
                </SelectItem>
                <SelectItem value="ch">
                  <span className="fi fi-ch"></span> Schweiz
                </SelectItem>
                <SelectItem value="gr">
                  <span className="fi fi-gr"></span> Griechenland
                </SelectItem>
                <SelectItem value="nl">
                  <span className="fi fi-nl"></span> Niederlande
                </SelectItem>
                <SelectItem value="pl">
                  <span className="fi fi-pl"></span> Polen
                </SelectItem>
                <SelectItem value="ae">
                  <span className="fi fi-ae"></span> Vereinigte Arabische
                  Emirate
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
                  setCompanyPostcode(e.target.value);
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
          <Button
            onClick={async () => {
              await editCompany({
                id: company?.id!,
                name: companyName,
                street: companyStreet,
                postcode: companyPostcode,
                city: companyCity,
              });
            }}
          >
            {editCompanyLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Speichern"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditCompany;
