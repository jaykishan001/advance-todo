import express, { Router } from 'express'
import { healthCheck } from '../controller/healthcheck.controller.js';

const router = express.Router();

router.get("/health-check", healthCheck);

export default router;
