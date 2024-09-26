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











הבעיה העיקרית בקוד שלך היא בכך שאתה מנסה לעדכן את הסטטוס של ה-Beeper על ידי פעולה כמו `beeperFind.status+1`. כך לא מתבצעת פעולה על ה-`enum` מכיוון ש-`enum` הוא למעשה סוג נתונים קבוע ולא ניתן לשנות אותו בדרך הזאת.
אם אתה רוצה לעדכן את הסטטוס של ה-`Beeper` בכל קריאה לפונקציה, עליך לעבור בין הערכים של ה-`enum` בצורה חכמה. לדוגמה, להשתמש ברשימת הערכים של ה-`enum` ולעדכן לפי הסדר.
### פתרון:
נשתמש ברשימת הערכים של ה-`enum` כדי לעדכן את הסטטוס של ה-`Beeper` בכל קריאה לפונקציה. גם נעדכן את ה-`DAL` שלך כך שלא נוסיף כל פעם את ה-Beeper מחדש, אלא נעדכן את הרשימה הקיימת.
### קוד מתוקן:
#### 1. **פונקציית `updateStatus` מתוקנת**:
```typescript
import { Status } from './status';
import { Beeper } from '../models/Beeper.js';
export const updateStatus = async (id: string): Promise<string> => {
  // קריאה לקובץ JSON כדי לקבל את כל ה-Beeper-ים
  const beepers: Beeper[] = await readFromJsonFile();
  // חיפוש Beeper לפי ID
  const beeperFind: Beeper | undefined = beepers.find((beeper) => beeper.id === id);
  if (!beeperFind) {
    throw new Error("Invalid beeper ID.");
  }
  // רשימה של כל הסטטוסים
  const statusValues = Object.values(Status);
  // מציאת האינדקס הנוכחי של הסטטוס
  const currentStatusIndex = statusValues.indexOf(beeperFind.status);
  // אם זהו הסטטוס האחרון, לא ניתן להמשיך
  if (currentStatusIndex === statusValues.length - 1) {
    throw new Error("Beeper is already in its final status.");
  }
  // עדכון הסטטוס לאחד הבא
  beeperFind.status = statusValues[currentStatusIndex + 1];
  // כתיבת העדכון לקובץ JSON
  await writeBeepersToJsonFile(beepers);
  return `Beeper ${id} status updated to ${beeperFind.status}`;
};
```
#### 2. **`Status` enum**:
```typescript
export enum Status {
  manufactured = 'manufactured',
  assembled = 'assembled',
  shipped = 'shipped',
  deployed = 'deployed',
  detonated = 'detonated'
}
```
#### 3. **פונקציית `writeBeepersToJsonFile` מתוקנת**:
במקום להוסיף Beeper חדש כל פעם, נכתוב את כל ה-Beeper-ים חזרה לקובץ לאחר עדכון הסטטוס.
```typescript
import jsonfile from 'jsonfile';
import { Beeper } from '../models/Beeper.js';
const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/db.json';
// כתיבת כל ה-Beeper-ים לקובץ JSON (לא מוסיפים חדש, אלא כותבים את הרשימה המעודכנת)
export const writeBeepersToJsonFile = async (beepers: Beeper[]): Promise<void> => {
  await jsonfile.writeFile(DB_FILE_PATH, beepers);
};
// קריאת ה-Beeper-ים מהקובץ JSON
export const readFromJsonFile = async (): Promise<Beeper[]> => {
  const beepers: Beeper[] = await jsonfile.readFile(DB_FILE_PATH);
  return beepers;
};
```
### הסבר:
1. **`updateStatus`**:
   - הפונקציה מוצאת את ה-`Beeper` לפי ה-ID.
   - היא מוצאת את הסטטוס הנוכחי שלו בתוך רשימת הערכים של ה-`enum` ומשנה אותו לסטטוס הבא אם קיים.
   - אם ה-`Beeper` כבר נמצא בסטטוס האחרון (לדוגמה, `detonated`), היא לא תאפשר להמשיך ותזרוק שגיאה.
2. **`writeBeepersToJsonFile`**:
   - במקום להוסיף Beeper חדש בכל פעם, אנחנו כותבים את כל רשימת ה-Beeper-ים המעודכנת חזרה לקובץ.
### הבהרה חשובה:
בפונקציה הזאת הסטטוס מתעדכן באופן אוטומטי אחד קדימה בכל פעם שמפעילים את הפונקציה `updateStatus`, וזה מבטיח שה-`Beeper` יתקדם לשלבים הבאים של הסטטוסים רק לפי הסדר 
