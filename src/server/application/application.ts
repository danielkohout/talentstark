import prisma from "@/lib/db/prisma";
import { addJobSchema } from "@/validators/job";
import { privateProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import z from "zod";
import openai from "@/lib/openai";

export const applicationRouter = router({})