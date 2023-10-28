"use client";
import { Team } from "@prisma/client";
import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import Link from "next/link";

interface editTeamProps {
  team: Team;
}

const EditTeam = ({ team }: editTeamProps) => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Jobs</CardTitle>
            <CardDescription>Jobs zu diesem Team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold lg:text-3xl">8</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Bewerbungen</CardTitle>
            <CardDescription>Bewerbung zu diesem Team</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold lg:text-3xl">211</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Beliebtheitsindikator</CardTitle>
            <CardDescription>
              So kommt das Team bei Bewerbern an
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold lg:text-3xl">8.52/10</p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold">Jobs in diesem Team</h2>
      </div>
    </div>
  );
};

export default EditTeam;
