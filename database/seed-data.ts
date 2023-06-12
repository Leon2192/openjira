//import { v4 as uuidv4 } from "uuid";

interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData: SeedData = {
  entries: [
    {
      description: "Pendiente: Renders Haras",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "In Progress: lorem imsum",
      status: "in-progress",
      createdAt: Date.now() - 1000000,
    },
    {
      description: "Finished:lorem imsum",
      status: "finished",
      createdAt: Date.now() - 100000,
    },
  ],
};
