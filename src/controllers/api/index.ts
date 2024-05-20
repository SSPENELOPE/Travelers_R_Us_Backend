import express from 'express';
const router = express.Router();

import parks from './nationalParks';

router.use("/get", parks);

export default router;