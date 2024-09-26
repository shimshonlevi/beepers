import { Request, Response } from "express";
import { registerUser, authenticateUser } from "../services/userService.js";
import { userNamePassword } from "../models/types.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password }: userNamePassword = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const userId = await registerUser(userName, password);
    res.status(201).json({ userid: userId });
  } catch (error: any) {
    if (error.message === "Username already exists.") {
      res.status(409).json({ error: error.message });
    } else {
      console.error("Error registering user:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      res.status(400).json({ error: "Username and password are required." });
      return;
    }

    const userId = await authenticateUser(userName, password);
    res.status(200).json({ userid: userId });
  } catch (error: any) {
    // you can also check for unkown if it instance of Error.
    if (error.message === "Invalid username or password.") {
      res.status(401).json({ error: error.message });
    } else {
      console.error("Error during login:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
};


אני צריך שאם הוא מגיע לסטטוס 3 בENUM שיקח את המיקום שיש נBODY אם יש ויחכה 10 שניות וישנה עוד פעם את הסטטוס וגם יעדכן את זמן הפיצוץ
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
  }if(currentStatusIndex ===3){
    
    beeperFind.Latitude = lat
    beeperFind.Longitude = lot
    deployedBeeper(beeperFind) 
  }
  beeperFind.status = statusValue[currentStatusIndex + 1];
  if(currentStatusIndex ===3){
    
    beeperFind.Latitude = lat
    beeperFind.Longitude = lot
    deployedBeeper(beeperFind) 
  }

await writeBeeperToJsonFile(beepers);
return `Beeper ${id} status updated to ${beeperFind.status}`;
};

const deployedBeeper = async (beeper:Beeper):Promise<void>{
  if (!beeper.Latitude ||beeper.Longitude in coordinates)
  const  setTimeout(editStatus,10000)=>{
    updateStatus(beeper.id)


    

  }

}
  וזה הקונטרולר
  export const updateStatusBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
      const beeperId: string = req.body.beeperId;
  
   if (!beeperId) {
        res.status(400).json({ error: "enter beeper id" });
        return;
      }
  
      const beeperUpdated = await updateStatus(beeperId);
      res.status(200).json({ beeperUpdated });
    } catch (error: any) {
      if (error.message === "Invalid beeper ID.") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "שגיאת שרת פנימית." });
      }
    }
  };וזה הרשימה
  export const coordinates: { lat: number; lon: number }[] = [
    { lat: 34.59708, lon: 35.78674 },
    { lat: 33.72141, lon: 36.59793 },
    { lat: 33.5089, lon: 35.85089 },
    { lat: 33.6838, lon: 36.11096 },
    { lat: 33.68535, lon: 35.20427 },
    { lat: 34.0771, lon: 36.55406 },
    { lat: 33.7846, lon: 35.43539 },
    { lat: 34.50491, lon: 36.39218 },
    { lat: 34.6793, lon: 36.58335 },
    { lat: 33.25026, lon: 35.9977 },
    { lat: 34.36202, lon: 35.08479 },
    { lat: 33.42607, lon: 35.13643 },
    { lat: 34.48697, lon: 36.32015 },
    { lat: 33.35128, lon: 36.13825 },
    { lat: 34.65033, lon: 36.13545 },
    { lat: 34.67662, lon: 35.35375 },
    { lat: 33.35875, lon: 35.13752 },
    { lat: 33.12274, lon: 35.91729 },
    { lat: 33.79351, lon: 36.42971 },
    { lat: 33.92002, lon: 36.31603 },
    { lat: 33.83706, lon: 35.75151 },
    { lat: 34.53059, lon: 35.39202 },
    { lat: 34.18524, lon: 36.28982 },
    { lat: 33.92894, lon: 36.34516 },
    { lat: 34.57897, lon: 36.07131 },
    { lat: 33.8968, lon: 35.42969 },
    { lat: 34.28723, lon: 35.09238 },
    { lat: 33.9799, lon: 35.36946 },
    { lat: 33.68114, lon: 35.45531 },
    { lat: 34.53243, lon: 35.82878 },
    { lat: 34.07938, lon: 35.95813 },
    { lat: 34.59343, lon: 35.1033 },
    { lat: 33.83205, lon: 35.176 },
    { lat: 34.42701, lon: 35.49997 },
    { lat: 34.63897, lon: 36.58622 },
    { lat: 34.41031, lon: 35.76916 },
    { lat: 34.39869, lon: 35.65177 },
    { lat: 33.01048, lon: 35.36257 },
    { lat: 33.75823, lon: 36.38592 },
    { lat: 33.77224, lon: 36.3063 },
    { lat: 34.3657, lon: 35.19468 },
    { lat: 34.52543, lon: 36.57411 },
    { lat: 33.34957, lon: 35.37663 },
    { lat: 34.27838, lon: 35.04438 },
    { lat: 33.77564, lon: 35.87574 },
    { lat: 33.67021, lon: 36.29989 },
    { lat: 34.63734, lon: 35.27868 },
    { lat: 34.31768, lon: 35.7885 },
    { lat: 33.62269, lon: 36.46484 },
    { lat: 34.34499, lon: 35.38508 },
  ];וזה הENUM
  export enum Status{
    manufactured ='manufactured' ,
    assembled = 'assembled',
    shipped = 'shipped', 
    deployed = 'deployed',
    detonated = 'detonated'
} וזה הBEPPER

import {Status}from './status'

export interface Beeper{
  id:string
  name:string;
  status:Status;
  created_at?: Date;
  DateExplosion?:Date;
  Longitude?:number;
  Latitude?:number;

 }




 כדי לממש את הלוגיקה המבוקשת שבה סטטוס ה-`Beeper` מתקדם באופן אוטומטי, וכאשר הסטטוס מגיע ל-`deployed`, הוא מחכה 10 שניות לפני עדכון נוסף, ניתן לבצע כמה תיקונים בלוגיקה של הקוד.
הנה הפתרון המתוקן:
### 1. עדכון הקוד של הפונקציה `updateStatus`:
```ts
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
  // אם הסטטוס הוא 'deployed', יש לעדכן את הקואורדינטות ולהמתין 10 שניות לפני עדכון הסטטוס
  if (beeperFind.status === Status.deployed) {
    if (lat && lon) {
      beeperFind.Latitude = lat;
      beeperFind.Longitude = lon;
    }
    console.log(`Beeper ${id} is deployed, waiting 10 seconds before updating to 'detonated'...`);
    // המתנה של 10 שניות ועדכון הסטטוס ל-'detonated'
    await new Promise((resolve) => setTimeout(resolve, 10000));
    beeperFind.status = Status.detonated;
    beeperFind.DateExplosion = new Date();
    console.log(`Beeper ${id} exploded at ${beeperFind.DateExplosion}.`);
  } else {
    // עדכון הסטטוס לשלב הבא
    beeperFind.status = statusValues[currentStatusIndex + 1];
  }
  await writeBeeperToJsonFile(beepers);
  return `Beeper ${id} status updated to ${beeperFind.status}`;
};
```
### 2. עדכון הקוד של הפונקציה `deployedBeeper`:
```ts
// פונקציה זו לא הכרחית אם מממשים את ההמתנה ועדכון הסטטוס בתוך updateStatus, לכן ניתן להסיר אותה
```
### 3. עדכון הקונטרולר:
```ts
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
```
### הסבר:
1. **בדיקה האם הסטטוס הוא 'deployed':** כאשר הסטטוס הוא `deployed`, מתבצעת בדיקה אם יש קואורדינטות (lat, lon) שנשלחו בבקשה, ואם כן - מעדכנים אותן ב-`Beeper`.
2. **המתנה של 10 שניות:** לאחר עדכון הסטטוס ל-`deployed`, מתבצעת המתנה של 10 שניות בעזרת `setTimeout` לפני עדכון נוסף ל-`detonated`.
3. **עדכון זמן הפיצוץ:** כאשר הסטטוס מתעדכן ל-`detonated`, מתעדכנת גם השעה ב-`DateExplosion`.
עם המימוש הזה, כל קריאה לפונקציה תתקדם את הסטטוס של ה-`Beeper`, ובמקרה של סטטוס `deployed` הוא יחכה 10 שניות לפני עדכון נוסף.















