var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeBeeperToJsonFile } from "../DAL/jsonBeeper.js";
export const create = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const user = users.find((u) => u.id === userId);
    if (!user) {
        throw new Error('User not found.');
    }
    return user.books;
});
export const getAll = (bookName, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.id === userId);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    const books = userFind.books;
    const bookId = uuidv4();
    const newBook = {
        id: bookId,
        title: bookName,
        author: "API"
    };
    books.push(newBook);
    yield writeBeeperToJsonFile(userFind);
    return bookId;
});
export const getBeeper = (bookName, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.id === userId);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    const books = userFind.books;
    const bookId = uuidv4();
    const newBook = {
        id: bookId,
        title: bookName,
        author: "API"
    };
    books.push(newBook);
    yield writeBeeperToJsonFile(userFind);
    return bookId;
});
export const updateStatus = (userId, updateData, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const existingUser = users.find((u) => u.id === userId);
    if (!existingUser) {
        throw new Error("User not found.");
    }
    const book = existingUser.books.find((b) => b.id === bookId);
    if (!book) {
        throw new Error("Book not found.");
    }
    // עדכון נתוני הספר
    book.title = updateData;
    yield writeUserToJsonFile(existingUser);
    return book;
});
export const deleteBeeper = (bookId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const existingUser = users.find((u) => u.id === userId);
    if (!existingUser) {
        throw new Error("User not found.");
    }
    // מחיקת הספר מתוך רשימת הספרים
    existingUser.books = existingUser.books.filter((b) => b.id !== bookId);
    yield writeUserToJsonFile(existingUser);
});
export const getStatus = (userId, updateData, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const existingUser = users.find((u) => u.id === userId);
    if (!existingUser) {
        throw new Error("User not found.");
    }
    const book = existingUser.books.find((b) => b.id === bookId);
    if (!book) {
        throw new Error("Book not found.");
    }
    // עדכון נתוני הספר
    book.title = updateData;
    yield writeUserToJsonFile(existingUser);
    return book;
});
