import "./styles/styles.css";
import { inicializarDB } from "./db/database";
import { renderizarVista } from "./views/RecuerdoView";
import { iniciarControlador } from "./controllers/RecuerdoController";

async function iniciarAplicacion(): Promise<void> {
  try {
    await inicializarDB();
    renderizarVista();
    iniciarControlador();
  } catch (error) {
    console.error("Error al iniciar el jardin:", error);
    const app = document.querySelector<HTMLDivElement>("#app");
    if (app) {
      app.innerHTML = `<main role="alert" style="max-width:620px;margin:12vh auto;padding:32px;text-align:center;font-family:system-ui;color:#514b59"><h2>Ups, nuestro jardin no pudo cargar</h2><p>Revisa que la base de datos este disponible y recarga la pagina.</p><p id="detalle-error" style="font-size:12px;color:#817887;overflow-wrap:anywhere"></p></main>`;
      const detail = app.querySelector<HTMLParagraphElement>("#detalle-error");
      if (detail) detail.textContent = error instanceof Error ? error.message : String(error);
    }
  }
}

void iniciarAplicacion();
