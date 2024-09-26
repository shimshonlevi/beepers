import { User } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUserToJsonFile } from "../DAL/jsonUsers.js"
import bcrypt from "bcrypt"

export const registerUser = async (userName: string,password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const existingUser = users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUserId: string = uuidv4();
  
  const newUser: User = {
    id: newUserId ,
    userName,
    password: hashedPassword,
    books: [],
  };

  await writeUserToJsonFile(newUser);
  return newUserId;
};

export const authenticateUser = async (userName: string, password: string): Promise<string> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.userName === userName);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }

  const passwordMatch = bcrypt.compareSync(password, userFind.password);

  if (!passwordMatch) {
    throw new Error("Invalid username or password.");
  }

  return userFind.id? userFind.id : ''; // just for typescript not to be mad
};


import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeToJsonFile, deleteFromJsonFile } from "../dal/access.js"
import { Beeper } from "../models/Beeper.js";
import { Status } from '../statuses/status.js'


export const createBeeper = async (name: string): Promise<Beeper> => {
  const beeperId: string = uuidv4();

  const newBeeper: Beeper = {
    id: beeperId,
    name: name,
    status: Status.manufactured,
    created_at : new Date(),
    detonated_at: undefined,
    latitude : 0,
    longitude:0

  };
  await writeToJsonFile(newBeeper);
  return newBeeper;
};



export const getBeepers = async (): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  return beepers;
};


export const getDetailsByID = async (id: string): Promise<Beeper> => {
  const beepers: Beeper[] = await readFromJsonFile();
  const beeperFind: Beeper | undefined = beepers.find((beeper) => beeper.id === id);

  if (!beeperFind) {
    throw new Error("Invalid  ID of beeper.");
  }

  return beeperFind;
};


export const updateTheStatusOfBeeper = async (id: string, status:string): Promise<string> => {
  const beeper: Beeper = await getDetailsByID(id);
  const newStatus = status;

  const newBeeper: Beeper = {
    id: beeper.id,
    name: beeper.name,
    status: newStatus,
    created_at : beeper.created_at,
    detonated_at: beeper.created_at,
    latitude : beeper.latitude,
    longitude:beeper.longitude

  };
  await writeToJsonFile(newBeeper);
  return newStatus;
  
};

export const deleteBeeperByID = async (id: string): Promise<void> => {
  const deleteBeeper: Beeper = await getDetailsByID(id);
  await deleteFromJsonFile(deleteBeeper);
};
 

export const getAllBeepersByStatus = async (bookName: string, userId: string): Promise<Book> => {
  const users: Beeper[] = await readFromJsonFile();
  const userFind = users.find((u) => u.id === userId);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }
  const books: Book[] = userFind.books;

  const authorAPI: string = "API";

  const bookId: string = uuidv4();

  const newBook: Book = {
    id: bookId,
    title: bookName,
    author: authorAPI,
  };
  books.push(newBook);

  await writeUsersToJsonFile(users);
  return newBook;
};
