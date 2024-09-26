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
import { Status } from '../models/status.js';
import { coordinates } from '../models/locations.js';
export const create = (beeperName) => __awaiter(void 0, void 0, void 0, function* () {
    const newBeeper = {
        id: uuidv4(),
        name: beeperName,
        status: Status.manufactured,
        created_at: new Date(),
    };
    const beepers = yield readFromJsonFile();
    beepers.push(newBeeper);
    yield writeBeeperToJsonFile(beepers);
    return newBeeper;
});
export const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    return beepers;
});
export const getBeeper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((beeper) => beeper.id === id);
    if (!beeperFind) {
        throw new Error("Invalid beeper ID.");
    }
    return beeperFind;
});
export const updateStatus = (id, lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((beeper) => beeper.id === id);
    if (!beeperFind) {
        throw new Error("Invalid beeper ID.");
    }
    const statusValues = Object.values(Status);
    const currentStatusIndex = statusValues.indexOf(beeperFind.status);
    if (currentStatusIndex === -1 || currentStatusIndex === statusValues.length - 1) {
        throw new Error("Beeper is already in its final status or has invalid status.");
    }
    if (beeperFind.status === Status.deployed) {
        if (lat && lon) {
            const locationExists = coordinates.some((coord) => coord.lat === lat && coord.lon === lon);
            if (!locationExists) {
                throw new Error("Invalid coordinates. Location does not exist in the list.");
            }
            beeperFind.Latitude = lat;
            beeperFind.Longitude = lon;
        }
        console.log(`Beeper ${id} is deployed, waiting 10 seconds before updating to 'detonated'...`);
        yield new Promise((resolve) => setTimeout(resolve, 10000));
        beeperFind.status = Status.detonated;
        beeperFind.DateExplosion = new Date();
        console.log(`Beeper ${id} exploded at ${beeperFind.DateExplosion}.`);
    }
    else {
        beeperFind.status = statusValues[currentStatusIndex + 1];
    }
    yield writeBeeperToJsonFile(beepers);
    return `Beeper ${id} status updated to ${beeperFind.status}`;
});
export const deleteBeeper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((beeper) => beeper.id === id);
    if (!beeperFind) {
        throw new Error("Invalid beeper ID.");
    }
    const newBeepersArr = beepers.filter((b) => b.id !== id);
    yield writeBeeperToJsonFile(newBeepersArr);
});
export const getStatus = (status) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const newBeepersArr = beepers.filter((b) => b.status === status);
    if (!newBeepersArr) {
        throw new Error("Status not found.");
    }
    return newBeepersArr;
});
