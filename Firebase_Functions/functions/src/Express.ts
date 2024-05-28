import { Application } from "express";
import express = require('express');
import cors = require('cors');

const app: Application = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Middleware to parse JSON bodies
app.use(express.json());

export default app;