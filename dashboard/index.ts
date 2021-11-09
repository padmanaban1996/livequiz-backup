import { getAdminDashboard, getAttendanceChart, getCardValues, getClosedClassChart } from "./controller";
import express from "express";

export const dashBoardRouter = express.Router();

dashBoardRouter.get("/:id", getAdminDashboard);
dashBoardRouter.get("/:id/cardValues", getCardValues);
dashBoardRouter.get("/:id/chart/attendance/", getAttendanceChart);
dashBoardRouter.get("/:id/chart/closedclasses", getClosedClassChart);