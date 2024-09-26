
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
import { Beeper } from '../models/Beeper.js';
import {Status}from '../models/status.js'
import{coordinates}from '../models/locations.js'


export const create = async (beeperName: string): Promise<Beeper> => {
  const newBeeper:Beeper = {
    id: uuidv4(),
    name: beeperName,
    status:Status.manufactured,
    created_at : new Date(),
}
const beepers: Beeper[] = await readFromJsonFile();
beepers.push(newBeeper)
await writeBeeperToJsonFile(beepers)
  return newBeeper
 
};

export const getAll = async (): Promise<Beeper[]|undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  return beepers
  
};

 


export const getBeeper = async (id:string): Promise<Beeper> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind:Beeper|undefined = beepers.find((beeper)=>beeper.id ===id)


  if (!beeperFind) {
    throw new Error("Invalid beeper ID.");
  }
return beeperFind
}

export const updateStatus = async (id: string, lat?: number, lon?: number): Promise<string> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind: Beeper | undefined = beepers.find((beeper) => beeper.id === id);
  if (!beeperFind) {
    throw new Error("Invalid beeper ID.");
  }
  const statusValues = Object.values(Status);
  const currentStatusIndex = statusValues.indexOf(beeperFind.status);
  if (currentStatusIndex === -1 || currentStatusIndex === statusValues.length - 1) {
    throw new Error("Beeper is already in its final status or has invalid status.");
  }
 
  if (beeperFind.status === Status.deployed) {
    if (lat && lon ) {
      const locationExists = coordinates.some((coord) => coord.lat === lat && coord.lon === lon);
      
      if (!locationExists) {
        throw new Error("Invalid coordinates. Location does not exist in the list.");
      }

      beeperFind.Latitude = lat;
      beeperFind.Longitude = lon;
    }
    console.log(`Beeper ${id} is deployed, waiting 10 seconds before updating to 'detonated'...`);
    
    await new Promise((resolve) => setTimeout(resolve, 10000));
    beeperFind.status = Status.detonated;
    beeperFind.DateExplosion = new Date();
    console.log(`Beeper ${id} exploded at ${beeperFind.DateExplosion}.`);
  } else {
   
    beeperFind.status = statusValues[currentStatusIndex + 1];
  }
  await writeBeeperToJsonFile(beepers);
  return `Beeper ${id} status updated to ${beeperFind.status}`;
};



export const deleteBeeper = async (id: string): Promise<void> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind:Beeper|undefined = beepers.find((beeper)=>beeper.id ===id)


  if (!beeperFind) {
    throw new Error("Invalid beeper ID.");
  }
  const newBeepersArr:Beeper[] =beepers.filter((b) => b.id !== id);

  await writeBeeperToJsonFile(newBeepersArr);
};

export const getStatus = async (status:Status|string): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const newBeepersArr:Beeper[] =beepers.filter((b) => b.status === status);
  if (!newBeepersArr) {
    throw new Error("Status not found.");
  }
  return newBeepersArr

};
