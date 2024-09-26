var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { create, deleteBeeper, getAll, getBeeper, getStatus, updateStatus } from "../services/beeperService.js";
export const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperName = req.body.beeperName;
        if (!beeperName) {
            res.status(400).json({ error: "Enter A Name." });
            return;
        }
        const beeperId = yield create(beeperName);
        res.status(201).json({ beeperId: beeperId });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allBeepers = yield getAll();
        if (!allBeepers) {
            res.status(400).json({ error: "not beepers" });
            return;
        }
        res.status(200).json(allBeepers);
    }
    catch (error) {
        if (error.message === "Invalid beeper ID.") {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
export const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.beeperId;
        if (!beeperId) {
            res.status(400).json({ error: "enter beeper id" });
            return;
        }
        const beeper = yield getBeeper(beeperId);
        res.status(200).json(beeper);
    }
    catch (error) {
        if (error.message === "Invalid beeper ID.") {
            res.status(401).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
export const updateStatusBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.beeperId;
        const lat = req.body.lat;
        const lon = req.body.lon;
        if (!beeperId) {
            res.status(400).json({ error: "Please provide a valid beeper ID." });
            return;
        }
        const beeperUpdated = yield updateStatus(beeperId, lat, lon);
        res.status(200).json({ message: beeperUpdated });
    }
    catch (error) {
        if (error.message === "Invalid beeper ID.") {
            res.status(409).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const deleteBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.beeperId;
        if (!beeperId) {
            res.status(400).json({ error: "enter beeper id" });
            return;
        }
        yield deleteBeeper(beeperId);
        res.status(200).json({ messag: `the beeper with it ${beeperId} is deleted` });
    }
    catch (error) {
        if (error.message === "Invalid beeper ID.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("שגיאה בעריכת הספר:", error);
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
export const getBeeperByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const status = req.params.status;
        if (!status) {
            res.status(400).json({ error: "enter status" });
            return;
        }
        const beepers = yield getStatus(status);
        res.status(200).json({ beepers });
    }
    catch (error) {
        if (error.message === "Status not found.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error(error);
            res.status(500).json({ error: "שגיאת שרת פנימית." });
        }
    }
});
