import { obtenerDB, guardarDB } from "../db/database";
import type { Recuerdo } from "../models/Recuerdo";

export function iniciarControlador(): void {
  const form = document.querySelector<HTMLFormElement>("#formulario-recuerdo");
  const list = document.querySelector<HTMLDivElement>("#lista-recuerdos");
  const filter = document.querySelector<HTMLSelectElement>("#filtro-emocion");
  const title = document.querySelector<HTMLInputElement>("#titulo");
  const description = document.querySelector<HTMLTextAreaElement>("#descripcion");
  const date = document.querySelector<HTMLInputElement>("#fecha");
  const emotion = document.querySelector<HTMLSelectElement>("#emocion");
  const flowerColor = document.querySelector<HTMLSelectElement>("#color");
  const preview = document.querySelector<HTMLSpanElement>("#color-preview");
  const saveButton = document.querySelector<HTMLButtonElement>("#btn-guardar");
  const cancelButton = document.querySelector<HTMLButtonElement>("#btn-cancelar");
  const message = document.querySelector<HTMLParagraphElement>("#mensaje");
  const count = document.querySelector<HTMLParagraphElement>("#contador-recuerdos");
  if (!form || !list || !filter || !title || !description || !date || !emotion || !flowerColor || !preview || !saveButton || !cancelButton || !message || !count) return;
  const formEl = form;
  const listEl = list;
  const filterEl = filter;
  const colorEl = flowerColor;
  const previewEl = preview;
  const saveButtonEl = saveButton;
  const cancelButtonEl = cancelButton;
  const messageEl = message;
  const countEl = count;

  let editingId: number | null = null;
  const escapeHTML = (value: string): string => value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character] ?? character);

  function renderMemories(): void {
    const db = obtenerDB();
    const statement = filterEl.value
      ? db.prepare("SELECT * FROM recuerdos WHERE emocion = ? ORDER BY fecha DESC, id DESC")
      : db.prepare("SELECT * FROM recuerdos ORDER BY fecha DESC, id DESC");
    if (filterEl.value) statement.bind([filterEl.value]);
    const memories: Recuerdo[] = [];
    try { while (statement.step()) memories.push(statement.getAsObject() as unknown as Recuerdo); }
    finally { statement.free(); }
    countEl.textContent = memories.length === 1 ? "1 flor en tu jard\u00edn" : `${memories.length} flores en tu jard\u00edn`;
    if (memories.length === 0) {
      listEl.innerHTML = `<div class="vacio"><strong>${filterEl.value ? "A\u00fan no hay flores con esta emoci\u00f3n" : "Hay un espacio esperando tu primera flor"}</strong>${filterEl.value ? "Prueba otra emoci\u00f3n para recorrer el jard\u00edn." : "Guarda un momento especial y su flor aparecer\u00e1 aqu\u00ed, lista para volver a visitarla."}</div>`;
      return;
    }
    listEl.innerHTML = memories.map(memory => `
      <article class="tarjeta-recuerdo" data-emocion="${escapeHTML(memory.emocion.toLowerCase())}" style="--flower:${escapeHTML(memory.color)}">
        <span class="flor" aria-hidden="true">&#10047;</span><h3>${escapeHTML(memory.titulo)}</h3>
        <p>${escapeHTML(memory.descripcion)}</p>
        <div class="meta"><span class="etiqueta">${escapeHTML(memory.fecha)}</span><span class="etiqueta">${escapeHTML(memory.emocion)}</span></div>
        <div class="acciones"><button type="button" data-accion="editar" data-id="${memory.id}">&#9998; Editar</button><button type="button" class="eliminar" data-accion="eliminar" data-id="${memory.id}">&#10005; Eliminar</button></div>
      </article>`).join("");
  }

  function resetForm(): void {
    formEl.reset(); editingId = null; saveButtonEl.innerHTML = "&#10047; Plantar recuerdo";
    cancelButtonEl.classList.add("oculto"); previewEl.style.backgroundColor = colorEl.value;
  }

  colorEl.addEventListener("change", () => { previewEl.style.backgroundColor = colorEl.value; });
  cancelButtonEl.addEventListener("click", () => { resetForm(); messageEl.textContent = "Edici\u00f3n cancelada."; messageEl.classList.remove("error"); });
  formEl.addEventListener("submit", event => {
    event.preventDefault();
    if (!formEl.reportValidity()) return;
    const values = [title.value.trim(), description.value.trim(), date.value, emotion.value, flowerColor.value];
    if (values.some(value => !value)) { messageEl.textContent = "Completa todos los campos antes de guardar."; messageEl.classList.add("error"); return; }
    const db = obtenerDB();
    if (editingId === null) {
      db.run("INSERT INTO recuerdos (titulo, descripcion, fecha, emocion, color) VALUES (?, ?, ?, ?, ?)", values);
      messageEl.textContent = "Tu recuerdo floreci\u00f3 en el jard\u00edn.";
    } else {
      db.run("UPDATE recuerdos SET titulo = ?, descripcion = ?, fecha = ?, emocion = ?, color = ? WHERE id = ?", [...values, editingId]);
      messageEl.textContent = "Tu recuerdo fue actualizado.";
    }
    messageEl.classList.remove("error"); guardarDB(); resetForm(); renderMemories();
  });

  listEl.addEventListener("click", event => {
    if (!(event.target instanceof Element)) return;
    const button = event.target.closest<HTMLButtonElement>("button[data-accion]");
    if (!button) return;
    const id = Number(button.dataset.id);
    if (!Number.isInteger(id) || id < 1) return;
    const db = obtenerDB();
    if (button.dataset.accion === "eliminar") {
      if (!confirm("\u00bfDeseas eliminar este recuerdo del jard\u00edn?")) return;
      db.run("DELETE FROM recuerdos WHERE id = ?", [id]); guardarDB(); renderMemories();
      messageEl.textContent = "El recuerdo fue eliminado."; messageEl.classList.remove("error"); return;
    }
    if (button.dataset.accion === "editar") {
      const result = db.exec("SELECT id, titulo, descripcion, fecha, emocion, color FROM recuerdos WHERE id = ?", [id]);
      if (!result[0]?.values[0]) return;
      const [recordId, recordTitle, recordDescription, recordDate, recordEmotion, recordColor] = result[0].values[0];
      editingId = Number(recordId); title.value = String(recordTitle); description.value = String(recordDescription);
      date.value = String(recordDate); emotion.value = String(recordEmotion); flowerColor.value = String(recordColor);
      previewEl.style.backgroundColor = colorEl.value; saveButtonEl.textContent = "Guardar cambios";
      cancelButtonEl.classList.remove("oculto"); messageEl.textContent = "Edita los detalles y guarda tus cambios."; messageEl.classList.remove("error");
      formEl.scrollIntoView({ behavior: "smooth", block: "center" }); title.focus();
    }
  });
  filterEl.addEventListener("change", renderMemories);
  previewEl.style.backgroundColor = colorEl.value;
  renderMemories();
}
