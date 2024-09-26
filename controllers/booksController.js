var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { add, edit, getBooks, deleteB } from "../services/booksService.js";
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookName = req.body.bookName;
        const userId = req.body.userId;
        if (!bookName || !userId) {
            res.status(400).json({ error: "חסר שם ספר או מזהה משתמש." });
            return;
        }
        const bookId = yield add(bookName, userId);
        res.status(201).json({ userId: userId, bookId: bookId });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("שגיאה בהוספת הספר:", error);
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const userId = req.body.userId;
        if (!bookId || !userId) {
            res.status(400).json({ error: "חסר מזהה ספר או מזהה משתמש." });
            return;
        }
        yield deleteB(bookId, userId);
        res.status(200).json({ message: `הספר עם מזהה ${bookId} נמחק.` });
    }
    catch (error) {
        console.error("שגיאה במחיקת הספר:", error);
        res.status(500).json({ error: "שגיאת שרת." });
    }
});
export const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        if (!userId) {
            res.status(400).json({ error: "נדרש מזהה משתמש." });
            console.log("User found:", userId);
            return;
        }
        const books = yield getBooks(userId);
        res.status(200).json(books);
    }
    catch (error) {
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("שגיאה בשליפת הספרים:", error);
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
export const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.body.userId;
        const updateData = req.body.updateData;
        const bookId = req.body.bookId;
        if (!userId || !updateData || !bookId) {
            res.status(400).json({ error: "נדרש מזהה משתמש, מזהה ספר ונתוני עדכון." });
            return;
        }
        const book = yield edit(userId, updateData, bookId);
        res.status(200).json({ book });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("שגיאה בעריכת הספר:", error);
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
