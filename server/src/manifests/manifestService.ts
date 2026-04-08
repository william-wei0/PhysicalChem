import AppError from "../errors/AppError";
import fs from "fs";
import path from "path";

const MANIFEST_ROOT = process.env.MANIFEST_ROOT_DEV
  ? path.resolve(process.cwd(), process.env.MANIFEST_ROOT_DEV)
  : path.join(__dirname, "assets/manifests");

export type LabelPart =
  | { type: "text"; text: string }
  | { type: "bold"; text: string }
  | { type: "math"; expression: string };

export type TaskManifest = {
  taskId: string;
  label: LabelPart[];
};

export type SectionManifest = {
  id: string;
  title: string;
  tasks: TaskManifest[];
};

export type UnitManifest = {
  chapterId: number;
  unitId: number;
  title: string;
  sections: SectionManifest[];
};

export type ChapterSummary = {
  chapterId: number;
  title: string;
  description: string;
  date: string;
  units: { unitId: number; title: string; href: string }[];
};

const readJson = <T>(filePath: string): T => {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as T;
};

export const getUnitManifest = (chapterId: number, unitId: number): UnitManifest => {
  const filePath = path.join(MANIFEST_ROOT, `chapter${chapterId}`, `unit${unitId}.json`);
  if (!fs.existsSync(filePath)) {
    throw new AppError(`Manifest not found for chapter ${chapterId} unit ${unitId} at ${filePath}`, 404);
  }
  return readJson<UnitManifest>(filePath);
};

export const getAllChapters = (): ChapterSummary[] => {
  const indexFilePath = path.join(MANIFEST_ROOT, "index.json");
  if (!fs.existsSync(indexFilePath)) {
    console.log("__dirname:", __dirname);
    console.log("cwd:", process.cwd());
    const files = fs.readdirSync(__dirname);

    console.log("Files in __dirname:");
    files.forEach((file) => {
      console.log(file);
    });

    const files_assets = fs.readdirSync(path.join(__dirname, "server"));
    console.log("Files in files_assets:");
    files.forEach((file) => {
      console.log(file);
    });
    throw new AppError(`Manifest index not found at ${indexFilePath}`, 404);
  }
  return readJson<ChapterSummary[]>(indexFilePath);
};

export const getUnitTaskIds = (chapterId: number, unitId: number): string[] => {
  const manifest = getUnitManifest(chapterId, unitId);
  return manifest.sections.flatMap((s) => s.tasks.map((t) => t.taskId));
};
