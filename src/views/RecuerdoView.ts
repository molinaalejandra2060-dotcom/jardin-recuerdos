export function renderizarVista(): void {
  const app = document.querySelector<HTMLDivElement>("#app");
  if (!app) return;

  app.innerHTML = `
    <header class="encabezado">
      <div class="marca"><span class="marca-icono" aria-hidden="true">&#10047;</span><span>El Jard&iacute;n de los Recuerdos</span></div>
      <p class="lema">Un lugar para todo lo que florece en ti</p>
    </header>
    <main class="contenedor">
      <section class="bienvenida">
        <span class="eyebrow">Un peque&ntilde;o refugio para tus momentos</span>
        <h1>Cultiva tus recuerdos</h1>
        <p>Cada instante especial merece su propio rinc&oacute;n en el jard&iacute;n.</p>
      </section>
      <div class="contenido">
        <section class="formulario-seccion panel" aria-labelledby="titulo-formulario">
          <h2 class="seccion-titulo" id="titulo-formulario">Planta un recuerdo</h2>
          <p class="seccion-descripcion">Guarda aqu&iacute; ese momento que quieres volver a visitar.</p>
          <form id="formulario-recuerdo">
            <div class="campo"><label for="titulo">Nombre de tu recuerdo</label><input type="text" id="titulo" name="titulo" maxlength="80" placeholder="Una tarde entre flores..." required></div>
            <div class="campo"><label for="descripcion">Cu&eacute;ntanos el momento</label><textarea id="descripcion" name="descripcion" maxlength="1000" placeholder="&iquest;Qu&eacute; hizo especial este d&iacute;a?" required></textarea></div>
            <div class="campo"><label for="fecha">Fecha</label><input type="date" id="fecha" name="fecha" required></div>
            <div class="campo"><label for="emocion">Emoci&oacute;n</label><select id="emocion" name="emocion" required>
              <option value="">Elige una emoci&oacute;n</option><option value="Felicidad">Felicidad</option><option value="Amor">Amor</option><option value="Gratitud">Gratitud</option><option value="Nostalgia">Nostalgia</option><option value="Esperanza">Esperanza</option>
            </select></div>
            <div class="campo"><label for="color">Color de tu flor</label><div class="color-field"><select id="color" name="color" required><option value="#d889a4">Rosa</option><option value="#a68bc1">Lila</option><option value="#e6c477">Crema dorada</option><option value="#8bad91">Verde suave</option><option value="#88aeca">Azul cielo</option></select><span class="color-preview" id="color-preview" aria-hidden="true"></span></div></div>
            <button class="boton-principal" type="submit" id="btn-guardar">&#10047; Plantar recuerdo</button>
            <button class="boton-secundario oculto" type="button" id="btn-cancelar">Cancelar edici&oacute;n</button>
            <p class="mensaje" id="mensaje" role="status" aria-live="polite"></p>
          </form>
        </section>
        <section class="jardin-seccion" aria-labelledby="titulo-jardin">
          <div class="jardin-cabecera"><div><h2 id="titulo-jardin">Tu jard&iacute;n</h2><p id="contador-recuerdos">Cada flor guarda una historia.</p></div><div class="filtros"><label class="oculto" for="filtro-emocion">Filtrar por emoci&oacute;n</label><select id="filtro-emocion"><option value="">Todas las emociones</option><option value="Felicidad">Felicidad</option><option value="Amor">Amor</option><option value="Gratitud">Gratitud</option><option value="Nostalgia">Nostalgia</option><option value="Esperanza">Esperanza</option></select></div></div>
          <div id="lista-recuerdos" class="lista-recuerdos" aria-live="polite"></div>
        </section>
      </div>
    </main>
    <footer class="pie">Hecho con cari&ntilde;o para que los buenos momentos sigan floreciendo <span aria-hidden="true">&#9825;</span></footer>`;
}
