import { Entry } from "../models";
import { IEntry } from "../models/Entry";
import { db } from ".";
import { isValidObjectId } from "mongoose"

export const getEntryById = async (id: string): Promise<IEntry | null> => {

    if (!isValidObjectId(id)) return null;

    await db.connect();
    const entry = await Entry.findById(id).lean();
    await db.disconnect();

    return JSON.parse(JSON.stringify(entry));

}
