import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Patient, PriorityBand } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreOf(patient: Patient) {
  return patient.factors.c + patient.factors.t + patient.factors.b;
}

export function bandRank(band: PriorityBand) {
  if (band === "High") return 0;
  if (band === "Medium") return 1;
  return 2;
}

export function formatWhen(value: string) {
  if (!value) return "Time not recorded";
  return value.replace("T", " · ");
}
