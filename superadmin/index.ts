import express from 'express';
import { createSuperAdmin } from './controller';


export const superAdminRouter = express.Router();

superAdminRouter.post('/create',createSuperAdmin);