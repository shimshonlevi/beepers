import jsonfile from 'jsonfile';
import { Beeper} from '../models/Beeper.js';
import {Status } from '../models/status.js';

const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';


export const writeBeeperToJsonFile = async (beepers: Beeper[] ): Promise<void> => {
  // const users: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  // users.push(beeper);
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};

export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};

