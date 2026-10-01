// =========================================================
// JORGE.EXE — SISTEMA DE VENTANAS
// =========================================================

// =========================================================
// HACER UNA VENTANA ARRASTRABLE
// =========================================================

function hacerMovible(ventana, barra) {

    let moviendo = false;
    let offsetX = 0;
    let offsetY = 0;

    // Evitar arrastres nativos o selección de texto
    barra.ondragstart = () => false;

    barra.addEventListener("mousedown", (e) => {

        // Los botones de cerrar/minimizar NO arrastran la ventana
        if (e.target.closest("button")) return;

        e.preventDefault();
        e.stopPropagation();

        moviendo = true;

        const rect = ventana.getBoundingClientRect();

        // Convertir la posición actual a coordenadas absolutas
        ventana.style.setProperty("transform", "none", "important");
        ventana.style.setProperty("left", rect.left + "px", "important");
        ventana.style.setProperty("top", rect.top + "px", "important");

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        ventana.style.zIndex = obtenerSiguienteZ();

        barra.style.userSelect = "none";
        document.body.style.userSelect = "none";
        document.body.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {

        if (!moviendo) return;

        e.preventDefault();

        ventana.style.setProperty(
            "left",
            (e.clientX - offsetX) + "px",
            "important"
        );

        ventana.style.setProperty(
            "top",
            (e.clientY - offsetY) + "px",
            "important"
        );
    });

    document.addEventListener("mouseup", () => {

        if (!moviendo) return;

        moviendo = false;

        barra.style.userSelect = "";
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
    });
}



// =========================================================
// CONTROL DE CAPAS
// =========================================================

let nivelZ = 20;

function obtenerSiguienteZ() {

    nivelZ++;

    return nivelZ;
}


// =========================================================
// CREAR VENTANA MY WORK
// =========================================================

function abrirMyWork() {

    // Evitar abrir varias copias
    if (document.querySelector(".work-window")) {

        const ventanaExistente = document.querySelector(".work-window");

        ventanaExistente.style.zIndex = obtenerSiguienteZ();

        return;
    }


    // Crear ventana
    const ventana = document.createElement("div");

    ventana.className = "window work-window";


    // Posición inicial
    ventana.style.left = "calc(50% + 80px)";
    ventana.style.top = "calc(50% - 170px)";

    ventana.style.transform = "none";

    ventana.style.zIndex = obtenerSiguienteZ();


    // Contenido
    ventana.innerHTML = `

        <div class="title-bar">

            <span>📁 MY WORK</span>

            <div class="window-buttons">

                <button class="minimize-button">_</button>
                <button class="close-button">×</button>

            </div>

        </div>


        <div class="work-content">
<div class="folders">

    <div class="folder" data-folder="illustration">
        <div class="folder-icon">📁</div>
        <div>ILLUSTRATION</div>
    </div>


    <div class="folder" data-folder="sketchbook">
        <div class="folder-icon">📖</div>
        <div>SKETCHBOOK</div>
    </div>


</div>


            <div class="work-status">

                <span>02 DIRECTORIES</span>

                <span>SYSTEM: ONLINE</span>

            </div>

        </div>

    `;


    // Meter la ventana en el escritorio
    document.body.appendChild(ventana);


    // Referencias
    const barra = ventana.querySelector(".title-bar");

    const botonCerrar = ventana.querySelector(".close-button");

    const botonMinimizar = ventana.querySelector(".minimize-button");

    // =========================================================
// CARPETAS
// =========================================================

const carpetas = ventana.querySelectorAll(".folder");


carpetas.forEach((carpeta) => {

    carpeta.addEventListener("click", () => {

        const tipo = carpeta.dataset.folder;

        abrirCarpeta(tipo);

    });

});

    // Hacerla movible
    hacerMovible(ventana, barra);


    // Cerrar
    botonCerrar.addEventListener("click", () => {

        ventana.remove();

    });


// =========================================================
// MINIMIZAR MY WORK
// =========================================================

botonMinimizar.addEventListener("click", () => {

    // Ocultar ventana
    ventana.style.display = "none";


    // Buscar la barra de tareas
    const taskbarWindows = document.querySelector(".taskbar-windows");


    // Crear botón para la ventana
    const botonTaskbar = document.createElement("button");

    botonTaskbar.className = "task-window";

    botonTaskbar.textContent = "📁 MY WORK";


    // Añadirlo a la barra
    taskbarWindows.appendChild(botonTaskbar);


    // Al pulsarlo, recuperar ventana
    botonTaskbar.addEventListener("click", () => {

        ventana.style.display = "block";

        ventana.style.zIndex = obtenerSiguienteZ();

        botonTaskbar.remove();

    });

});

}// =========================================================
// RELOJ DEL SISTEMA
// =========================================================

function actualizarReloj() {

    const reloj = document.getElementById("system-time");

    if (!reloj) return;

    const ahora = new Date();

    const horas = String(ahora.getHours()).padStart(2, "0");
    const minutos = String(ahora.getMinutes()).padStart(2, "0");

    reloj.textContent = `${horas}:${minutos}`;
}


actualizarReloj();

setInterval(actualizarReloj, 1000);
// =========================================================
// ILLUSTRATION
// =========================================================

function abrirIllustration() {

    // Evitar duplicados
    if (document.querySelector(".illustration-window")) {

        const existente =
            document.querySelector(".illustration-window");

        existente.style.display = "block";

        existente.style.zIndex = obtenerSiguienteZ();

        return;
    }


    // Crear ventana
    const ventana = document.createElement("div");

    ventana.className =
        "window illustration-window";


    // Posición
    ventana.style.left = "calc(50% - 260px)";
    ventana.style.top = "calc(50% - 210px)";

    ventana.style.transform = "none";

    ventana.style.zIndex = obtenerSiguienteZ();


    // Contenido
    ventana.innerHTML = `

        <div class="title-bar">

            <span>🖼 ILLUSTRATION</span>

            <div class="window-buttons">

                <button class="minimize-button">_</button>

                <button class="close-button">×</button>

            </div>

        </div>


        <div class="illustration-content">
<div class="illustration-toolbar">

    <span>
        C:\JORGE\PORTFOLIO\ILLUSTRATION
    </span>

</div>


<div class="projects">

${Object.entries(projectData).map(([id, proyecto]) => `

    <div class="project" onclick="abrirProyecto('${id}')">

        <div class="project-preview">
            <img
                src="${proyecto.images[0]}"
                alt="${proyecto.title}"
                loading="lazy"
            >
        </div>

        <div class="project-name">
            ${proyecto.title}
        </div>

        <div class="project-type">
            ${proyecto.technique}
        </div>

    </div>

`).join("")}

</div>

<div class="work-status">

                <span>${String(Object.keys(projectData).length).padStart(2, "0")} PROJECTS</span>

                <span>C:\JORGE\PORTFOLIO</span>

            </div>

        </div>

    `;


    document.body.appendChild(ventana);


    // =====================================================
    // CONTROLES
    // =====================================================

    const barra =
        ventana.querySelector(".title-bar");


    const botonCerrar =
        ventana.querySelector(".close-button");


    const botonMinimizar =
        ventana.querySelector(".minimize-button");


    hacerMovible(ventana, barra);


    // Cerrar
    botonCerrar.addEventListener("click", () => {

        ventana.remove();

    });


    // Minimizar
    botonMinimizar.addEventListener("click", () => {

        ventana.style.display = "none";

        const taskbarWindows =
            document.querySelector(".taskbar-windows");


        const botonTaskbar =
            document.createElement("button");


        botonTaskbar.className = "task-window";

        botonTaskbar.textContent =
            "🖼 ILLUSTRATION";


        taskbarWindows.appendChild(botonTaskbar);


        botonTaskbar.addEventListener("click", () => {

            ventana.style.display = "block";

            ventana.style.zIndex =
                obtenerSiguienteZ();

            botonTaskbar.remove();

        });

    });


    // Llevar al frente
    ventana.addEventListener("mousedown", () => {

        ventana.style.zIndex =
            obtenerSiguienteZ();

    });

}

function abrirProyecto(tipo) {

    const proyecto = projectData[tipo];

    if (!proyecto) {
        console.warn("Proyecto no encontrado:", tipo);
        return;
    }

    // Si ya hay un proyecto abierto, reutilizamos la ventana
    // cerrándola primero para que cada proyecto cargue sus
    // propias imágenes y configuración.
    const existente =
        document.querySelector(".project-window");

    if (existente) {
        cerrarVisorProyecto();
        existente.remove();
    }

    const ventana = document.createElement("div");

    ventana.className = "window project-window";

    ventana.style.left = "50%";
    ventana.style.top = "50%";
    ventana.style.transform = "translate(-50%, -50%)";
    ventana.style.zIndex = obtenerSiguienteZ();

    const isBehance =
        proyecto.layout === "behance";

    ventana.innerHTML = `

        <div class="title-bar">

            <span>
                📁 ${proyecto.title}
            </span>

            <div class="window-buttons">

                <button class="minimize-button">_</button>

                <button class="close-button">×</button>

            </div>

        </div>


        <div class="project-window-content ${isBehance ? "behance-project" : ""}">
<div class="project-info">

                <h1>
                    ${proyecto.title}
                </h1>

                <div class="project-technique">

                    ${proyecto.technique}

                </div>

                <p class="project-description">

                    ${proyecto.description}

                </p>

            </div>


            <div class="project-media-slot"></div>


            ${
                isBehance

                ? `

                    <div class="behance-gallery">

                        ${proyecto.images.map((ruta) => `

                            <div class="behance-image">

                                <img
                                    src="${ruta}"
                                    alt="${proyecto.title}"
                                    loading="lazy"
                                >

                            </div>

                        `).join("")}

                    </div>

                `

                : `

                    <div class="doll-gallery">

                        ${proyecto.images.map((ruta, indice) => `

                            <div class="doll-image">

                                <img
                                    src="${ruta}"
                                    alt="${proyecto.title}"
                                    loading="lazy"
                                >

                            </div>

                        `).join("")}

                    </div>

                `
            }

        </div>

    `;

    document.body.appendChild(ventana);

    


    // =====================================================
    // VIDEO — ENIGMA BEAT TAPE
    // =====================================================

    const mediaSlot =
        ventana.querySelector(".project-media-slot");

    if (proyecto.videoUrl !== undefined) {

        mediaSlot.innerHTML = `

            <div class="project-video">

                <div class="project-video-header">

                    <span>VISUAL // 20 MIN</span>

                    <span class="project-video-status">
                        ${proyecto.videoUrl
                            ? "VIDEO READY"
                            : "YOUTUBE LINK PENDING"}
                    </span>

                </div>

                <div class="project-video-body">

                    ${
                        proyecto.videoUrl

                        ? `
                            <button
                                class="load-video-button"
                                type="button"
                            >
                                ▶ LOAD VISUAL
                            </button>
                        `

                        : `
                            <div class="video-placeholder">

                                <span>VIDEO PLAYER</span>

                                <small>
                                    Add the YouTube URL in
                                    <b>projectData.${tipo}.videoUrl</b>
                                </small>

                            </div>
                        `
                    }

                </div>

            </div>

        `;

        if (proyecto.videoUrl) {

            const botonVideo =
                mediaSlot.querySelector(".load-video-button");

            botonVideo.addEventListener("click", () => {

                const embedUrl =
                    convertirYoutubeEmbed(proyecto.videoUrl);

                const body =
                    mediaSlot.querySelector(".project-video-body");

                body.innerHTML = `

                    <iframe
                        class="project-video-frame"
                        src="${embedUrl}"
                        title="${proyecto.title} visual"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowfullscreen
                    ></iframe>

                `;

            });

        }

    }


    // =====================================================
    // VISOR — SOLO PARA GALERÍAS NORMALES
    // =====================================================

    const contenidoProyecto =
        ventana.querySelector(".project-window-content");

    const galeria =
        ventana.querySelector(".doll-gallery");

    if (galeria) {

        const visor =
            document.createElement("div");

        visor.className = "image-viewer";
        visor.id = "projectViewer";

        visor.innerHTML = `

            <button
                class="viewer-close"
                type="button"
            >×</button>

            <img
                class="image-viewer-image"
                id="projectViewerImage"
                src=""
                alt=""
            >

            <div class="viewer-controls">

                <button
                    class="viewer-button"
                    id="projectViewerPrev"
                    type="button"
                >←</button>

                <span
                    class="viewer-counter"
                    id="projectViewerCounter"
                >01 / 01</span>

                <button
                    class="viewer-button"
                    id="projectViewerNext"
                    type="button"
                >→</button>

            </div>

        `;

        contenidoProyecto.appendChild(visor);


        galeria
            .querySelectorAll(".doll-image img")
            .forEach((imagen, indice) => {

                imagen.addEventListener("click", (e) => {

                    e.stopPropagation();

                    abrirVisorProyecto(tipo, indice);

                });

            });


        visor
            .querySelector(".viewer-close")
            .addEventListener(
                "click",
                cerrarVisorProyecto
            );


        visor
            .querySelector("#projectViewerPrev")
            .addEventListener(
                "click",
                imagenAnteriorProyecto
            );


        visor
            .querySelector("#projectViewerNext")
            .addEventListener(
                "click",
                imagenSiguienteProyecto
            );

    }


    // =====================================================
    // CONTROLES DE LA VENTANA
    // =====================================================

    const barra =
        ventana.querySelector(".title-bar");

    const botonMinimizar =
        ventana.querySelector(".minimize-button");

    const botonCerrar =
        ventana.querySelector(".close-button");


    hacerMovible(ventana, barra);


    botonCerrar.addEventListener("click", (e) => {

        e.stopPropagation();

        cerrarVisorProyecto();

        ventana.remove();

    });


    botonMinimizar.addEventListener("click", (e) => {

        e.stopPropagation();

        cerrarVisorProyecto();

        ventana.style.display = "none";

    });


    ventana.addEventListener("mousedown", () => {

        ventana.style.zIndex =
            obtenerSiguienteZ();

    });

}


// =========================================================
// YOUTUBE — CONVERSIÓN A EMBED
// =========================================================

function convertirYoutubeEmbed(url) {

    if (!url) {
        return "";
    }

    let videoId = "";

    // YouTube normal:
    // https://www.youtube.com/watch?v=XXXXXXXXXXX
    const watchMatch = url.match(
        /youtube\.com\/watch\?[^#]*v=([^&?#]+)/
    );

    // YouTube corto:
    // https://youtu.be/XXXXXXXXXXX
    const shortMatch = url.match(
        /youtu\.be\/([^&?#]+)/
    );

    // YouTube embed:
    // https://www.youtube.com/embed/XXXXXXXXXXX
    const embedMatch = url.match(
        /youtube\.com\/embed\/([^&?#]+)/
    );

    if (watchMatch) {
        videoId = watchMatch[1];
    } 
    else if (shortMatch) {
        videoId = shortMatch[1];
    } 
    else if (embedMatch) {
        videoId = embedMatch[1];
    }

    if (!videoId) {
        return url;
    }

    return `https://www.youtube.com/embed/${videoId}?rel=0&origin=http://localhost:8000`;
}

// =========================================================
// VISOR DE PROYECTOS
// =========================================================

function obtenerImagenesProyecto() {

    return projectData[proyectoActual]?.images || [];

}


function abrirVisorProyecto(tipo, indice) {

    const proyecto = projectData[tipo];

    // Los proyectos tipo Behance no usan visor.
    if (!proyecto || proyecto.layout === "behance") {
        return;
    }

    proyectoActual = tipo;
    imagenActualProyecto = indice;

    actualizarVisorProyecto();

    const viewer =
        document.querySelector("#projectViewer");

    if (!viewer) return;

    viewer.classList.add("active");

}


function cerrarVisorProyecto() {

    const viewer =
        document.querySelector("#projectViewer");

    if (!viewer) return;

    viewer.classList.remove("active");

}


function actualizarVisorProyecto() {

    const viewer =
        document.querySelector("#projectViewer");

    const imagen =
        document.querySelector("#projectViewerImage");

    const contador =
        document.querySelector("#projectViewerCounter");

    if (!viewer || !imagen || !contador) return;

    const imagenes =
        obtenerImagenesProyecto();

    if (!imagenes.length) return;

    if (imagenActualProyecto < 0) {
        imagenActualProyecto =
            imagenes.length - 1;
    }

    if (imagenActualProyecto >= imagenes.length) {
        imagenActualProyecto = 0;
    }

    imagen.src =
        imagenes[imagenActualProyecto];

    const nombreArchivo =
        imagenes[imagenActualProyecto]
            .split("/")
            .pop()
            .replace(/\.[^/.]+$/, "");

    imagen.alt =
        `${projectData[proyectoActual].title} ${nombreArchivo}`;

    contador.textContent =
        String(imagenActualProyecto + 1).padStart(2, "0")
        + " / "
        + String(imagenes.length).padStart(2, "0");

}


function imagenSiguienteProyecto() {

    const imagenes =
        obtenerImagenesProyecto();

    if (!imagenes.length) return;

    imagenActualProyecto++;

    if (imagenActualProyecto >= imagenes.length) {
        imagenActualProyecto = 0;
    }

    actualizarVisorProyecto();

}


function imagenAnteriorProyecto() {

    const imagenes =
        obtenerImagenesProyecto();

    if (!imagenes.length) return;

    imagenActualProyecto--;

    if (imagenActualProyecto < 0) {
        imagenActualProyecto =
            imagenes.length - 1;
    }

    actualizarVisorProyecto();

}

// =========================================================
// SISTEMA DE CARPETAS
// =========================================================

function abrirCarpeta(tipo) {

    switch (tipo) {

        case "illustration":
            abrirIllustration();
            break;

        case "sketchbook":
            abrirSketchbook();
            break;

        case "toys":
            abrirToys();
            break;

      

    }

}
// =========================================================
// SKETCHBOOK
// =========================================================

// Agrega aquí las páginas cuando quieras:
// "images/Sketchbook/01.jpg", "images/Sketchbook/02.jpg", etc.
const sketchbookPages = [
    "images/Sketchbook/1.jpg",
    "images/Sketchbook/2.jpg",
    "images/Sketchbook/3.jpg",
    "images/Sketchbook/4.jpg",
    "images/Sketchbook/5.jpg",
    "images/Sketchbook/6.jpg",
    "images/Sketchbook/7.jpg",
    "images/Sketchbook/8.jpg",
    "images/Sketchbook/9.jpg",
    "images/Sketchbook/10.jpg",
    "images/Sketchbook/11.jpg",
    "images/Sketchbook/12.jpg",
    "images/Sketchbook/13.jpg",
    "images/Sketchbook/14.jpg",
    "images/Sketchbook/15.jpg",
    "images/Sketchbook/16.jpg",
    "images/Sketchbook/17.jpg",
    "images/Sketchbook/18.jpg",
    "images/Sketchbook/19.jpg",
    "images/Sketchbook/20.jpg"
];

function abrirSketchbook() {

    if (document.querySelector(".sketchbook-window")) {

        const existente = document.querySelector(".sketchbook-window");
        existente.style.display = "block";
        existente.style.zIndex = obtenerSiguienteZ();
        return;
    }

 const ventana = document.createElement('div');
ventana.className = "window sketchbook-window";

ventana.style.left = "calc(50% - 575px)";
ventana.style.top = "calc(50% - 360px)";
ventana.style.transform = "none";
ventana.style.zIndex = obtenerSiguienteZ();

    ventana.innerHTML = `
        <div class="title-bar">
            <span>📖 SKETCHBOOK</span>
            <div class="window-buttons">
                <button class="minimize-button">_</button>
                <button class="close-button">×</button>
            </div>
        </div>

        <div class="sketchbook-content">
<div class="folder-header">
                C:\\JORGE\\PORTFOLIO\\SKETCHBOOK
            </div>

            <div class="sketchbook-reader">
                <div class="book-page-wrap">
                    <div class="book-page book-page-current">
                        <div class="book-empty">
                            <div class="folder-big-icon">📖</div>
                            <strong>SKETCHBOOK</strong>
                            <small>ADD YOUR PAGES TO images/Sketchbook/</small>
                        </div>
                    </div>
                    <div class="book-page book-page-next"></div>
                </div>

                <div class="book-controls">
                    <button class="book-prev" type="button">←</button>
                    <span class="book-counter">00 / 00</span>
                    <button class="book-next" type="button">→</button>
                </div>
            </div>

            <div class="work-status">
                <span>SKETCHBOOK</span>
                <span>PAGE SYSTEM: READY</span>
            </div>
        </div>
    `;

    document.body.appendChild(ventana);

    const barra = ventana.querySelector(".title-bar");
    const botonCerrar = ventana.querySelector(".close-button");
    const botonMinimizar = ventana.querySelector(".minimize-button");
    const current = ventana.querySelector(".book-page-current");
    const next = ventana.querySelector(".book-page-next");
    const counter = ventana.querySelector(".book-counter");
    const prev = ventana.querySelector(".book-prev");
    const nextBtn = ventana.querySelector(".book-next");

    let pagina = 0;

    // =====================================================
    // PRE-CARGA DE LAS PÁGINAS DEL SKETCHBOOK
    // =====================================================

    let imagenesPrecargadas = [];

    function precargarPaginas() {

        return Promise.all(
            sketchbookPages.map((ruta) => {

                return new Promise((resolve) => {

                    const img = new Image();

                    img.onload = () => resolve(img);

                    img.onerror = () => {
                        console.warn("No se pudo cargar:", ruta);
                        resolve(null);
                    };

                    img.src = ruta;
                });

            })
        ).then((imagenes) => {

            // Mantener EXACTAMENTE el orden de sketchbookPages.
            imagenesPrecargadas = imagenes.filter(Boolean);

        });
    }


    // =====================================================
    // MOSTRAR PÁGINA
    // =====================================================

    function mostrarPagina(indice, direccion = "next") {

        if (!imagenesPrecargadas.length) return;

        pagina = Math.max(
            0,
            Math.min(indice, imagenesPrecargadas.length - 1)
        );

        const img = imagenesPrecargadas[pagina];

        current.innerHTML = `
            <img
                src="${img.src}"
                alt="Sketchbook page ${pagina + 1}"
            >
        `;

        next.innerHTML = current.innerHTML;

        current.classList.remove(
            "page-flip-next",
            "page-flip-prev"
        );

        void current.offsetWidth;

        current.classList.add(
            direccion === "next"
                ? "page-flip-next"
                : "page-flip-prev"
        );

        counter.textContent =
            `${String(pagina + 1).padStart(2, "0")} / ${String(imagenesPrecargadas.length).padStart(2, "0")}`;

        prev.disabled = pagina === 0;

        nextBtn.disabled =
            pagina === imagenesPrecargadas.length - 1;
    }


    // =====================================================
    // NAVEGACIÓN
    // =====================================================

    prev.addEventListener(
        "click",
        () => mostrarPagina(pagina - 1, "prev")
    );

    nextBtn.addEventListener(
        "click",
        () => mostrarPagina(pagina + 1, "next")
    );


    ventana.addEventListener("keydown", (e) => {

        if (e.key === "ArrowLeft") {
            mostrarPagina(pagina - 1, "prev");
        }

        if (e.key === "ArrowRight") {
            mostrarPagina(pagina + 1, "next");
        }

    });

    ventana.tabIndex = 0;


    // =====================================================
    // CARGAR TODO Y MOSTRAR LA PRIMERA PÁGINA
    // =====================================================

    precargarPaginas().then(() => {

        if (imagenesPrecargadas.length) {

            mostrarPagina(0, "next");

        } else {

            counter.textContent = "00 / 00";

        }

    });

    // Arrastre exclusivo de Sketchbook.
    // No modifica el sistema general de ventanas.
    let arrastrandoSketchbook = false;
    let offsetSketchX = 0;
    let offsetSketchY = 0;

    barra.style.touchAction = "none";

    barra.addEventListener("pointerdown", (e) => {

        if (e.target.closest("button")) return;

        e.preventDefault();

        const rect = ventana.getBoundingClientRect();

        ventana.style.setProperty("transform", "none", "important");
        ventana.style.setProperty("left", rect.left + "px", "important");
        ventana.style.setProperty("top", rect.top + "px", "important");

        offsetSketchX = e.clientX - rect.left;
        offsetSketchY = e.clientY - rect.top;

        arrastrandoSketchbook = true;
        ventana.style.zIndex = obtenerSiguienteZ();

        barra.setPointerCapture(e.pointerId);
    });

    barra.addEventListener("pointermove", (e) => {

        if (!arrastrandoSketchbook) return;

        ventana.style.left =
            (e.clientX - offsetSketchX) + "px";

        ventana.style.top =
            (e.clientY - offsetSketchY) + "px";
    });

    barra.addEventListener("pointerup", (e) => {

        arrastrandoSketchbook = false;

        try {
            barra.releasePointerCapture(e.pointerId);
        } catch (error) {}
    });

    barra.addEventListener("pointercancel", () => {
        arrastrandoSketchbook = false;
    });

    botonCerrar.addEventListener("click", () => ventana.remove());

    botonMinimizar.addEventListener("click", () => {
        ventana.style.display = "none";
        const taskbarWindows = document.querySelector(".taskbar-windows");
        const botonTaskbar = document.createElement("button");
        botonTaskbar.className = "task-window";
        botonTaskbar.textContent = "📖 SKETCHBOOK";
        taskbarWindows.appendChild(botonTaskbar);
        botonTaskbar.addEventListener("click", () => {
            ventana.style.display = "block";
            ventana.style.zIndex = obtenerSiguienteZ();
            ventana.focus();
            botonTaskbar.remove();
        });
    });

    ventana.focus();
}

// =========================================================
// BRANDING
// =========================================================

function abrirBranding() {

    if (document.querySelector(".branding-window")) {

        const existente =
            document.querySelector(".branding-window");

        existente.style.display = "block";
        existente.style.zIndex = obtenerSiguienteZ();

        return;
    }


    const ventana = document.createElement("div");

    ventana.className =
        "window branding-window";


    ventana.style.left = "calc(50% - 300px)";
    ventana.style.top = "calc(50% - 180px)";
    ventana.style.transform = "none";
    ventana.style.zIndex = obtenerSiguienteZ();


    ventana.innerHTML = `

        <div class="title-bar">

            <span>📁 BRANDING</span>

            <div class="window-buttons">

                <button class="minimize-button">_</button>
                <button class="close-button">×</button>

            </div>

        </div>


        <div class="folder-content">
<div class="folder-header">

                C:\\JORGE\\PORTFOLIO\\BRANDING

            </div>


            <div class="empty-folder">

                <div class="folder-big-icon">📁</div>

                <div>BRANDING PROJECTS</div>

                <small>
                    DIRECTORY READY
                </small>

            </div>


            <div class="work-status">

                <span>0 FILES</span>

                <span>SYSTEM: ONLINE</span>

            </div>

        </div>

    `;


    document.body.appendChild(ventana);


    configurarVentanaSecundaria(ventana, "📁 BRANDING");

}
// =========================================================
// TOYS
// Espacio reservado para futuros objetos 3D interactivos.
// =========================================================

function abrirToys() {

    if (document.querySelector(".toys-window")) {

        const existente = document.querySelector(".toys-window");
        existente.style.display = "block";
        existente.style.zIndex = obtenerSiguienteZ();

        return;
    }

    // Carga el visor 3D solo cuando se abre TOYS.
    // Esto evita que el modelo consuma recursos mientras el usuario
    // navega por el resto del portafolio.
    if (!customElements.get("model-viewer")) {
        const loader = document.createElement("script");
        loader.type = "module";
        loader.src =
            "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
        document.head.appendChild(loader);
    }

    const ventana = document.createElement("div");

    ventana.className = "window toys-window";

    ventana.style.left = "calc(50% - 300px)";
    ventana.style.top = "calc(50% - 250px)";
    ventana.style.transform = "none";
    ventana.style.zIndex = obtenerSiguienteZ();

    ventana.innerHTML = `

        <div class="title-bar">

            <span>🧸 TOYS</span>

            <div class="window-buttons">

                <button class="minimize-button">_</button>
                <button class="close-button">×</button>

            </div>

        </div>

        <div class="toys-3d-content">

            <div class="toys-3d-toolbar">
                <span>OBJETO DETECTADO // 3D</span>
                <span class="toys-3d-status">
                    SEÑAL <i class="toys-online-dot"></i> ACTIVA
                </span>
            </div>

            <div class="toys-3d-stage">

                <div class="toys-3d-grid"></div>

                <div class="toys-object-switcher" aria-label="Navegar entre objetos 3D">
                    <button type="button" class="toys-object-button toys-object-prev" aria-label="Objeto anterior" data-toys-object="prev">‹</button>
                    <span class="toys-object-indicator" aria-live="polite">01 / 10</span>
                    <button type="button" class="toys-object-button toys-object-next" aria-label="Siguiente objeto" data-toys-object="next">›</button>
                </div>

                <model-viewer
                    id="toys-model-viewer"
                    class="toys-model-viewer"
                    src="images/Toys/Dollweb.glb"
                    alt="Objeto 3D: Doll"
                    camera-controls
                    auto-rotate
                    rotation-per-second="12deg"
                    interaction-prompt="none"
                    environment-image="neutral"
                    exposure="1"
                    shadow-intensity="0.45"
                    camera-orbit="0deg 90deg 2.8m"
                    field-of-view="32deg"
                    loading="lazy">
                </model-viewer>

                <div class="toys-3d-hud toys-hud-top-left">
                    <span>ESCENA: 01</span>
                    <span>MODO: OBJETO</span>
                </div>

                <div class="toys-3d-hud toys-hud-bottom-right">
                    <span>ARRASTRAR / GIRAR</span>
                    <span>RUEDA / ZOOM</span>
                </div>

            </div>

            <div class="toys-3d-info">

                <div class="toys-3d-name" id="toys-object-name">
                    DOLL
                </div>

                <div class="toys-3d-meta">
                    MODELO 3D // EXPLORACIÓN VISUAL
                </div>

                <div class="toys-3d-description" id="toys-object-description">
                    OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN.
                </div>

            </div>

            <div class="work-status toys-3d-footer">

                <span>10 OBJETOS</span>
                <span>SISTEMA: ONLINE</span>

            </div>

        </div>

    `;

    document.body.appendChild(ventana);

    // El visor es un componente externo: esperamos a que exista antes
    // de aplicar pequeños ajustes visuales/funcionales.
    const prepararVisor = () => {
        const visor = ventana.querySelector("#toys-model-viewer");
        if (!visor) return;

        visor.addEventListener("load", () => {
            visor.cameraOrbit = "0deg 90deg 2.8m";
        }, { once: true });

        const prev = ventana.querySelector(".toys-object-prev");
        const next = ventana.querySelector(".toys-object-next");
        const indicador = ventana.querySelector(".toys-object-indicator");
        const nombre = ventana.querySelector("#toys-object-name");
        const descripcion = ventana.querySelector("#toys-object-description");

        const objetos = [
            { src: "images/Toys/Dollweb.glb", nombre: "DOLL", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/demondollweb.glb", nombre: "DEMONDOLL", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/demongirlweb.glb", nombre: "DEMON GIRL", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/Evilweb.glb", nombre: "EVIL", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/Kidweb.glb", nombre: "KID", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/villianweb.glb", nombre: "VILLIAN", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/stardemonweb.glb", nombre: "STAR DEMON", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/goodboyweb.glb", nombre: "GOOD BOY", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/kid2.glb", nombre: "KID 2", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." },
            { src: "images/Toys/coin.glb", nombre: "COIN", descripcion: "OBJETO GENERADO A PARTIR DE UNA ILUSTRACIÓN." }
        ];
        let indiceObjeto = 0;

        const mostrarObjeto = (nuevoIndice) => {
            indiceObjeto = (nuevoIndice + objetos.length) % objetos.length;
            const objeto = objetos[indiceObjeto];

            visor.src = objeto.src;

            if (objeto.nombre === "KID") {
                visor.addEventListener("load", () => {
                    visor.cameraOrbit = "0deg 90deg 2.8m";
                }, { once: true });
            }

            if (nombre) nombre.textContent = objeto.nombre;
            if (descripcion) descripcion.textContent = objeto.descripcion;
            if (indicador) indicador.textContent = `${String(indiceObjeto + 1).padStart(2, "0")} / 10`;

            const escena = ventana.querySelector(".toys-hud-top-left span:first-child");
            if (escena) escena.textContent = `ESCENA: 0${indiceObjeto + 1}`;
        };

        if (prev) prev.addEventListener("click", () => mostrarObjeto(indiceObjeto - 1));
        if (next) next.addEventListener("click", () => mostrarObjeto(indiceObjeto + 1));
    };

    if (customElements.get("model-viewer")) {
        prepararVisor();
    } else {
        customElements.whenDefined("model-viewer").then(prepararVisor);
    }

    configurarVentanaSecundaria(ventana, "🧸 TOYS");
}
// =========================================================
// MUSIC
// =========================================================

// Pistas de música para el reproductor.
// Los MP3 se sirven desde audio/Music/ para mantener el sitio ligero.
// Las portadas actuales son placeholders; después podemos asignar un PNG
// específico a cada pista sin tocar el sistema de reproducción.
const musicTracks = [
    { title: "NU 3", audio: "audio/Music/NU 3 inst.mp3", cover: "images/interface/Reproductor/Portadas/NU3.png" },
    { title: "Aventar y aventarse Final", audio: "audio/Music/Aventar y aventarse Final.mp3", cover: "images/interface/Reproductor/Portadas/Aventar y aventarse.png" },
    { title: "Ben affleck", audio: "audio/Music/Ben affleck.mp3", cover: "images/interface/Reproductor/Portadas/Ben affleck.png" },
    { title: "Cañeria", audio: "audio/Music/Cañeria.mp3", cover: "images/interface/Reproductor/Portadas/Cañeria.png" },
    { title: "Guachafita 2", audio: "audio/Music/Guachafita 2.mp3", cover: "images/interface/Reproductor/Portadas/Guachafita 2.png" },
    { title: "Jam3", audio: "audio/Music/Jam3.mp3", cover: "images/interface/Reproductor/Portadas/Jam3.png" },
    { title: "Moon Final", audio: "audio/Music/Moon Final.mp3", cover: "images/interface/Reproductor/Portadas/Moon.png" },
    { title: "Perspectiva 2.0 Final Final", audio: "audio/Music/Perspectiva 2.0 Final Final.mp3", cover: "images/interface/Reproductor/Portadas/Perspectiva.png" },
    { title: "Ryb 2", audio: "audio/Music/Ryb 2.mp3", cover: "images/interface/Reproductor/Portadas/Ryb 2.png" },
    { title: "RYb", audio: "audio/Music/RYb.mp3", cover: "images/interface/Reproductor/Portadas/Ryb.png" },
    { title: "Sad chonta", audio: "audio/Music/Sad chonta.mp3", cover: "images/interface/Reproductor/Portadas/Sad chonta.png" },
    { title: "Tostada", audio: "audio/Music/Tostada.mp3", cover: "images/interface/Reproductor/Portadas/Tostada.png" },
    { title: "trasteo", audio: "audio/Music/trasteo.mp3", cover: "images/interface/Reproductor/Portadas/Trasteo.png" },
    { title: "Túnel", audio: "audio/Music/Túnel.mp3", cover: "images/interface/Reproductor/Portadas/Tunel.png" },
    { title: "made in", audio: "audio/Music/made inn.wav", cover: "images/interface/Reproductor/Portadas/Made in.png" }
];

// Orden de reproducción: NU 3 siempre primero y el resto barajado una sola vez
// al cargar la web. No modificamos musicTracks para no romper Prev/Next ni
// ninguna referencia que dependa del índice original.
function crearOrdenMusic() {
    const resto = musicTracks.slice(1).map((_, index) => index + 1);

    for (let i = resto.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [resto[i], resto[j]] = [resto[j], resto[i]];
    }

    return [0, ...resto];
}

const musicPlaybackOrder = crearOrdenMusic();
let musicTrackIndex = 0; // posición dentro del orden de reproducción

function getMusicTrackIndex() {
    return musicPlaybackOrder[musicTrackIndex] ?? 0;
}

function abrirMusic() {

    if (document.querySelector(".music-window")) {

        const existente =
            document.querySelector(".music-window");

        existente.style.display = "block";
        existente.style.zIndex = obtenerSiguienteZ();

        return;
    }

    const audio = obtenerMusicAudio();

    const ventana = document.createElement("div");
    ventana.className = "window music-window";
    ventana.style.left = "calc(50% - 210px)";
    ventana.style.top = "calc(50% - 150px)";
    ventana.style.transform = "none";
    ventana.style.zIndex = obtenerSiguienteZ();

    ventana.innerHTML = `
        <div class="title-bar">
            <span>🎵 JORGE PLAYER</span>
            <div class="window-buttons">
                <button class="minimize-button">_</button>
                <button class="close-button">×</button>
            </div>
        </div>

        <div class="music-content">
            <div class="music-display">
                <div class="music-status">NOW PLAYING</div>
                <div class="music-title">JORGE / MUSIC</div>
                <div class="music-time">00:00</div>
            </div>

            <div class="visualizer">
                <span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span>
            </div>

            <div class="player-controls">
                <button class="music-prev" type="button">◀</button>
                <button class="music-play" type="button">▶</button>
                <button class="music-stop" type="button">■</button>
                <button class="music-next" type="button">▶▶</button>
            </div>

            <div class="music-message">AUDIO DIRECTORY READY</div>
        </div>
    `;

    document.body.appendChild(ventana);

    const musicTitle = ventana.querySelector(".music-title");
    const musicTime = ventana.querySelector(".music-time");
    const musicPrev = ventana.querySelector(".music-prev");
    const musicPlay = ventana.querySelector(".music-play");
    const musicStop = ventana.querySelector(".music-stop");
    const musicNext = ventana.querySelector(".music-next");

    function formatTime(value) {
        const min = Math.floor(value / 60).toString().padStart(2, "0");
        const sec = Math.floor(value % 60).toString().padStart(2, "0");
        return `${min}:${sec}`;
    }

    function actualizarVentanaMusic() {
        const track = musicTracks[getMusicTrackIndex()];
        if (!track) return;

        musicTitle.textContent =
            `${String(musicTrackIndex + 1).padStart(2, "0")} / ${track.title}`;

        const current = audio.currentTime || 0;
        const duration = Number.isFinite(audio.duration) ? audio.duration : 0;
        musicTime.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    }

    function reproducirMusic() {
        try {
            const playPromise = audio.play();
            if (playPromise && typeof playPromise.then === "function") {
                playPromise.then(() => {
                    actualizarVentanaMusic();
                }).catch(error => {
                    console.error("No se pudo reproducir MUSIC:", error);
                });
            }
        } catch (error) {
            console.error("No se pudo reproducir MUSIC:", error);
        }
    }

    function cargarTrackMusic(index, autoPlay = false) {
        musicTrackIndex = (index + musicPlaybackOrder.length) % musicPlaybackOrder.length;
        const track = musicTracks[getMusicTrackIndex()];
        if (!track) return;

        audio.pause();
        audio.src = track.audio;
        audio.currentTime = 0;
        actualizarVentanaMusic();

        // El src cambia sin tocar machineAudio: NU 3 sigue intacto.
        // Al venir de un clic de usuario, play() puede continuar la reproducción.
        if (autoPlay) reproducirMusic();
    }

    musicPrev?.addEventListener("click", () => {
        const estabaReproduciendo = !audio.paused;
        cargarTrackMusic(musicTrackIndex - 1, estabaReproduciendo);
    });

    musicNext?.addEventListener("click", () => {
        const estabaReproduciendo = !audio.paused;
        cargarTrackMusic(musicTrackIndex + 1, estabaReproduciendo);
    });

    musicPlay?.addEventListener("click", () => {
        if (audio.paused) reproducirMusic();
        else audio.pause();
    });

    musicStop?.addEventListener("click", () => {
        audio.pause();
        audio.currentTime = 0;
        actualizarVentanaMusic();
    });

    audio.addEventListener("timeupdate", actualizarVentanaMusic);
    audio.addEventListener("loadedmetadata", actualizarVentanaMusic);
    audio.addEventListener("ended", () => {
        cargarTrackMusic(musicTrackIndex + 1, true);
    });

    cargarTrackMusic(musicTrackIndex, false);

    configurarVentanaSecundaria(
        ventana,
        "🎵 JORGE PLAYER"
    );
}
// =========================================================
// CONFIGURAR VENTANA SECUNDARIA
// =========================================================

function configurarVentanaSecundaria(
    ventana,
    nombre
) {

    const barra =
        ventana.querySelector(".title-bar");


    const botonCerrar =
        ventana.querySelector(".close-button");


    const botonMinimizar =
        ventana.querySelector(".minimize-button");


    // Hacer ventana movible
    hacerMovible(ventana, barra);


    // Llevar al frente
    ventana.addEventListener("mousedown", () => {

        ventana.style.zIndex =
            obtenerSiguienteZ();

    });


    // Cerrar
    botonCerrar.addEventListener("click", () => {

        ventana.remove();

    });


    // Minimizar
    botonMinimizar.addEventListener("click", () => {

        ventana.style.display = "none";


        const taskbarWindows =
            document.querySelector(
                ".taskbar-windows"
            );


        const botonTaskbar =
            document.createElement("button");


        botonTaskbar.className =
            "task-window";


        botonTaskbar.textContent =
            nombre;


        taskbarWindows.appendChild(
            botonTaskbar
        );


        botonTaskbar.addEventListener(
            "click",
            () => {

                ventana.style.display = "block";

                ventana.style.zIndex =
                    obtenerSiguienteZ();

                botonTaskbar.remove();

            }
        );

    });

}
// =========================================================
// BOTONES PRINCIPALES
// =========================================================

const aboutButton =
    document.getElementById("about-button");

const contactButton =
    document.getElementById("contact-button");

const musicButton =
    document.getElementById("music-button");

if (aboutButton) {

    aboutButton.addEventListener("click", () => {

        abrirAbout();

    });

}


if (contactButton) {

    contactButton.addEventListener("click", () => {

        abrirContact();

    });
    if (musicButton) {

    musicButton.addEventListener("click", () => {

        abrirMusic();

    });

}

}
// =========================================================
// ABOUT
// =========================================================

function abrirAbout() {

    if (document.querySelector(".about-window")) {

        const existente =
            document.querySelector(".about-window");

        existente.style.display = "block";
        existente.style.zIndex =
            obtenerSiguienteZ();

        return;
    }


    const ventana =
        document.createElement("div");


    ventana.className =
        "window about-window";


    ventana.style.left =
        "calc(50% - 300px)";

    ventana.style.top =
        "calc(50% - 220px)";

    ventana.style.transform = "none";

    ventana.style.zIndex =
        obtenerSiguienteZ();


    ventana.innerHTML = `

        <div class="title-bar">

            <span>👤 ABOUT.EXE</span>

            <div class="window-buttons">

                <button class="minimize-button">
                    _
                </button>

                <button class="close-button">
                    ×
                </button>

            </div>

        </div>


        <div class="about-content">
<div class="about-main">

                <div class="about-header">

                    <div class="about-avatar">

                        JL

                    </div>


                    <div>

                        <div class="about-name">
                            JORGE LUNA
                        </div>

                        <div class="about-role">

                            ILLUSTRATOR /
                            DESIGNER /
                            MUSICIAN

                        </div>

                    </div>

                </div>


                <div class="about-divider"></div>


                <div class="about-text">

                    <p>

                        Graphic designer, illustrator
                        and musician interested in
                        visual identity, image-making,
                        motion and sound.

                    </p>


                    <p>

                        My work moves between
                        illustration, design and
                        experimentation, looking for
                        connections between visual
                        language, music and narrative.

                    </p>

                </div>


                <div class="about-info">

                    <div>

                        <span>STATUS</span>
                        <strong>AVAILABLE</strong>

                    </div>


                    <div>

                        <span>SYSTEM</span>
                        <strong>JORGE.EXE</strong>

                    </div>


                    <div>

                        <span>LOCATION</span>
                        <strong>BOGOTÁ / COLOMBIA</strong>

                    </div>

                </div>

            </div>


            <div class="work-status">

                <span>USER PROFILE</span>

                <span>SYSTEM: ONLINE</span>

            </div>

        </div>

    `;


    document.body.appendChild(ventana);


    configurarVentanaSecundaria(
        ventana,
        "👤 ABOUT.EXE"
    );

}
// =========================================================
// CONTACT
// =========================================================

window.abrirContact = function abrirContact() {

    if (document.querySelector(".contact-window")) {

        const existente =
            document.querySelector(".contact-window");

        existente.style.display = "block";
        existente.style.zIndex =
            obtenerSiguienteZ();

        return;
    }


    const ventana =
        document.createElement("div");


    ventana.className =
        "window contact-window";


    ventana.style.left =
        "calc(50% - 270px)";

    ventana.style.top =
        "calc(50% - 190px)";

    ventana.style.transform = "none";

    ventana.style.zIndex =
        obtenerSiguienteZ();


    ventana.innerHTML = `

        <div class="title-bar">

            <span>✉ CONTACT.EXE</span>

            <div class="window-buttons">

                <button class="minimize-button">
                    _
                </button>

                <button class="close-button">
                    ×
                </button>

            </div>

        </div>


        <div class="contact-content">
<div class="contact-main">

                <div class="contact-title">

                    ESTABLISH CONNECTION

                </div>


                <div class="contact-subtitle">

                    SELECT A COMMUNICATION CHANNEL

                </div>


                <div class="contact-list">

                    <a href="#" class="contact-item">

                        <span class="contact-icon">
                            @
                        </span>

                        <span>

                            <small>EMAIL</small>

                            <strong>
                                YOUR EMAIL HERE
                            </strong>

                        </span>

                    </a>


                    <a href="#" class="contact-item">

                        <span class="contact-icon">
                            ◎
                        </span>

                        <span>

                            <small>INSTAGRAM</small>

                            <strong>
                                YOUR INSTAGRAM
                            </strong>

                        </span>

                    </a>


                    <a href="#" class="contact-item">

                        <span class="contact-icon">
                            ◈
                        </span>

                        <span>

                            <small>PORTFOLIO</small>

                            <strong>
                                ONLINE
                            </strong>

                        </span>

                    </a>

                </div>


                <div class="contact-message">

                    OPEN FOR COLLABORATIONS,
                    COMMISSIONS AND CREATIVE PROJECTS.

                </div>

            </div>


            <div class="work-status">

                <span>CONNECTION READY</span>

                <span>PORT: 443</span>

            </div>

        </div>

    `;


    document.body.appendChild(ventana);


    configurarVentanaSecundaria(
        ventana,
        "✉ CONTACT.EXE"
    );

}
// =========================================================
// IMÁGENES DE LOS PROYECTOS
// =========================================================
// Estas listas son la única fuente de verdad para cada galería.
// Si agregas, quitas o reordenas una imagen aquí, se actualizan
// automáticamente la galería, el visor, las flechas y el contador.


// =========================================================
// DATOS DE LOS PROYECTOS
// Una sola fuente de verdad para galerías, visores y layouts.
// =========================================================

const dolls = [
    "images/Dolls/12.jpg",
    "images/Dolls/13.jpg",
    "images/Dolls/10.jpg",
    "images/Dolls/11.jpg"
];

const casino = [
    "images/Casino/1.jpg",
    "images/Casino/2.jpg",
    "images/Casino/3.jpg",
    "images/Casino/4.jpg",
    "images/Casino/5.jpg",
    "images/Casino/6.jpg",
    "images/Casino/8.jpg",
    "images/Casino/9.jpg",
    "images/Casino/10.jpg",
    "images/Casino/11.jpg",
    "images/Casino/12.jpg",
    "images/Casino/13.jpg",
    "images/Casino/14.jpg",
    "images/Casino/15.jpg",
    "images/Casino/16.jpg",
    "images/Casino/17.jpg",
    "images/Casino/18.jpg",
    "images/Casino/19.jpg"
];

const enigma = [
    "images/Enigma (Beat tape)/Sin-título-11.jpg",
    "images/Enigma (Beat tape)/Misterio-ruido.png",
    "images/Enigma (Beat tape)/fondoazul.jpg",
    "images/Enigma (Beat tape)/fondo-verde.jpg",
    "images/Enigma (Beat tape)/Fondo-ácido.jpg",
    "images/Enigma (Beat tape)/fondo-ros.jpg",
    "images/Enigma (Beat tape)/Fondo-Tostada.jpg",
    "images/Enigma (Beat tape)/Fondo-Moon.jpg",
    "images/Enigma (Beat tape)/Fondo-Aventar-y-Aventarse.jpg",
    "images/Enigma (Beat tape)/Fondo-perspectiva.jpg"
];

const caerConCalma = [
    "images/Caer con calma/1.gif",
    "images/Caer con calma/2.png"
];

const shiros = [
    "images/Shiros/1.jpg",
    "images/Shiros/2.jpg",
    "images/Shiros/3.jpg"
];

const conjuro = [
    "images/Conjuro/Wizzarrd.gif",
    "images/Conjuro/Wizzarrd.jpg",
    "images/Conjuro/Wizzarrd1.jpg",
    "images/Conjuro/Wizzarrd2.jpg",
    "images/Conjuro/Wizzarrd3.jpg",
    "images/Conjuro/Wizzarrd4.jpg",
    "images/Conjuro/Wizzarrd5.jpg",
    "images/Conjuro/Wizzarrd6.jpg"
];

const errorSistema = [
    "images/Error del sistema/1.jpg",
    "images/Error del sistema/2.jpg",
    "images/Error del sistema/3.jpg",
    "images/Error del sistema/4.jpg"
];

const desamor = [
    "images/Desamor/1.jpg",
    "images/Desamor/2.png",
    "images/Desamor/3.png",
    "images/Desamor/4.png",
    "images/Desamor/5.png",
    "images/Desamor/6.png",
    "images/Desamor/7.png",
    "images/Desamor/8.png",
    "images/Desamor/9.png",
    "images/Desamor/10.png",
    "images/Desamor/11.png",
    "images/Desamor/12.jpg",
    "images/Desamor/13.jpg",
    "images/Desamor/14.jpg"
];

const bat = [
    "images/Bat/1.jpg",
    "images/Bat/2.jpg",
    "images/Bat/3.jpg",
    "images/Bat/4.jpg",
    "images/Bat/5.jpg"
];

const tocarHastaElAsco = [
    "images/Tocar hasta el asco/1.jpg",
    "images/Tocar hasta el asco/2.jpg",
    "images/Tocar hasta el asco/3.jpg"
];

const projectData = {
    dolls: {
        title: "DOLL SERIES",
        technique: "DIGITAL ILLUSTRATION",
        description: "A series of illustrated characters exploring identity, fantasy and visual experimentation through hand-drawn textures and retro pop aesthetics.",
        path: "DOLLS",
        layout: "behance",
        images: dolls
    },

    bat: {
        title: "BAT",
        technique: "DIGITAL ILLUSTRATION",
        description: "PROJECT DESCRIPTION PENDING",
        path: "BAT",
        layout: "grid",
        images: bat
    },

    casino: {
        title: "CASINO WALLPAPER SERIES",
        technique: "DIGITAL ILLUSTRATION",
        description: "A series of digital illustrations created as wallpapers for an online casino, exploring surreal characters, playful compositions and retro-inspired aesthetics.",
        path: "CASINO",
        layout: "grid",
        images: casino
    },

    enigma: {
        title: "ENIGMA BEAT TAPE",
        technique: "MUSIC / VISUAL",
        description: "A beat tape accompanied by an audiovisual piece. The visual will be connected here through a lightweight video player.",
        path: "ENIGMA (BEAT TAPE)",
        layout: "grid",
        images: enigma,

        // Add the YouTube link here later.
        // Keeping this empty means the page does not load an iframe.
        videoUrl: "https://www.youtube.com/watch?v=-TeD7sVrbN4"
    },

    caer: {
        title: "CAER CON CALMA",
        technique: "MOTION / VISUAL",
        description: "PROJECT DESCRIPTION PENDING",
        path: "CAER CON CALMA",
        layout: "grid",
        images: caerConCalma,

        // Add the YouTube link here later.
        // Keeping this empty means the page shows a ready-to-use video slot.
        videoUrl: "https://www.youtube.com/watch?v=f-mpQRB9FeM"
    },

    shiros: {
        title: "SHIROS",
        technique: "DIGITAL ILLUSTRATION",
        description: "A vertical visual series designed to be experienced as a continuous scrolling piece.",
        path: "SHIROS",
        layout: "behance",
        images: shiros
    },

    conjuro: {
        title: "CONJURO",
        technique: "DIGITAL ILLUSTRATION",
        description: "PROJECT DESCRIPTION PENDING",
        path: "CONJURO",
        layout: "grid",
        images: conjuro
    },

    error: {
        title: "ERROR DEL SISTEMA",
        technique: "DIGITAL ART",
        description: "PROJECT DESCRIPTION PENDING",
        path: "ERROR DEL SISTEMA",
        layout: "grid",
        images: errorSistema
    },

    desamor: {
        title: "DESAMOR",
        technique: "DIGITAL ILLUSTRATION",
        description: "PROJECT DESCRIPTION PENDING",
        path: "DESAMOR",
        layout: "grid",
        images: desamor
    },

    tocar: {
        title: "TOCAR HASTA EL ASCO",
        technique: "DIGITAL ILLUSTRATION",
        description: "PROJECT DESCRIPTION PENDING",
        path: "TOCAR HASTA EL ASCO",
        layout: "grid",
        images: tocarHastaElAsco
    }
};

let proyectoActual = null;
let imagenActualProyecto = 0;


// =========================================================
// VISOR DE PROYECTOS
// =========================================================

function obtenerImagenesProyecto() {

    return projectData[proyectoActual]?.images || [];

}


function abrirVisorProyecto(tipo, indice) {

    proyectoActual = tipo;
    imagenActualProyecto = indice;

    actualizarVisorProyecto();

    const viewer =
        document.querySelector("#projectViewer");

    if (!viewer) return;

    viewer.classList.add("active");

}


function cerrarVisorProyecto() {

    const viewer =
        document.querySelector("#projectViewer");

    if (!viewer) return;

    viewer.classList.remove("active");

}


function actualizarVisorProyecto() {

    const viewer =
        document.querySelector("#projectViewer");

    const imagen =
        document.querySelector("#projectViewerImage");

    const contador =
        document.querySelector("#projectViewerCounter");

    if (!viewer || !imagen || !contador) return;

    const imagenes =
        obtenerImagenesProyecto();

    if (!imagenes.length) return;

    if (imagenActualProyecto < 0) {
        imagenActualProyecto = imagenes.length - 1;
    }

    if (imagenActualProyecto >= imagenes.length) {
        imagenActualProyecto = 0;
    }

    imagen.src =
        imagenes[imagenActualProyecto];

    const nombreArchivo =
        imagenes[imagenActualProyecto]
            .split("/")
            .pop()
            .replace(/\.[^/.]+$/, "");

    imagen.alt =
        `${projectData[proyectoActual].title} ${nombreArchivo}`;

    contador.textContent =
        String(imagenActualProyecto + 1).padStart(2, "0")
        + " / "
        + String(imagenes.length).padStart(2, "0");

}


function imagenSiguienteProyecto() {

    const imagenes =
        obtenerImagenesProyecto();

    if (!imagenes.length) return;

    imagenActualProyecto++;

    if (imagenActualProyecto >= imagenes.length) {
        imagenActualProyecto = 0;
    }

    actualizarVisorProyecto();

}


function imagenAnteriorProyecto() {

    const imagenes =
        obtenerImagenesProyecto();

    if (!imagenes.length) return;

    imagenActualProyecto--;

    if (imagenActualProyecto < 0) {
        imagenActualProyecto = imagenes.length - 1;
    }

    actualizarVisorProyecto();

}


// =========================================================
// TECLADO DEL VISOR
// =========================================================

document.addEventListener("keydown", (e) => {

    const viewer =
        document.querySelector("#projectViewer");

    if (
        !viewer ||
        !viewer.classList.contains("active")
    ) {
        return;
    }

    if (e.key === "ArrowRight") {

        e.preventDefault();

        imagenSiguienteProyecto();

    }

    if (e.key === "ArrowLeft") {

        e.preventDefault();

        imagenAnteriorProyecto();

    }

    if (e.key === "Escape") {

        e.preventDefault();

        cerrarVisorProyecto();

    }

});


// =========================================================
// BOTONES DEL CHASIS
// =========================================================
// Orden: 1 = My Work, 2 = About, 3 = Toys, 4 = Contact.

const machineButton1 = document.querySelector(".machine-button-1");
const machineButton2 = document.querySelector(".machine-button-2");
const machineButton3 = document.querySelector(".machine-button-3");
const machineButton4 = document.querySelector(".machine-button-4");

if (machineButton1) {
    machineButton1.addEventListener("click", abrirMyWork);
}

if (machineButton2) {
    machineButton2.addEventListener("click", abrirAbout);
}

if (machineButton3) {
    machineButton3.addEventListener("click", abrirToys);
}

if (machineButton4) {
    machineButton4.addEventListener("click", abrirContact);
}
/* =================================
   FONDO DE DATOS
   ================================= */

const matrixCanvas = document.getElementById("matrix-bg");
const matrixCtx = matrixCanvas.getContext("2d");

let matrixWidth;
let matrixHeight;

const matrixChars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const matrixFontSize = 13;
let matrixColumns;
let matrixDrops;

function resizeMatrix() {
    matrixWidth = matrixCanvas.width = window.innerWidth;
    matrixHeight = matrixCanvas.height = window.innerHeight;

    matrixColumns = Math.floor(matrixWidth / matrixFontSize);

    matrixDrops = [];

    for (let i = 0; i < matrixColumns; i++) {
        matrixDrops[i] =
            Math.floor(Math.random() * matrixHeight / matrixFontSize);
    }
}

function drawMatrix() {

    matrixCtx.fillStyle = "rgba(5, 7, 8, 0.08)";
    matrixCtx.fillRect(
        0,
        0,
        matrixWidth,
        matrixHeight
    );

    matrixCtx.fillStyle = "rgba(70, 150, 90, 0.35)";
    matrixCtx.font = matrixFontSize + "px monospace";

    for (let i = 0; i < matrixDrops.length; i++) {

        const character =
            matrixChars[
                Math.floor(Math.random() * matrixChars.length)
            ];

        const x = i * matrixFontSize;
        const y = matrixDrops[i] * matrixFontSize;

        matrixCtx.fillText(
            character,
            x,
            y
        );

        if (
            y > matrixHeight &&
            Math.random() > 0.975
        ) {
            matrixDrops[i] = 0;
        }

        matrixDrops[i]++;
    }
}

resizeMatrix();

window.addEventListener(
    "resize",
    resizeMatrix
);

setInterval(
    drawMatrix,
    70
);
// =========================================================
// REPRODUCTOR FISICO / CD + CRT WATER V3.3
// Un solo controlador para evitar dobles eventos y problemas de audio.
// =========================================================

const machinePlayerLayer = document.querySelector(".machine-player-layer");
const machinePlayerPrev = document.querySelector(".machine-player-prev");
const machinePlayerPlay = document.querySelector(".machine-player-play");
const machinePlayerNext = document.querySelector(".machine-player-next");
const machinePlayerPlayImage = machinePlayerPlay
    ? machinePlayerPlay.querySelector("img")
    : null;
const machineCd = document.querySelector(".machine-cd");
const machineAudio = document.getElementById("machine-audio");

// Audio independiente para la ventana MUSIC.
// machineAudio queda reservado para el reproductor físico / CRT.
let musicAudio = null;

function obtenerMusicAudio() {
    if (musicAudio) return musicAudio;

    musicAudio = new Audio();
    musicAudio.id = "music-player-audio";
    musicAudio.preload = "metadata";
    musicAudio.volume = 1;
    return musicAudio;
}

let machineCdIndex = 0;
let machinePlayerPlaying = false;

function actualizarTrackMachine() {
    // ESTADO INICIAL DEFINITIVO: NU 3 siempre abre el reproductor.
    const firstTrack = musicTracks[0];
    if (!firstTrack) return;

    machineCdIndex = 0;

    // Reemplaza inmediatamente cualquier placeholder que venga del HTML.
    if (machineCd) {
        machineCd.src = firstTrack.cover;
        machineCd.setAttribute("src", firstTrack.cover);
    }

    const secondTitle = document.getElementById("machine-second-title");
    if (secondTitle) {
        secondTitle.innerHTML = "PISTA<br>01";
    }

    document.title = `JORGE // ${firstTrack.title}`;

    if (machineAudio) {
        machineAudio.src = firstTrack.audio;
        machineAudio.load();
    }
}

// La pista inicial se sincroniza una sola vez.
// IMPORTANTE: no volver a ejecutar esto en DOMContentLoaded/window.load,
// porque esos eventos pueden ocurrir después de que el usuario ya haya
// avanzado de pista y volverían a colocar el reproductor en NU 3.
function actualizarBotonReproduccion() {
    if (!machinePlayerPlayImage) return;

    machinePlayerPlayImage.src = machinePlayerPlaying
        ? "images/interface/Reproductor/Stop.png"
        : "images/interface/Reproductor/play.png";

    if (machinePlayerPlay) {
        machinePlayerPlay.setAttribute(
            "aria-label",
            machinePlayerPlaying ? "Detener" : "Reproducir"
        );
    }
}

function cambiarCdMachine(direccion, forzarReproduccion = false) {
    if (!musicTracks.length || !machineAudio || !musicPlaybackOrder.length) return;

    // El índice físico pertenece ÚNICAMENTE al orden de reproducción.
    // Next/Prev avanzan una posición, sin volver a consultar ni reinicializar
    // el estado de arranque.
    const debeReproducir = forzarReproduccion || !machineAudio.paused;

    machineAudio.pause();

    machineCdIndex += direccion;
    if (machineCdIndex < 0) machineCdIndex = musicPlaybackOrder.length - 1;
    if (machineCdIndex >= musicPlaybackOrder.length) machineCdIndex = 0;

    const track = musicTracks[musicPlaybackOrder[machineCdIndex]];

    if (machineCd) machineCd.src = track.cover;

    const secondTitle = document.getElementById("machine-second-title");
    if (secondTitle) {
        secondTitle.innerHTML = `PISTA<br>${String(machineCdIndex + 1).padStart(2, "0")}`;
    }

    document.title = `JORGE // ${track.title}`;
    document.dispatchEvent(new CustomEvent("music-track-changed", {
        detail: musicPlaybackOrder[machineCdIndex]
    }));

    machinePlayerPlaying = false;
    machinePlayerLayer?.classList.remove("is-playing");
    actualizarBotonReproduccion();
    clearMachineCrt();

    // Cambiamos la fuente. NO usamos load() antes de play(): en algunos
    // navegadores eso rompe la activación de usuario necesaria para autoplay.
    machineAudio.src = track.audio;
    machineAudio.currentTime = 0;

    if (!debeReproducir) return;

    try {
        // Si ya existe el contexto de Web Audio, lo reactivamos sin esperar.
        // La llamada a play() permanece dentro del mismo gesto del usuario.
        if (machineAudioCtx && machineAudioCtx.state === "suspended") {
            machineAudioCtx.resume();
        }

        const playPromise = machineAudio.play();

        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.then(() => {
                machinePlayerPlaying = true;
                machinePlayerLayer?.classList.add("is-playing");
                actualizarBotonReproduccion();
                if (!machineCrtRaf) drawMachineCrt();
            }).catch(error => {
                console.error("No se pudo reproducir automáticamente el nuevo track:", error);
                machinePlayerPlaying = false;
                machinePlayerLayer?.classList.remove("is-playing");
                actualizarBotonReproduccion();
            });
        } else {
            machinePlayerPlaying = true;
            machinePlayerLayer?.classList.add("is-playing");
            actualizarBotonReproduccion();
            if (!machineCrtRaf) drawMachineCrt();
        }
    } catch (error) {
        console.error("Error al cambiar y reproducir el track:", error);
        machinePlayerPlaying = false;
        machinePlayerLayer?.classList.remove("is-playing");
        actualizarBotonReproduccion();
    }
}

// Carga la primera pista sin reproducirla automáticamente.
actualizarTrackMachine();

// =========================================================
// CRT WATER FIELD V3.3
// =========================================================

const machineCrtScreen = document.querySelector(".machine-crt-screen");
const machineCrtCanvas = document.getElementById("machine-crt-canvas");

let machineAudioCtx = null;
let machineAnalyser = null;
let machineAudioSource = null;
let machineFreqData = null;
let machineTimeData = null;
let machineCrtRaf = null;
let machineAudioStarted = false;
let machinePhase = 0;
let machineColorPhase = 0;
let machineSmoothEnergy = 0;
let machinePrevBass = 0;
let machineOrganismParticles = [];
let machineOrganismInitialized = false;
let machineOrganismPulse = 0;
let machineOrganismBreath = 0;
let machineOrganismEnergy = 0;
let machineAtomAngle = 0;
let machineAtomPulse = 0;
let machinePrevKick = 0;
let machinePrevMid = 0;
let machinePrevTreble = 0;
let machineKickHit = 0;
let machineMidHit = 0;
let machineTrebleHit = 0;

// V7: el organismo cambia entre ocho comportamientos musicales.
let machineOrganismMode = 0;
let machineOrganismModeTime = 0;
let machineOrganismModeDuration = 8.5;
let machineOrganismModeBlend = 1;
let machineOrganismModeTarget = 0;
let machineOrganismRotationDirection = 1;
let machineOrganismRotationTarget = 1;
let machineOrganismRotationBlend = 1;
let machineOrganismRotationTimer = 0;
let machineOrganismRotationDuration = 8 + Math.random() * 7;

const machineCrtCtx = machineCrtCanvas
    ? machineCrtCanvas.getContext("2d")
    : null;

function resizeMachineCrt() {
    if (!machineCrtCanvas || !machineCrtCtx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    machineCrtCanvas.width = Math.max(1, Math.floor(machineCrtCanvas.clientWidth * dpr));
    machineCrtCanvas.height = Math.max(1, Math.floor(machineCrtCanvas.clientHeight * dpr));
    machineCrtCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeMachineCrt);
resizeMachineCrt();

function setupMachineAudio() {
    if (machineAudioStarted) return true;
    if (!machineAudio || !machineCrtCanvas || !machineCrtCtx) return false;

    try {
        machineAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
        machineAnalyser = machineAudioCtx.createAnalyser();
        machineAnalyser.fftSize = 2048;
        machineAnalyser.smoothingTimeConstant = 0.58;

        machineFreqData = new Uint8Array(machineAnalyser.frequencyBinCount);
        machineTimeData = new Uint8Array(machineAnalyser.fftSize);

        machineAudioSource = machineAudioCtx.createMediaElementSource(machineAudio);
        machineAudioSource.connect(machineAnalyser);
        machineAnalyser.connect(machineAudioCtx.destination);

        machineAudio.volume = 1;
        machineAudioStarted = true;
        return true;
    } catch (error) {
        console.error("No se pudo preparar el audio del CRT:", error);
        return false;
    }
}

function machineBand(from, to) {
    if (!machineAudioCtx || !machineAnalyser || !machineFreqData) return 0;

    let sum = 0;
    let count = 0;
    const nyquist = machineAudioCtx.sampleRate / 2;
    const a = Math.floor(from / nyquist * machineFreqData.length);
    const b = Math.min(
        machineFreqData.length - 1,
        Math.ceil(to / nyquist * machineFreqData.length)
    );

    for (let i = a; i <= b; i++) {
        sum += machineFreqData[i];
        count++;
    }

    return count ? sum / count / 255 : 0;
}

function machineHslToRgb(h, s, l) {
    h = ((h % 360) + 360) % 360 / 360;
    s /= 100;
    l /= 100;

    const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    if (s === 0) {
        const v = Math.round(l * 255);
        return [v, v, v];
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return [
        Math.round(hue2rgb(p, q, h + 1 / 3) * 255),
        Math.round(hue2rgb(p, q, h) * 255),
        Math.round(hue2rgb(p, q, h - 1 / 3) * 255)
    ];
}

function machineWaterColor() {
    const stops = [
        { p: 0.00, h: 140, s: 92, l: 72 },
        { p: 0.25, h: 55,  s: 96, l: 70 },
        { p: 0.50, h: 205, s: 94, l: 70 },
        { p: 0.75, h: 285, s: 90, l: 72 },
        { p: 1.00, h: 140, s: 92, l: 72 }
    ];

    const t = ((machineColorPhase % 1) + 1) % 1;
    let a = stops[0];
    let b = stops[1];

    for (let i = 0; i < stops.length - 1; i++) {
        if (t >= stops[i].p && t <= stops[i + 1].p) {
            a = stops[i];
            b = stops[i + 1];
            break;
        }
    }

    const local = (t - a.p) / (b.p - a.p);

    return machineHslToRgb(
        a.h + (b.h - a.h) * local,
        a.s + (b.s - a.s) * local,
        a.l + (b.l - a.l) * local
    );
}

function machineRgba(rgb, alpha) {
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${alpha})`;
}

function machineLerp(a, b, t) {
    return a + (b - a) * t;
}


// =========================================================
// CRT VINTAGE OVERLAY V19
// Efecto analógico ligero sin modificar los píxeles base del organismo.
// Evita ImageData/putImageData para conservar color y estabilidad.
// =========================================================
let machineCrtVintageCanvas = null;
let machineCrtVintageCtx = null;
let machineCrtVintagePhase = 0;

function drawMachineCrtVintage(w, h, energy, bass, treble) {
    if (!machineCrtCanvas || !machineCrtCtx) return;

    const pw = machineCrtCanvas.width;
    const ph = machineCrtCanvas.height;
    if (!pw || !ph) return;

    machineCrtVintagePhase += 0.012 + bass * 0.025;

    machineCrtCtx.save();
    machineCrtCtx.setTransform(1, 0, 0, 1, 0, 0);
    machineCrtCtx.globalCompositeOperation = "source-over";
    machineCrtCtx.filter = "none";

    // ---------------------------------------------------------
    // V18: NO RGB AFTERIMAGE.
    // Nada de copias desplazadas: evitamos completamente la
    // sensación de retraso/cámara lenta que producía el ghosting.
    // El color original del organismo queda intacto.
    // ---------------------------------------------------------

    // ---------------------------------------------------------
    // Scanlines de tubo CRT.
    // Más visibles cuando hay señal, pero nunca lavan el color.
    // ---------------------------------------------------------
    const lineAlpha = 0.025 + energy * 0.008;
    machineCrtCtx.fillStyle = `rgba(0,0,0,${lineAlpha})`;
    const lineStep = Math.max(3, Math.round(ph / 190));
    for (let y = 0; y < ph; y += lineStep) {
        machineCrtCtx.fillRect(0, y, pw, 1);
    }

    // ---------------------------------------------------------
    // Phosphor grille muy fina.
    // Son líneas verticales microscópicas que dan sensación de
    // fósforo/subpíxel sin generar estela ni desplazar la imagen.
    // ---------------------------------------------------------
    machineCrtCtx.globalAlpha = 0.075;
    machineCrtCtx.fillStyle = "rgba(0,0,0,1)";
    const grilleStep = 3;
    for (let x = 1; x < pw; x += grilleStep) {
        machineCrtCtx.fillRect(x, 0, 1, ph);
    }

    // ---------------------------------------------------------
    // Interferencia horizontal MUY pequeña.
    // Es una deformación instantánea, no una segunda imagen.
    // Cambia con el audio para que la pantalla siga "viva".
    // ---------------------------------------------------------
    const signal = bass * 0.65 + treble * 0.35;
    if (signal > 0.10) {
        const bandCount = Math.floor(1 + signal * 3);
        machineCrtCtx.globalAlpha = 0.045 + signal * 0.025;
        machineCrtCtx.fillStyle = "rgba(180,255,190,1)";
        for (let i = 0; i < bandCount; i++) {
            const y = Math.floor(((machineCrtVintagePhase * 37 + i * 113) % ph));
            machineCrtCtx.fillRect(0, y, pw, 1);
        }
    }

    // ---------------------------------------------------------
    // Ruido analógico: pequeños puntos/segmentos, no una capa gris.
    // ---------------------------------------------------------
    const grainCount = Math.floor(20 + energy * 35);
    machineCrtCtx.globalAlpha = 0.075 + energy * 0.035;
    for (let i = 0; i < grainCount; i++) {
        const x = Math.random() * pw;
        const y = Math.random() * ph;
        const len = 1 + Math.random() * Math.max(1.5, pw * 0.006);
        const bright = Math.random() > 0.58;
        machineCrtCtx.fillStyle = bright
            ? "rgba(210,255,220,0.28)"
            : "rgba(0,0,0,0.24)";
        machineCrtCtx.fillRect(x, y, len, 1);
    }

    // ---------------------------------------------------------
    // Flicker mínimo de fósforo.
    // ---------------------------------------------------------
    if (Math.random() < 0.08) {
        machineCrtCtx.globalAlpha = 0.010 + energy * 0.008;
        machineCrtCtx.fillStyle = "rgba(220,255,225,1)";
        machineCrtCtx.fillRect(0, 0, pw, ph);
    }

    // ---------------------------------------------------------
    // Viñeta CRT: oscurece suavemente los bordes del tubo.
    // ---------------------------------------------------------
    const vignette = machineCrtCtx.createRadialGradient(
        pw * 0.5, ph * 0.5, Math.min(pw, ph) * 0.28,
        pw * 0.5, ph * 0.5, Math.max(pw, ph) * 0.72
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(0.72, "rgba(0,0,0,0.018)");
    vignette.addColorStop(1, "rgba(0,0,0,0.075)");
    machineCrtCtx.globalAlpha = 1;
    machineCrtCtx.fillStyle = vignette;
    machineCrtCtx.fillRect(0, 0, pw, ph);

    machineCrtCtx.restore();
}

function drawMachineGrid(w, h) {
    const ctx = machineCrtCtx;
    if (!ctx) return;

    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(70,190,95,.095)";

    const cols = 6;
    const rows = 4;

    for (let i = 0; i <= cols; i++) {
        const x = i / cols * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
    }

    for (let i = 0; i <= rows; i++) {
        const y = i / rows * h;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
    }

    ctx.strokeStyle = "rgba(110,255,145,.18)";
    ctx.beginPath();
    ctx.moveTo(0, h / 2 + .5);
    ctx.lineTo(w, h / 2 + .5);
    ctx.stroke();
    ctx.restore();
}

function initMachineOrganism(w, h) {
    if (machineOrganismInitialized && machineOrganismParticles.length) return;

    machineOrganismParticles = [];

    // Más densidad para que el organismo tenga presencia incluso en calma.
    const count = 250;

    for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.pow(Math.random(), 0.66) * 0.34;
        const orbit = 0.12 + Math.random() * 0.78;

        machineOrganismParticles.push({
            x: 0.5 + Math.cos(angle) * radius,
            y: 0.5 + Math.sin(angle) * radius * 0.62,
            vx: 0,
            vy: 0,
            px: 0,
            py: 0,
            homeAngle: angle,
            orbit,
            size: 0.32 + Math.random() * 0.95,
            mass: 0.55 + Math.random() * 1.15,
            phase: Math.random() * Math.PI * 2,
            life: Math.random(),
            noise: 0.5 + Math.random() * 1.5,
            layer: Math.random(),
            drift: Math.random() * Math.PI * 2,
            personality: Math.random(),
            seed: Math.random() * Math.PI * 2
        });
    }

    machineOrganismInitialized = true;
}

function drawMachineAtom(ctx, w, h, rgb, glow, bass, mid, treble, energy) {
    const minR = Math.min(w, h);
    const cx = w * 0.5;
    const cy = h * 0.5;

    // El átomo tiene su propia rotación, independiente del movimiento de las partículas.
    machineAtomAngle += 0.008 + mid * 0.020 + bass * 0.010;
    machineAtomPulse *= 0.86;
    machineAtomPulse += Math.max(0, bass - machinePrevBass) * 2.6;

    const pulse = 1 + Math.sin(machineAtomAngle * 1.7) * 0.035 + bass * 0.08;
    const nucleusRadius = minR * (0.016 + energy * 0.013 + machineAtomPulse * 0.056);
    const nucleusGlow = minR * (0.050 + bass * 0.045 + treble * 0.016 + machineAtomPulse * 0.12);

    ctx.save();

    // Aura del núcleo.
    const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucleusGlow);
    aura.addColorStop(0, machineRgba(glow, Math.min(0.72, 0.22 + energy * 0.30 + machineAtomPulse * 0.22)));
    aura.addColorStop(0.32, machineRgba(rgb, Math.min(0.28, 0.08 + bass * 0.16)));
    aura.addColorStop(1, machineRgba(rgb, 0));
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(cx, cy, nucleusGlow, 0, Math.PI * 2);
    ctx.fill();

    // Tres orbitales cruzadas. La rotación hace que parezcan un objeto tridimensional.
    const orbitSets = [
        { rx: 0.235, ry: 0.066, tilt: 0.00, speed: 1.00 },
        { rx: 0.192, ry: 0.112, tilt: Math.PI / 3, speed: -1.25 },
        { rx: 0.205, ry: 0.060, tilt: -Math.PI / 3, speed: 0.78 }
    ];

    ctx.lineCap = "round";

    orbitSets.forEach((orb, index) => {
        const angle = machineAtomAngle * orb.speed + orb.tilt;
        const rx = minR * orb.rx * pulse;
        const ry = minR * orb.ry * (1 + treble * 0.30);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.strokeStyle = machineRgba(glow, 0.12 + energy * 0.10);
        ctx.lineWidth = 0.65 + treble * 0.45;
        ctx.shadowBlur = 2 + treble * 4;
        ctx.shadowColor = machineRgba(glow, 0.35);
        ctx.stroke();
        ctx.restore();

        // Electrón: recorre su órbita y acelera con medios/agudos.
        const electronAngle = machineAtomAngle * (1.3 + index * 0.34) * orb.speed + orb.tilt + index * 2.1;
        const ex = Math.cos(electronAngle) * rx;
        const ey = Math.sin(electronAngle) * ry;

        ctx.save();
        ctx.translate(cx + ex, cy + ey);
        ctx.rotate(angle);
        const electronSize = minR * (0.0042 + treble * 0.004 + energy * 0.002);
        ctx.shadowBlur = 4 + treble * 9 + machineAtomPulse * 8;
        ctx.shadowColor = machineRgba(glow, 0.9);
        ctx.fillStyle = machineRgba(glow, Math.min(0.95, 0.48 + energy * 0.35 + treble * 0.22));
        ctx.beginPath();
        ctx.arc(0, 0, electronSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    // Núcleo: estrella de 5 puntas, pulsando con el bajo.
    const starOuter = nucleusRadius * (2.05 + bass * 0.55 + machineAtomPulse * 1.45);
    const starInner = nucleusRadius * (0.86 + bass * 0.18);
    const starRotation = machineAtomAngle * 0.62;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(starRotation);
    ctx.shadowBlur = 4 + bass * 9 + machineAtomPulse * 9;
    ctx.shadowColor = machineRgba(glow, 0.78);
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
        const a = -Math.PI / 2 + i * Math.PI / 5;
        const wobble = 1 + Math.sin(machineAtomAngle * 2.8 + i * 1.37) * 0.045;
        const r = (i % 2 === 0 ? starOuter : starInner) * wobble;
        const x = Math.cos(a) * r;
        const y = Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = machineRgba(glow, Math.min(0.88, 0.46 + energy * 0.25 + machineAtomPulse * 0.24));
    ctx.strokeStyle = machineRgba(glow, Math.min(0.95, 0.55 + bass * 0.20 + machineAtomPulse * 0.22));
    ctx.lineWidth = minR * (0.0016 + bass * 0.0012);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Núcleo compuesto: pequeños nucleones orbitando alrededor de sí mismos.
    const nucleons = 7;
    for (let i = 0; i < nucleons; i++) {
        const a = machineAtomAngle * (1.5 + (i % 3) * 0.18) + i * (Math.PI * 2 / nucleons);
        const rr = nucleusRadius * (0.35 + (i % 3) * 0.18);
        const nx = cx + Math.cos(a) * rr;
        const ny = cy + Math.sin(a) * rr * 0.72;
        const size = minR * (0.0022 + treble * 0.0014);

        ctx.shadowBlur = 3 + treble * 4;
        ctx.shadowColor = machineRgba(glow, 0.55);
        ctx.fillStyle = machineRgba(glow, 0.72 + Math.min(0.22, energy * 0.20));
        ctx.beginPath();
        ctx.arc(nx, ny, size, 0, Math.PI * 2);
        ctx.fill();
    }

    // Centro del núcleo.
    const nucleusGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, nucleusRadius * 2.8);
    nucleusGradient.addColorStop(0, machineRgba(glow, 0.95));
    nucleusGradient.addColorStop(0.28, machineRgba(glow, 0.65));
    nucleusGradient.addColorStop(1, machineRgba(rgb, 0));
    ctx.fillStyle = nucleusGradient;
    ctx.beginPath();
    ctx.arc(cx, cy, nucleusRadius * 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
}

function updateMachineOrganismRotation(dt, bassHit) {
    machineOrganismRotationTimer += dt;
    machineOrganismRotationBlend = Math.min(1, machineOrganismRotationBlend + dt * 0.55);

    // Cambios suaves y poco frecuentes: el giro invierte su sentido sin pegar un tirón.
    if (machineOrganismRotationTimer > machineOrganismRotationDuration && bassHit > 0.012) {
        machineOrganismRotationTarget *= -1;
        machineOrganismRotationBlend = 0;
        machineOrganismRotationTimer = 0;
        machineOrganismRotationDuration = 8 + Math.random() * 7;
    }

    const t = machineOrganismRotationBlend * machineOrganismRotationBlend * (3 - 2 * machineOrganismRotationBlend);
    machineOrganismRotationDirection = machineOrganismRotationDirection + (machineOrganismRotationTarget - machineOrganismRotationDirection) * t;
}

function chooseMachineOrganismMode(bassHit) {
    const next = (machineOrganismMode + 1 + Math.floor(Math.random() * 7)) % 8;
    machineOrganismModeTarget = next;
    machineOrganismModeBlend = 0;
    machineOrganismModeDuration = 6.5 + Math.random() * 7.5;
    machineOrganismModeTime = 0;
    machineOrganismMode = next;
}

function updateMachineOrganismMode(dt, bassHit) {
    machineOrganismModeTime += dt;
    machineOrganismModeBlend = Math.min(1, machineOrganismModeBlend + dt * 1.8);

    // Los cambios caen mejor sobre un golpe de bajo que sobre un reloj rígido.
    if (machineOrganismModeTime > machineOrganismModeDuration && bassHit > 0.018) {
        chooseMachineOrganismMode(bassHit);
    }
}

function drawMachineOrganism(w, h, bass, mid, treble) {
    const ctx = machineCrtCtx;
    if (!ctx) return;

    initMachineOrganism(w, h);

    const rgb = machineWaterColor();
    const glow = [
        Math.min(255, rgb[0] + 35),
        Math.min(255, rgb[1] + 35),
        Math.min(255, rgb[2] + 35)
    ];

    const minR = Math.min(w, h);

    // Energía global y respiración.
    const energy = bass * 0.52 + mid * 0.33 + treble * 0.15;
    machineOrganismEnergy += (energy - machineOrganismEnergy) * 0.055;
    machineOrganismBreath += 0.018 + bass * 0.032;

    const bassRise = bass - machinePrevBass;
    machinePrevBass += (bass - machinePrevBass) * 0.22;

    // V5: detectamos golpes en subgrave/kick, medios y agudos por separado.
    // Así el movimiento responde a los eventos de la canción y no solo a un
    // promedio de energía que termina sintiéndose como una animación continua.
    const bassHit = Math.max(0, machineKickHit * 0.95 + Math.max(0, bassRise) * 0.35);
    const midHit = machineMidHit;
    updateMachineOrganismMode(1 / 60, bassHit);
    updateMachineOrganismRotation(1 / 60, bassHit);
    const trebleHit = machineTrebleHit;

    const pulse = bassHit * 5.8 + bass * 0.035;
    machineOrganismPulse *= 0.80;
    machineOrganismPulse += pulse;

    const bassEnvelopeTarget = bass * 0.72 + bassHit * 3.4;
    machineOrganismEnergy += (bassEnvelopeTarget - machineOrganismEnergy) * 0.10;

    const breathing = 1 + Math.sin(machineOrganismBreath) * (0.012 + bass * 0.052);
    const bassForce = (0.00022 + bass * 0.0036 + bassHit * 0.026) * breathing;
    const midForce = 0.00030 + mid * 0.0029 + midHit * 0.008;
    const trebleForce = 0.00012 + treble * 0.0021 + trebleHit * 0.006;

    // Más actividad = más amplitud y una nube algo más llena visualmente.
    const activityBoost = 1 + energy * 0.55;

    // Seis personalidades: no cambia la estética, cambia la física.
    // 0 flotación, 1 remolino, 2 expansión, 3 colapso, 4 órbitas rápidas, 5 enjambre,
    // 6 espiral, 7 onda.
    const mode = machineOrganismMode;
    const modeSpeed = [0.48, 0.82, 0.62, 0.72, 1.12, 0.92, 0.76, 0.58][mode];
    const modeRadial = [0.25, 0.55, 1.55, -1.30, 0.35, 0.80, 0.15, 0.65][mode];
    const modeSwirl = [0.30, 1.05, 0.16, -0.50, 1.35, 0.62, 1.60, 0.10][mode];
    const modeNoise = [0.30, 0.55, 0.28, 0.20, 0.72, 1.65, 0.48, 0.85][mode];

    for (const p of machineOrganismParticles) {
        p.px = p.x;
        p.py = p.y;

        const dx = p.x - 0.5;
        const dy = p.y - 0.5;
        const dist = Math.sqrt(dx * dx + dy * dy) + 0.0001;
        const nx = dx / dist;
        const ny = dy / dist;

        // Radio de vida: el bajo empuja, pero una fuerza elástica mantiene
        // al organismo dentro de una zona visible. Así los estallidos no
        // lanzan todas las partículas fuera de la pantalla.
        const collapseBias = mode === 3 ? -0.018 : 0;
        const expansionBias = mode === 2 ? 0.020 : 0;
        const homeRadius = 0.105 + p.orbit * 0.042 + collapseBias + expansionBias;
        const attraction = (dist - homeRadius) * (mode === 3 ? 0.00175 : 0.00142);
        p.vx -= nx * attraction / p.mass;
        p.vy -= ny * attraction / p.mass;

        // El bajo mueve TODA la nube y, sobre todo, responde al golpe real.
        // En vez de una oscilación artificial, cada subida del subgrave genera
        // una expansión radial y luego una recuperación elástica.
        const centerPressure = Math.exp(-dist * 2.8);
        const outerPressure = Math.max(0, (dist - 0.27) / 0.09);
        const containment = Math.max(0, (dist - 0.335) / 0.065);
        const beatPhase = Math.sin(machinePhase * 0.55 + p.phase * 0.22);
        const slowBassBreath = bass * (0.38 + 0.62 * (beatPhase * 0.5 + 0.5));
        const bassPush = bassForce * (0.24 + centerPressure * 0.92) * modeSpeed;
        p.vx += nx * bassPush * (0.48 + slowBassBreath * 1.10 + modeRadial * 0.20) / p.mass;
        p.vy += ny * bassPush * (0.48 + slowBassBreath * 1.10 + modeRadial * 0.20) / p.mass;

        // Personalidad radial: algunos estados inhalan, otros exhalan.
        const modePulse = modeRadial * (0.00042 + bass * 0.0018 + bassHit * 0.008);
        p.vx += nx * modePulse * (0.45 + p.personality * 0.75) / p.mass;
        p.vy += ny * modePulse * (0.45 + p.personality * 0.75) / p.mass;

        // Golpe puntual: desplaza cada partícula según su distancia al núcleo,
        // pero con pequeñas diferencias de fase para conservar el aspecto orgánico.
        if (bassHit > 0.012) {
            const localBeat = 0.55 + 0.45 * Math.sin(p.phase + machinePhase * 2.2);
            const hitImpulse = Math.min(0.028, bassHit * 0.050) * (0.62 + centerPressure * 0.95) * localBeat;
            p.vx += nx * hitImpulse / p.mass;
            p.vy += ny * hitImpulse / p.mass;
        }

        // El bajo también acelera ligeramente la órbita: así se siente como
        // movimiento musical y no únicamente como expansión.
        const rotationSign = machineOrganismRotationDirection;
        const bassOrbit = bass * 0.0009 + bassHit * 0.0035;
        p.vx += -ny * bassOrbit * rotationSign * (0.45 + p.orbit) / p.mass;
        p.vy += nx * bassOrbit * rotationSign * (0.45 + p.orbit) / p.mass;

        // Freno progresivo en los bordes: conserva el estallido, pero devuelve
        // la nube hacia el interior en vez de perderla contra los límites.
        if (outerPressure > 0) {
            const edgeBrake = outerPressure * (0.0038 + bass * 0.0024);
            p.vx -= nx * edgeBrake / p.mass;
            p.vy -= ny * edgeBrake / p.mass;
            p.vx *= 1 - Math.min(0.075, outerPressure * 0.042);
            p.vy *= 1 - Math.min(0.075, outerPressure * 0.042);
        }

        // Contención suave: si alguna partícula consigue llegar demasiado
        // lejos, la devuelve hacia el corazón del organismo sin pegarla a un
        // borde rígido. Esto mantiene los estallidos, pero evita acumulaciones.
        if (containment > 0) {
            const containmentForce = containment * (0.0055 + bass * 0.0025);
            p.vx -= nx * containmentForce / p.mass;
            p.vy -= ny * containmentForce / p.mass;
            p.vx *= 1 - Math.min(0.12, containment * 0.065);
            p.vy *= 1 - Math.min(0.12, containment * 0.065);
        }

        const swirl = (0.00042 + midForce) * modeSwirl * rotationSign * (1 - Math.min(1, dist * 1.5));
        p.vx += -ny * swirl * p.noise;
        p.vy += nx * swirl * p.noise;

        if (midHit > 0.012) {
            const hitSwirl = Math.min(0.012, midHit * 0.020) * (0.35 + p.orbit);
            p.vx += -ny * hitSwirl * p.noise / p.mass;
            p.vy += nx * hitSwirl * p.noise / p.mass;
        }

        const vibration = Math.sin(machinePhase * 9 + p.phase) * trebleForce;
        if (trebleHit > 0.012) {
            const shimmer = Math.min(0.006, trebleHit * 0.012);
            p.vx += Math.sin(p.phase * 2.7 + machinePhase * 4.0) * shimmer / p.mass;
            p.vy += Math.cos(p.phase * 2.1 + machinePhase * 4.6) * shimmer / p.mass;
        }
        p.vx += -ny * vibration * modeNoise;
        p.vy += nx * vibration * modeNoise;

        const orbitAngle = p.homeAngle + machinePhase * (0.10 + p.orbit * 0.18) * modeSpeed * rotationSign
            + Math.sin(machinePhase * 0.31 + p.seed) * 0.18 * modeNoise;
        const bassScale = 1 + bass * 0.055 + Math.min(0.11, bassHit * 0.32);
        let targetX = 0.5 + Math.cos(orbitAngle) * (0.08 + p.orbit * 0.30) * breathing * bassScale;
        let targetY = 0.5 + Math.sin(orbitAngle) * (0.08 + p.orbit * 0.21) * breathing * bassScale;

        if (mode === 0) {
            // Flotación: órbita suave y poca disciplina.
            targetX += Math.sin(machinePhase * 0.45 + p.seed) * 0.018;
            targetY += Math.cos(machinePhase * 0.38 + p.seed * 1.3) * 0.014;
        } else if (mode === 1) {
            // Corriente: las órbitas se estiran y giran.
            targetX = 0.5 + Math.cos(orbitAngle) * (0.10 + p.orbit * 0.34) * bassScale;
            targetY = 0.5 + Math.sin(orbitAngle) * (0.06 + p.orbit * 0.16) * breathing;
        } else if (mode === 2) {
            // Explosión: una figura que respira hacia fuera.
            const burst = 1 + bass * 0.10 + machineOrganismPulse * 0.55;
            targetX = 0.5 + Math.cos(p.homeAngle) * (0.08 + p.orbit * 0.36) * burst;
            targetY = 0.5 + Math.sin(p.homeAngle) * (0.06 + p.orbit * 0.26) * burst;
        } else if (mode === 3) {
            // Colapso: todas las trayectorias buscan el núcleo.
            const collapse = Math.max(0.16, 0.92 - machineOrganismModeTime * 0.025);
            targetX = 0.5 + Math.cos(p.homeAngle) * (0.08 + p.orbit * 0.22) * collapse;
            targetY = 0.5 + Math.sin(p.homeAngle) * (0.06 + p.orbit * 0.15) * collapse;
        } else if (mode === 4) {
            // Órbitas rápidas: cada partícula tiene una velocidad ligeramente distinta.
            targetX = 0.5 + Math.cos(orbitAngle + p.personality * 1.8) * (0.10 + p.orbit * 0.33) * bassScale;
            targetY = 0.5 + Math.sin(orbitAngle + p.personality * 1.8) * (0.07 + p.orbit * 0.24) * breathing;
        } else if (mode === 5) {
            // Enjambre: pequeños grupos se separan y vuelven a encontrarse.
            const flock = Math.sin(machinePhase * 0.85 + p.seed * 2.4) * 0.028 * (0.3 + p.personality);
            targetX += Math.cos(p.seed) * flock;
            targetY += Math.sin(p.seed) * flock;
        } else if (mode === 6) {
            // Espiral: el organismo gira y, al mismo tiempo, sus órbitas se
            // acercan/alejan del centro como un remolino vivo.
            const spiral = Math.sin(machinePhase * 0.48 + p.phase * 1.7) * 0.045;
            const spiralAngle = orbitAngle + (p.orbit * 2.8 + machineOrganismPulse * 0.35) * machineOrganismRotationDirection;
            targetX = 0.5 + Math.cos(spiralAngle) * (0.07 + p.orbit * 0.33 + spiral) * bassScale;
            targetY = 0.5 + Math.sin(spiralAngle) * (0.055 + p.orbit * 0.235 + spiral * 0.7) * breathing;
        } else if (mode === 7) {
            // Onda: bandas de partículas recorren el campo como una onda
            // transversal, con el bajo controlando su amplitud.
            const wave = Math.sin(p.homeAngle * 4.0 + machinePhase * (0.9 + bass * 1.8)) * (0.020 + bass * 0.050 + mid * 0.018);
            targetX = 0.5 + Math.cos(p.homeAngle) * (0.08 + p.orbit * 0.30) * bassScale + Math.cos(p.homeAngle + Math.PI / 2) * wave;
            targetY = 0.5 + Math.sin(p.homeAngle) * (0.06 + p.orbit * 0.21) * breathing + Math.sin(p.homeAngle + Math.PI / 2) * wave;
        }

        p.vx += (targetX - p.x) * (mode === 3 ? 0.00052 : 0.00028);
        p.vy += (targetY - p.y) * (mode === 3 ? 0.00052 : 0.00028);

        if (machineOrganismPulse > 0.006) {
            const safePulse = Math.min(1.35, machineOrganismPulse);
            const outward = Math.max(0.18, 1.0 - Math.min(0.78, dist));
            const impulse = safePulse * 0.00155 * outward;
            p.vx += nx * impulse / p.mass;
            p.vy += ny * impulse / p.mass;
        }

        p.vx += Math.sin(machinePhase * 2.3 + p.phase * 3.1) * 0.00006 * (1 + treble * 8);
        p.vy += Math.cos(machinePhase * 2.0 + p.phase * 2.7) * 0.00006 * (1 + treble * 8);

        const damping = 0.962 - Math.min(0.018, treble * 0.012);
        p.vx *= damping;
        p.vy *= damping;

        p.x += p.vx;
        p.y += p.vy;

        const margin = 0.028;
        if (p.x < margin) {
            p.x = margin;
            p.vx = Math.abs(p.vx) * 0.55;
        } else if (p.x > 1 - margin) {
            p.x = 1 - margin;
            p.vx = -Math.abs(p.vx) * 0.55;
        }
        if (p.y < margin) {
            p.y = margin;
            p.vy = Math.abs(p.vy) * 0.55;
        } else if (p.y > 1 - margin) {
            p.y = 1 - margin;
            p.vy = -Math.abs(p.vy) * 0.55;
        }

        p.life += 0.003 + treble * 0.018;
    }

    // Conexiones ocasionales: durante los picos algunas partículas parecen formar una red.
    ctx.save();
    ctx.lineCap = "round";

    const connectionDistance = 0.046 + Math.min(0.016, energy * 0.018) + (mode === 5 ? 0.010 : 0);
    if (energy > 0.40 || mode === 5) {
        for (let i = 0; i < machineOrganismParticles.length; i += 4) {
            const a = machineOrganismParticles[i];
            let nearest = null;
            let nearestDist = connectionDistance;

            for (let j = i + 1; j < Math.min(i + 22, machineOrganismParticles.length); j++) {
                const b = machineOrganismParticles[j];
                const dx = a.x - b.x;
                const dy = a.y - b.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < nearestDist) {
                    nearest = b;
                    nearestDist = d;
                }
            }

            if (nearest) {
                ctx.beginPath();
                ctx.moveTo(a.x * w, a.y * h);
                ctx.lineTo(nearest.x * w, nearest.y * h);
                ctx.strokeStyle = machineRgba(rgb, Math.min(0.10, (energy - 0.40) * 0.18));
                ctx.lineWidth = 0.45 + treble * 0.25;
                ctx.stroke();
            }
        }
    }

    for (const p of machineOrganismParticles) {
        const x = p.x * w;
        const y = p.y * h;
        const px = p.px * w;
        const py = p.py * h;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const peakDim = Math.max(0.46, 1 - Math.max(0, energy - 0.42) * 0.95);
        const alpha = Math.min(0.68, (0.12 + speed * 20 + energy * 0.12) * peakDim);
        const lineWidth = Math.max(0.30, p.size * (0.56 + treble * 1.28) * (0.92 + activityBoost * 0.35));

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(x, y);
        ctx.strokeStyle = machineRgba(rgb, alpha * 0.62);
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, p.size * (0.42 + treble * 0.50), 0, Math.PI * 2);
        ctx.fillStyle = machineRgba(glow, alpha * 0.50);
        ctx.fill();
    }

    ctx.restore();

    // Sustituimos el punto central por un átomo giratorio.
    drawMachineAtom(ctx, w, h, rgb, glow, bass, mid, treble, energy);
}

function drawMachineCrt() {
    if (!machineCrtCtx || !machineCrtCanvas) return;

    machineCrtRaf = requestAnimationFrame(drawMachineCrt);

    // Modo de previsualización: el organismo vive desde que se abre la página,
    // aunque el navegador todavía no permita iniciar el audio automáticamente.
    // Cuando el usuario pulsa Play, estas señales sintéticas son reemplazadas
    // inmediatamente por las bandas reales de la canción.
    const previewMode = !machineAnalyser || !machineFreqData;
    const previewTime = performance.now() * 0.001;

    if (!previewMode) {
        machineAnalyser.getByteFrequencyData(machineFreqData);
    }

    const bass = previewMode
        ? 0.14 + 0.075 * (0.5 + 0.5 * Math.sin(previewTime * 1.15))
        : machineBand(35, 180);
    const kick = previewMode
        ? 0.10 + 0.085 * (0.5 + 0.5 * Math.sin(previewTime * 2.15 + 0.8))
        : machineBand(45, 115);
    const mid = previewMode
        ? 0.10 + 0.055 * (0.5 + 0.5 * Math.sin(previewTime * 0.72 + 1.6))
        : machineBand(180, 2200);
    const treble = previewMode
        ? 0.075 + 0.045 * (0.5 + 0.5 * Math.sin(previewTime * 2.8 + 2.4))
        : machineBand(2200, 9000);

    // Ataque por banda: buscamos subidas rápidas, que son las que el ojo
    // interpreta como "esto está siguiendo el beat".
    const kickRise = Math.max(0, kick - machinePrevKick);
    const midRise = Math.max(0, mid - machinePrevMid);
    const trebleRise = Math.max(0, treble - machinePrevTreble);

    machinePrevKick += (kick - machinePrevKick) * 0.34;
    machinePrevMid += (mid - machinePrevMid) * 0.22;
    machinePrevTreble += (treble - machinePrevTreble) * 0.26;

    machineKickHit = Math.min(0.55, kickRise * 2.8);
    machineMidHit = Math.min(0.45, midRise * 2.0);
    machineTrebleHit = Math.min(0.45, trebleRise * 2.2);

    const energy = bass * 0.52 + mid * 0.33 + treble * 0.15;

    machinePhase += 0.004 + bass * 0.010 + mid * 0.003 + machineKickHit * 0.012;
    machineColorPhase += 0.00012 + energy * 0.00022;

    const w = machineCrtCanvas.clientWidth;
    const h = machineCrtCanvas.clientHeight;
    if (!w || !h) return;

    // V5: en los clímax limpiamos MÁS, no menos. La música debe aumentar el
    // movimiento, no convertir el CRT en un bloque verde sólido.
    const fade = Math.min(0.34, 0.135 + energy * 0.19 + machineKickHit * 0.10);
    machineCrtCtx.globalCompositeOperation = "source-over";
    machineCrtCtx.shadowBlur = 0;
    machineCrtCtx.fillStyle = `rgba(1,5,2,${fade})`;
    machineCrtCtx.fillRect(0, 0, w, h);

    machineCrtCtx.globalCompositeOperation = "source-over";
    drawMachineGrid(w, h);
    drawMachineOrganism(w, h, bass, mid, treble);
    drawMachineCrtVintage(w, h, energy, bass, treble);

    machineCrtCtx.globalCompositeOperation = "source-over";
    machineCrtCtx.shadowBlur = 0;
}

function clearMachineCrt() {
    if (!machineCrtCtx || !machineCrtCanvas) return;

    const w = machineCrtCanvas.clientWidth;
    const h = machineCrtCanvas.clientHeight;
    machineCrtCtx.globalCompositeOperation = "source-over";
    machineCrtCtx.shadowBlur = 0;
    machineCrtCtx.fillStyle = "#020703";
    machineCrtCtx.fillRect(0, 0, w, h);
    machineOrganismParticles = [];
    machineOrganismInitialized = false;
    machineOrganismPulse = 0;
    machineAtomAngle = 0;
    machineAtomPulse = 0;
    machinePrevKick = 0;
    machinePrevMid = 0;
    machinePrevTreble = 0;
    machineKickHit = 0;
    machineMidHit = 0;
    machineTrebleHit = 0;
}

async function startMachineAudio() {
    if (!machineAudio) return;

    const ready = setupMachineAudio();
    if (!ready) return;

    // play() se invoca sin esperar antes para conservar la activación del clic.
    const playPromise = machineAudio.play();
    await machineAudioCtx.resume();
    await playPromise;

    machinePlayerPlaying = true;
    machinePlayerLayer?.classList.add("is-playing");
    actualizarBotonReproduccion();

    if (!machineCrtRaf) {
        drawMachineCrt();
    }
}

function stopMachineAudio() {
    if (!machineAudio) return;

    machineAudio.pause();
    machineAudio.currentTime = 0;
    machinePlayerPlaying = false;
    machinePlayerLayer?.classList.remove("is-playing");
    actualizarBotonReproduccion();
    clearMachineCrt();
}

if (machinePlayerPlay) {
    machinePlayerPlay.addEventListener("click", async () => {
        try {
            if (machineAudio && machineAudio.paused) {
                await startMachineAudio();
            } else {
                stopMachineAudio();
            }
        } catch (error) {
            console.error("No se pudo reproducir el audio del CRT:", error);
            machinePlayerPlaying = false;
            machinePlayerLayer?.classList.remove("is-playing");
            actualizarBotonReproduccion();
        }
    });
}

if (machinePlayerPrev) {
    machinePlayerPrev.addEventListener("click", () => {
        cambiarCdMachine(-1);
    });
}

if (machinePlayerNext) {
    machinePlayerNext.addEventListener("click", () => {
        cambiarCdMachine(1);
    });
}

if (machineAudio) {
    machineAudio.addEventListener("ended", () => {
        if (musicTracks.length > 1) {
            // Al terminar una pista, el siguiente track debe comenzar solo.
            cambiarCdMachine(1, true);
        } else {
            machinePlayerPlaying = false;
            machinePlayerLayer?.classList.remove("is-playing");
            actualizarBotonReproduccion();
            clearMachineCrt();
        }
    });
}

actualizarBotonReproduccion();
clearMachineCrt();

// INTENTO DE AUTOPLAY
// El navegador puede bloquear audio no silenciado al cargar la página.
// En ese caso no rompemos el reproductor: queda listo para que el primer
// gesto del usuario lo inicie, conservando exactamente los controles actuales.
let machineAutoplayBlocked = false;
let machineAutoplayStarted = false;

async function intentarAutoplayMachineAudio() {
    if (!machineAudio || machineAutoplayStarted || !machineAudio.paused) return;

    try {
        const ready = setupMachineAudio();
        if (!ready) return;

        if (machineAudioCtx && machineAudioCtx.state === "suspended") {
            await machineAudioCtx.resume();
        }

        await machineAudio.play();

        machinePlayerPlaying = true;
        machineAutoplayStarted = true;
        machineAutoplayBlocked = false;
        machinePlayerLayer?.classList.add("is-playing");
        actualizarBotonReproduccion();

        if (!machineCrtRaf) {
            drawMachineCrt();
        }
    } catch (error) {
        machineAutoplayBlocked = true;
        console.info("Autoplay bloqueado por el navegador; esperando interacción del usuario.");
    }
}

// Primer intento: al terminar de cargar la página.
if (document.readyState === "complete") {
    intentarAutoplayMachineAudio();
} else {
    window.addEventListener("load", intentarAutoplayMachineAudio, { once: true });
}

// Fallback silencioso: si el navegador bloqueó el autoplay, el primer gesto
// del usuario puede desbloquearlo sin cambiar ningún control existente.
const desbloquearAutoplayMachine = () => {
    if (!machineAutoplayBlocked || machineAutoplayStarted) return;
    intentarAutoplayMachineAudio();
};
document.addEventListener("pointerdown", desbloquearAutoplayMachine, { once: true, passive: true });
document.addEventListener("keydown", desbloquearAutoplayMachine, { once: true });

// El organismo comienza a respirar inmediatamente al cargar la página.
if (!machineCrtRaf) {
    drawMachineCrt();
}


// =========================================================
// SEGUNDA PANTALLA / MONITOR REACTIVO
// La pantalla observa interacciones reales de la página.
// No cambia de estado al azar: cada cambio nace de una acción.
// =========================================================
(() => {
    const title = document.getElementById("machine-second-title");
    const label = document.getElementById("machine-second-label");
    const readout = document.getElementById("machine-second-readout");
    const voice = document.getElementById("machine-second-voice");
    const state = document.getElementById("machine-second-state");
    const energy = document.getElementById("machine-second-energy");
    const organism = document.getElementById("machine-second-organism");
    const time = document.getElementById("machine-second-time");
    const machineAudioLocal = document.getElementById("machine-audio");
    const playerPlay = document.querySelector(".machine-player-play");
    const playerPrev = document.querySelector(".machine-player-prev");
    const playerNext = document.querySelector(".machine-player-next");

    if (!title || !label || !readout || !voice || !state || !energy || !organism || !time) return;

    const moduleNames = {
        1: "MY WORK",
        2: "ABOUT",
        3: "TOYS",
        4: "CONTACT"
    };

    let elapsed = 0;
    let holdTimer = null;
    let interactionTimer = null;
    let currentInput = "NINGUNA";
    let currentSignal = "ESTABLE";
    let currentState = "EN ESPERA";

    function setFooterState(value) {
        currentState = value;
        state.textContent = `ESTADO: ${value}`;
    }

    function setEnergy(value) {
        energy.style.width = `${Math.max(12, Math.min(92, value))}%`;
    }

    function setMonitor({
        labelText,
        titleHtml,
        stateText = "ACTIVO",
        inputText = currentInput,
        signalText = currentSignal,
        voiceText = "Esperando una entrada...",
        organismText = "RESPONDIENDO",
        energyValue = 64,
        footerText = "ACTIVO",
        hold = 3600
    }) {
        label.textContent = labelText;
        title.innerHTML = titleHtml;
        readout.innerHTML = `<span class="machine-second-dim">ESTADO:</span> ${stateText}<br>
<span class="machine-second-dim">ENTRADA:</span> ${inputText}<br>
<span class="machine-second-dim">SEÑAL:</span> ${signalText}`;
        voice.innerHTML = `${voiceText}<span class="machine-second-cursor"></span>`;
        organism.textContent = organismText;
        setEnergy(energyValue);
        setFooterState(footerText);

        currentInput = inputText;
        currentSignal = signalText;

        clearTimeout(interactionTimer);
        if (hold > 0) {
            interactionTimer = setTimeout(returnToIdle, hold);
        }
    }

    function returnToIdle() {
        setMonitor({
            labelText: "MONITOR DEL SISTEMA // OBSERVACIÓN PASIVA",
            titleHtml: "SISTEMA<br>ACTIVO",
            stateText: machineAudioLocal && !machineAudioLocal.paused ? "ESCUCHANDO" : "ACTIVO",
            inputText: currentInput,
            signalText: machineAudioLocal && !machineAudioLocal.paused ? "RECIBIENDO" : "ESTABLE",
            voiceText: machineAudioLocal && !machineAudioLocal.paused
                ? "La señal está llegando..."
                : "Esperando una entrada...",
            organismText: machineAudioLocal && !machineAudioLocal.paused ? "RESPONDIENDO" : "EN REPOSO",
            energyValue: machineAudioLocal && !machineAudioLocal.paused ? 76 : 58,
            footerText: machineAudioLocal && !machineAudioLocal.paused ? "AUDIO: ACTIVO" : "EN ESPERA",
            hold: 0
        });
    }

    function moduleEvent(id) {
        const name = moduleNames[id] || "MÓDULO";
        currentInput = `CANAL ${id}`;
        currentSignal = "CONECTADA";

        setMonitor({
            labelText: `ENTRADA DETECTADA // CANAL ${id}`,
            titleHtml: `MÓDULO<br>${id}`,
            stateText: "ACCEDIENDO",
            inputText: name,
            signalText: "CONECTADA",
            voiceText: `${name} ha sido seleccionado.`,
            organismText: "RESPONDIENDO",
            energyValue: 82,
            footerText: `MÓDULO ${id}`,
            hold: 3900
        });

        setTimeout(() => {
            // No sobrescribas una interacción posterior.
            if (currentInput !== `CANAL ${id}`) return;
            setMonitor({
                labelText: `CANAL ${id} // OBSERVACIÓN`,
                titleHtml: `MÓDULO<br>${id}`,
                stateText: "ACTIVO",
                inputText: name,
                signalText: "ESTABLE",
                voiceText: "Puedo ver lo que estás mirando.",
                organismText: "RESPONDIENDO",
                energyValue: 70,
                footerText: `MÓDULO ${id}`,
                hold: 2500
            });
        }, 1100);
    }

    function projectEvent(name = "PROYECTO") {
        currentInput = name;
        currentSignal = "CONECTADA";
        setMonitor({
            labelText: "INTERACCIÓN DETECTADA // VENTANA",
            titleHtml: "ACCESO<br>REGISTRADO",
            stateText: "ACTIVO",
            inputText: name,
            signalText: "CONECTADA",
            voiceText: "La máquina está observando tu selección.",
            organismText: "RESPONDIENDO",
            energyValue: 74,
            footerText: "VENTANA ACTIVA",
            hold: 3000
        });
    }

    function musicEvent(kind) {
        if (kind === "play") {
            currentInput = "REPRODUCTOR";
            currentSignal = "RECIBIENDO";
            setMonitor({
                labelText: "ANÁLISIS DE SEÑAL // AUDIO",
                titleHtml: "ESCUCHANDO",
                stateText: "ACTIVO",
                inputText: "REPRODUCTOR",
                signalText: "RECIBIENDO",
                voiceText: "Ahora sí. La señal está viva.",
                organismText: "RESPONDIENDO",
                energyValue: 84,
                footerText: "AUDIO: ACTIVO",
                hold: 0
            });
            return;
        }

        if (kind === "stop") {
            currentSignal = "ESTABLE";
            setMonitor({
                labelText: "SISTEMA EN ESPERA // AUDIO DETENIDO",
                titleHtml: "PAUSA",
                stateText: "EN ESPERA",
                inputText: "REPRODUCTOR",
                signalText: "ESTABLE",
                voiceText: "La señal se ha detenido.",
                organismText: "EN REPOSO",
                energyValue: 45,
                footerText: "AUDIO: DETENIDO",
                hold: 2400
            });
            return;
        }

        setMonitor({
            labelText: "CONTROL DEL REPRODUCTOR // CAMBIO",
            titleHtml: "CAMBIANDO",
            stateText: "ACTIVO",
            inputText: "DISCO",
            signalText: "CAMBIANDO",
            voiceText: "Cambiando la fuente de reproducción...",
            organismText: "RESPONDIENDO",
            energyValue: 68,
            footerText: "REPRODUCTOR",
            hold: 2200
        });
    }

    setInterval(() => {
        elapsed++;
        const h = String(Math.floor(elapsed / 3600)).padStart(2, "0");
        const m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
        const s = String(elapsed % 60).padStart(2, "0");
        time.textContent = `${h}:${m}:${s}`;
    }, 1000);

    // La energía puede variar ligeramente, pero ya no cambia el ESTADO por azar.
    setInterval(() => {
        const base = machineAudioLocal && !machineAudioLocal.paused ? 76 : 58;
        const pulse = machineAudioLocal && !machineAudioLocal.paused
            ? Math.sin(performance.now() / 320) * 6
            : Math.sin(performance.now() / 1500) * 3;
        setEnergy(base + pulse);
    }, 120);

    [1, 2, 3, 4].forEach(id => {
        const button = document.querySelector(`.machine-button-${id}`);
        if (!button) return;
        button.addEventListener("click", () => moduleEvent(id));
    });

    if (machineAudioLocal) {
        machineAudioLocal.addEventListener("play", () => musicEvent("play"));
        machineAudioLocal.addEventListener("pause", () => {
            if (machineAudioLocal.currentTime > 0 && machineAudioLocal.currentTime < machineAudioLocal.duration) {
                musicEvent("stop");
            }
        });
        machineAudioLocal.addEventListener("ended", () => musicEvent("stop"));
    }

    playerPlay?.addEventListener("click", () => {
        setTimeout(() => {
            if (machineAudioLocal && !machineAudioLocal.paused) musicEvent("play");
        }, 50);
    });
    playerPrev?.addEventListener("click", () => musicEvent("track"));
    playerNext?.addEventListener("click", () => musicEvent("track"));

    // Interacciones con contenido real de la página.
    document.addEventListener("click", event => {
        const target = event.target;
        if (!(target instanceof Element)) return;

        const projectCard = target.closest(".project");
        if (projectCard) {
            const name = projectCard.querySelector(".project-name")?.textContent?.trim();
            projectEvent(name || "PROYECTO");
            return;
        }

        const folder = target.closest(".folder");
        if (folder) {
            const name = folder.textContent?.trim().replace(/\s+/g, " ").slice(0, 22);
            projectEvent(name || "DIRECTORIO");
            return;
        }

        const viewerNext = target.closest("#projectViewerNext");
        const viewerPrev = target.closest("#projectViewerPrev");
        if (viewerNext || viewerPrev) {
            setMonitor({
                labelText: "VISOR DE PROYECTO // NAVEGACIÓN",
                titleHtml: "CAMBIANDO<br>IMAGEN",
                stateText: "ACTIVO",
                inputText: viewerNext ? "SIGUIENTE" : "ANTERIOR",
                signalText: "ACTUALIZANDO",
                voiceText: "Estoy siguiendo tu navegación.",
                organismText: "RESPONDIENDO",
                energyValue: 71,
                footerText: "VISOR ACTIVO",
                hold: 1800
            });
        }
    });

    // Teclado solo como apoyo de desarrollo: produce exactamente el mismo evento real.
    window.addEventListener("keydown", e => {
        if (["1", "2", "3", "4"].includes(e.key)) moduleEvent(Number(e.key));
    });

    returnToIdle();
})();

// =========================================================
// VENTANA DE BIENVENIDA / INICIO
// Aparece una vez por sesión para explicar el funcionamiento
// del aparato sin interferir con la interfaz principal.
// =========================================================
(function iniciarVentanaBienvenida() {

    const mostrarBienvenida = () => {

        if (sessionStorage.getItem("jorgePortfolioIntroSeen")) {
            return;
        }

        // Estilos exclusivos de la ventana de bienvenida.
        if (!document.getElementById("intro-window-styles")) {
            const style = document.createElement("style");
            style.id = "intro-window-styles";
            style.textContent = `
                .intro-window {
                    position: fixed !important;
                    width: 900px;
                    max-width: calc(100vw - 40px);
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    z-index: 9999 !important;
                }

                .intro-content {
                    padding: 0;
                    background: #101516;
                }

                .intro-main {
                    padding: 24px 28px 20px;
                    color: #dce6df;
                    font-family: Arial, Helvetica, sans-serif;
                }

                .intro-guide {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(330px, 1fr);
                    gap: 34px;
                    align-items: center;
                    margin: 18px 0 8px;
                }

                .intro-guide-text {
                    min-width: 0;
                }

                .intro-guide-image {
                    width: 100%;
                    max-width: 440px;
                    max-height: 430px;
                    object-fit: contain;
                    display: block;
                    margin: 0 auto;
                }

                .intro-guide-caption {
                    color: #93a89b;
                    font-family: monospace;
                    font-size: 10px;
                    letter-spacing: .5px;
                    text-align: center;
                    margin-top: 8px;
                    opacity: .75;
                }

                .intro-window .intro-content {
                    max-height: 76vh;
                    overflow-y: auto;
                }

                .intro-label {
                    color: #93a89b;
                    font-family: monospace;
                    font-size: 11px;
                    letter-spacing: 1px;
                    margin-bottom: 12px;
                    opacity: .7;
                }

                .intro-title {
                    color: #e7fff0;
                    margin: 0 0 16px;
                    font-family: monospace;
                    font-size: 23px;
                    letter-spacing: 1px;
                }

                .intro-main p {
                    margin: 0 0 13px;
                    font-size: 13px;
                    line-height: 1.55;
                }

                .intro-main strong {
                    font-family: monospace;
                    font-size: 12px;
                }

                .intro-rule {
                    height: 1px;
                    background: rgba(210,235,218,.20);
                    margin: 18px 0;
                }

                .intro-status {
                    color: #9eafa5;
                    display: flex;
                    justify-content: space-between;
                    gap: 20px;
                    margin-top: 18px;
                    padding-top: 10px;
                    border-top: 1px solid rgba(210,235,218,.16);
                    font-family: monospace;
                    font-size: 10px;
                    letter-spacing: .5px;
                }

                .intro-continue {
                    display: block;
                    margin: 20px auto 0;
                    min-width: 150px;
                    padding: 8px 18px;
                    border: 1px solid #7f9187;
                    background: #171e1e;
                    color: #dce6df;
                    font-family: monospace;
                    font-size: 12px;
                    letter-spacing: 1px;
                    cursor: pointer;
                }

                .intro-continue:hover {
                    background: #dce6df;
                    color: #101516;
                }

                @media (max-width: 800px) {
                    .intro-window {
                        width: calc(100vw - 24px);
                    }

                    .intro-guide {
                        grid-template-columns: 1fr;
                        gap: 18px;
                    }

                    .intro-guide-image {
                        max-width: 360px;
                    }
                }

                @media (max-width: 600px) {
                    .intro-window {
                        width: calc(100vw - 24px);
                    }

                    .intro-main {
                        padding: 20px 18px 18px;
                    }

                    .intro-title {
                        font-size: 18px;
                    }

                    .intro-main p {
                        font-size: 12px;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        const ventana = document.createElement("div");
        ventana.className = "window intro-window";
        ventana.style.zIndex = "9999";

        ventana.innerHTML = `
            <div class="title-bar">
                <span>JORGE.EXE // INICIO</span>
                <div class="window-buttons">
                    <button class="close-button" type="button">×</button>
                </div>
            </div>

            <div class="intro-content">
                <div class="intro-main">
                    <div class="intro-label">SISTEMA DEL APARATO // INICIO</div>

                    <h1 class="intro-title">BIENVENIDO</h1>

                    <p>
                        Este sitio no funciona exactamente como un portafolio convencional.
                    </p>

                    <p>
                        Estás entrando en un <strong>APARATO DE EXPLORACIÓN DE IDENTIDAD ARTÍSTICA.</strong>
                        Aquí encontrarás diferentes trabajos, imágenes, sonidos, objetos y experimentos
                        distribuidos dentro de sus propios espacios.
                    </p>

                    <div class="intro-rule"></div>

                    <div class="intro-guide">
                        <div class="intro-guide-text">
                            <p><strong>¿CÓMO FUNCIONA?</strong></p>

                            <p>
                                Explora las ventanas y los elementos que encuentres en la interfaz.
                                Algunos contienen información. Otros contienen proyectos. Algunos simplemente
                                están ahí para ser descubiertos.
                            </p>

                            <p>
                                Las partes señaladas del aparato corresponden a elementos interactivos.
                                Haz clic sobre ellas para acceder a sus diferentes espacios y funciones.
                            </p>

                            <p>
                                <strong>VENTANAS</strong><br>
                                Las ventanas pueden moverse por la interfaz. Arrastra la barra superior
                                para cambiar su posición. Usa los controles de la esquina para cerrar o
                                minimizar cuando estén disponibles.
                            </p>

                            <p>
                                <strong>NO HAY UN RECORRIDO OBLIGATORIO.</strong><br>
                                Puedes explorar libremente, abrir, cerrar, mover y observar.
                            </p>
                        </div>

                        <div>
                            <img
                                class="intro-guide-image"
                                src="images/interface/tablero-info.png"
                                alt="Diagrama del aparato y sus elementos interactivos"
                            >
                            <div class="intro-guide-caption">MAPA DE INTERACCIÓN // SISTEMA</div>
                        </div>
                    </div>

                    <div class="intro-rule"></div>

                    <p><strong>AUTORÍA</strong></p>

                    <p>
                        Este sitio, su música, ilustraciones, diseño, código, objetos 3D y demás contenidos originales
                        fueron creados por <strong>Jorge David Luna Sánchez</strong>.<br>
                        <strong>© 2026 — Todos los derechos reservados.</strong>
                    </p>

                    <button class="intro-continue" type="button">
                        CONTINUAR
                    </button>

                    <div class="intro-status">
                        <span>SISTEMA ACTIVO</span>
                        <span>EXPLORACIÓN LIBRE</span>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(ventana);

        const barra = ventana.querySelector(".title-bar");
        const continuar = ventana.querySelector(".intro-continue");
        const cerrar = ventana.querySelector(".close-button");

        const cerrarBienvenida = () => {
            sessionStorage.setItem("jorgePortfolioIntroSeen", "1");
            ventana.remove();
        };

        continuar.addEventListener("click", cerrarBienvenida);
        cerrar.addEventListener("click", cerrarBienvenida);

        // La bienvenida también puede moverse como las demás ventanas.
        if (typeof hacerMovible === "function") {
            hacerMovible(ventana, barra);
        }
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", mostrarBienvenida, { once: true });
    } else {
        mostrarBienvenida();
    }

})();

