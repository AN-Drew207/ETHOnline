import express from "express";
import { getContracts } from "./utils";

const app = express();

const activeUsers: string[] = [];

app.get('/register/:address', async(req, res) => {
    const userAddress = req.params.address;
    activeUsers.push(userAddress);
})