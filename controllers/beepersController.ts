import { Request, Response } from 'express';
import { create, deleteBeeper, getAll, getBeeper,getStatus,updateStatus } from "../services/beeperService.js";
import { Beeper } from '../models/Beeper.js';
import{Status}from '../models/status.js'

export const createBeeper = async (req: Request, res: Response): Promise<void> => {
  try {
    const beeperName: string = req.body.beeperName;
   

 
    if (!beeperName) {
      res.status(400).json({ error: "Enter A Name." });
      return;
    }
  const beeperId = await create(beeperName);
    res.status(201).json({ beeperId: beeperId});
  } catch (error: any) {
    if (error.message === "Username already exists.") {
      res.status(409).json({ error: error.message });
    } else {
   res.status(500).json({ error: "שגיאת שרת פנימית." });
    }
  }
};

export const getAllBeepers = async (req: Request, res: Response): Promise<Beeper[]|void> => {
  try {
 

  const allBeepers = await getAll();
  if(!allBeepers){
    res.status(400).json({ error: "not beepers" });
    return;
  }
  res.status(200).json(allBeepers);
} catch (error: any) {
  if (error.message === "Invalid beeper ID.") {
    res.status(401).json({ error: error.message });
  } else {
 res.status(500).json({ error: "שגיאת שרת פנימית." });
  }
}
};

export const getBeeperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const beeperId: string = req.params.beeperId;
    if (!beeperId) {
      res.status(400).json({ error: "enter beeper id" });
    return;
    }

    const beeper = await getBeeper(beeperId);
    res.status(200).json(beeper);
  } catch (error: any) {
    if (error.message === "Invalid beeper ID.") {
      res.status(401).json({ error: error.message });
    } else {
   res.status(500).json({ error: "שגיאת שרת פנימית." });
    }
  }
};

export const updateStatusBeeper = async (req: Request, res: Response): Promise<void> => {
  try {
    const beeperId: string = req.body.beeperId;
    const lat: number | undefined = req.body.lat;
    const lon: number | undefined = req.body.lon;
    if (!beeperId) {
      res.status(400).json({ error: "Please provide a valid beeper ID." });
      return;
    }
    const beeperUpdated = await updateStatus(beeperId, lat, lon);
    res.status(200).json({ message: beeperUpdated });
  } catch (error: any) {
    if (error.message === "Invalid beeper ID.") {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error." });
    }
  }
};


export const deleteBeeperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const beeperId: string = req.body.beeperId;
 if (!beeperId) {
      res.status(400).json({ error: "enter beeper id" });
      return;
    }

    await deleteBeeper(beeperId);

    res.status(200).json({ messag:`the beeper with it ${beeperId} is deleted` });
  } catch (error: any) {
    if (error.message === "Invalid beeper ID.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("שגיאה בעריכת הספר:", error);
      res.status(500).json({ error: "שגיאת שרת פנימית." });
    }
  }
};



export const getBeeperByStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const status: Status = req.body.status;
 if (!status) {
      res.status(400).json({ error: "enter status" });
      return;
    }

    const beepers:Beeper[]|undefined = await getStatus(status);
    res.status(200).json({ beepers });
  } catch (error: any) {
    if (error.message === "Status not found.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error( error);
      res.status(500).json({ error: "שגיאת שרת פנימית." });
    }
  }
};
