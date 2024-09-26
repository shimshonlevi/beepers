
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
import { Beeper } from '../models/Beeper.js';
import {Status}from '../models/status.js'


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

export const updateStatus = async (id: string,lat?:number,lot?:number): Promise<string> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind:Beeper|undefined = beepers.find((beeper)=>beeper.id ===id)


  if (!beeperFind) {
    throw new Error("Invalid beeper ID.");
  }

  const statusValue = Object.values(Status)
  const currentStatusIndex = statusValue.indexOf(beeperFind.status)
  if (currentStatusIndex === statusValue.length - 1) {
    throw new Error("Beeper is already in its final status.");
  }else if(currentStatusIndex ===3){
    deployedBeeper(lat,lot)
    beeperFind.Latitude = lat
    beeperFind.Longitude = lot 
  }
  beeperFind.status = statusValue[currentStatusIndex + 1];

await writeBeeperToJsonFile(beepers);
return `Beeper ${id} status updated to ${beeperFind.status}`;
};

const deployedBeeper = async ():Promise<void>{
if
  setTimeout()=>{

  }

}


export const deleteBeeper = async (id: string): Promise<void> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind:Beeper|undefined = beepers.find((beeper)=>beeper.id ===id)


  if (!beeperFind) {
    throw new Error("Invalid beeper ID.");
  }
  const newBeepersArr:Beeper[] =beepers.filter((b) => b.id !== id);

  await writeBeeperToJsonFile(newBeepersArr);
};

export const getStatus = async (status:Status): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const newBeepersArr:Beeper[] =beepers.filter((b) => b.status === status);
  if (!newBeepersArr) {
    throw new Error("Status not found.");
  }
  return newBeepersArr

};
