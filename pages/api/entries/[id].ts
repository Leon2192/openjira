import type { NextApiRequest, NextApiResponse } from "next";

import { Entry } from "../../../models";
import { IEntry } from "../../../models/Entry";
import { db } from "../../../database";
import mongoose from "mongoose";

type Data = { message: string } | IEntry;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "El id no es valido" + id });
  }

  switch (req.method) {
    case "PUT":
      return updateEntry(req, res);

    case "GET":
      return getEntry(req, res);

    default:
      return res.status(400).json({ message: "Metodo no existente." + req.method });
  }
}

const getEntry = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  await db.connect();

  const entryInDB = await Entry.findById(id);
  await db.disconnect();

  if (!entryInDB) {
    return res.status(400).json({ message: "No hay entrada con ese id:" + id });
  }

  return res.status(200).json(entryInDB);
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if (!entryToUpdate) {
    await db.disconnect();
    return res.status(400).json({ message: "No hay entrada con ese id:" + id });
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status,
  } = req.body;

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(
      id,
      {
        description,
        status,
      },
      {
        runValidators: true,
        new: true,
      }
    )
    await db.disconnect();
    res.status(200).json(updatedEntry!);

  } catch (error: any) {
    await db.disconnect();
    res.status(400).json({ message: error.errors.status.message });
  }

};
