import { Request, Response, NextFunction } from "express";
import * as manifestService from "./manifestService";
import AppError from "../../errors/AppError";

export const getUnitManifest = (
  req: Request<{ chapterId: string; unitId: string }>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chapterId = parseInt(req.params.chapterId);
    const unitId = parseInt(req.params.unitId);
    if (isNaN(chapterId) || isNaN(unitId)) throw new AppError("Invalid IDs.", 400);

    const manifest = manifestService.getUnitManifest(chapterId, unitId);
    return res.status(200).json(manifest);
  } catch (error) {
    next(error);
  }
};

export const getAllChapters = (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const chapters = manifestService.getAllChapters();
    return res.status(200).json({ chapters });
  } catch (error) {
    next(error);
  }
};