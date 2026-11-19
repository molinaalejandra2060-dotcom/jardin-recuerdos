import initSqlJs from "sql.js";
import type { Database } from "sql.js";

const STORAGE_KEY = "jardin_recuerdos_db";
let db: Database;

export async function inicializarDB(): Promise<Database> {
  const assetBase = new URL(import.meta.env.BASE_URL, window.location.origin);
  const SQL = await initSqlJs({
    locateFile: file => new URL(file, assetBase).href
  });
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const bytes = Uint8Array.from(atob(savedData), character => character.charCodeAt(0));
      db = new SQL.Database(bytes);
    } catch (error) {
      console.warn("No se pudo leer la base guardada; se creara una base nueva.", error);
      localStorage.removeItem(STORAGE_KEY);
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
  }

  db.run(`CREATE TABLE IF NOT EXISTS recuerdos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    fecha TEXT NOT NULL,
    emocion TEXT NOT NULL,
    color TEXT NOT NULL
  )`);
  guardarDB();
  return db;
}

export function obtenerDB(): Database {
  if (!db) throw new Error("La base de datos no ha sido inicializada");
  return db;
}

export function guardarDB(): void {
  if (!db) return;
  const bytes = db.export();
  let binary = "";
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  localStorage.setItem(STORAGE_KEY, btoa(binary));
}
