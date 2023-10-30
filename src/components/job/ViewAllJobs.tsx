"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import MaxWidthWrapper from "../MaxWidthWrapper";
import { Ghost, ArrowRight } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { ResponsiveContainer, Line, Tooltip, LineChart } from "recharts";

const ViewAllJobs = () => {
  function generateRandomData() {
    const pages = [
      "Page A",
      "Page B",
      "Page C",
      "Page D",
      "Page E",
      "Page F",
      "Page G",
    ];
    return pages.map((page) => ({
      name: page,
      uv: Math.floor(Math.random() * 4000) + 1000, // Zufälliger Wert zwischen 1000 und 4000
    }));
  }

  const data = generateRandomData();
  const { data: jobs } = trpc.jobRouter.getCompanyJobs.useQuery();
  const { data: teams } = trpc.teamRouter.getTeams.useQuery();
  return (
    <div className="">
      {/* Infoleiste */}
      <div className="border-b ">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8 md:px-8">
          <h1 className="flex items-center gap-2 text-xl font-bold md:text-2xl">
            Jobs
          </h1>
          <Link
            href={"/job/add"}
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Job anlegen
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
      {/* Jobs */}
      <div className="mx-auto max-w-7xl">
        <div className="">
          {jobs && jobs.length === 0 ? (
            <div className="my-8 flex flex-col items-center rounded-lg border-2 border-dashed py-10 text-center">
              <Ghost className="h-10 w-10" />
              <h1 className="text-xl font-bold md:text-2xl">
                Hier sieht es noch ganz schön leer aus...
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Lege jetzt deinen ersten Job an.
              </p>
              <Link
                href={"/"}
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "mt-5",
                })}
              >
                Jetzt einen Job anlegen
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-12">
              <div className="md:col-span-4">
                <p className="text-lg font-bold md:pl-8">Deine Teams</p>
                <ul className="pt-4 md:pl-4">
                  {teams?.map((team) => (
                    <li key={team.id}>
                      <Link
                        href={`/team/${team.id}`}
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        {team.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mr-8 md:col-span-8">
                <ul>
                  {jobs?.map((job) => (
                    <li key={job.id}>
                      <Card>
                        <CardHeader>
                          <CardTitle>{job.name}</CardTitle>
                          <CardDescription>{job.Team?.name}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-2">
                          <div className="rounded-lg border p-4">
                            <ResponsiveContainer width="100%" height={150}>
                              <LineChart data={data}>
                                <Line
                                  type="natural"
                                  dataKey="uv"
                                  stroke="#2563eb"
                                  strokeWidth={2}
                                />
                                <Tooltip />
                              </LineChart>
                            </ResponsiveContainer>
                            <p className="text-right text-xs">Job Aufrufe</p>
                          </div>
                          <div className="rounded-lg border p-4">
                            <ResponsiveContainer width="100%" height={150}>
                              <LineChart data={data}>
                                <Line
                                  type="natural"
                                  dataKey="uv"
                                  stroke="#2563eb"
                                  strokeWidth={2}
                                />
                                <Tooltip />
                              </LineChart>
                            </ResponsiveContainer>
                            <p className="text-right text-xs">Bewerbungen</p>
                          </div>
                        </CardContent>
                        <CardFooter className="flex w-full justify-between">
                          <p className="block">
                            <b>Bewerbungen</b>: 2
                          </p>
                          <Link
                            className={buttonVariants({
                              variant: "default",
                            })}
                            href={`/job/${job.id}`}
                          >
                            Bewerbungen ansehen
                          </Link>
                        </CardFooter>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewAllJobs;
