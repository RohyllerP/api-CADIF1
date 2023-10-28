// 1 parte
fetch("https://api.cadif1.com/areadeestudio").then((respuesta) => {
    if (respuesta.ok) {
        return respuesta.json();
    } else {
        console.log("Error: " + respuesta.statusText);
    }
}).then((json) => {
    json.areas.forEach(element => {
        $('<div>', {
            id: `area-${element.id}`,
            click: mostrarCursos
        }).append(
            $('<p>').text(element.nombre)
        ).appendTo('#areas-estudios');
    });
}).catch((error) => {
    console.log("Error de conexión: " + error);
})

// 2. function mostrar cursos dando click 
function mostrarCursos() {
    let id = this.id.split("-")[1];
    let name = this.firstChild.innerHTML;

    fetch("https://api.cadif1.com/curso/de_un_area/" + id).then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.json();
        } else {
            console.log("Error: " + respuesta.statusText);
        }
    }).then((json) => {
        $('#modalBody').empty();
        let aux = json.cursos.length;
        if (aux == 0) {
            $('<p>').text("No hay cursos disponibles").appendTo('#modalBody');
        } else {
            json.cursos.forEach(element => {
                $('<div>', {
                    id: `curso-${element.id}`,
                    class: 'curso-div',
                }).append(
                    $('<p>').text(element.nombre)
                ).appendTo('#modalBody');
            })
        }
        $('.curso-div').one('click', mostrarInfoCurso);
        $('#exampleModalLabel').text("Cursos del: " + name);
        $('#modal-activar').click();
    })
        .catch((error) => {
            console.log("Error de conexión: " + error);
        })
}

// 3. function mostrar informacion del curso clickeado
function mostrarInfoCurso() {
    let id = this.id.split("-")[1];
    fetch("https://api.cadif1.com/curso/" + id).then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.json();
        } else {
            console.log("Error: " + respuesta.statusText);
        }
    }).then((json) => {
        let auto = 0;
        let niveles = json.curso.niveles.length;
        $('<p class="p-niveles">').text(`${niveles} niveles`).appendTo(`#${this.id}`);
        json.curso.niveles.forEach(elemento =>{
            auto++;
            let objetivoprincipal = elemento.objetivoprincipal ?? "";
            let precio = elemento.precio ?? "";
            let minalumnos = elemento.minalumnos ?? 0;
            let maxalumnos = elemento.maxalumnos ?? 0;
            $('<div>',{
                class: 'niveles-curso-info',
            }).append(
                $('<p>').text(`Nivel ${auto}:`)
            ).append(
                $('<p>').text("objetivo principal: " + objetivoprincipal)
            ).append(
                $('<p>').text("precio: " + precio)
            ).append(
                $('<p>').text("max alumnos: " + maxalumnos)
            ).append(
                $('<p>').text("min alumnos: " + minalumnos)
            ).appendTo(`#${this.id}`);
        })
    }).catch((error) => {
        console.log("Error de conexión: " + error);
    })
}

// 4 mostrar las carrearas
fetch("https://api.cadif1.com/carrera").then((respuesta) => {
    if (respuesta.ok) {
        return respuesta.json();
    } else {
        console.log("Error: " + respuesta.statusText);
    }
}).then((json) => {
    json.carreras.forEach(element => {
        if (element.activa == 1) {
            $('<div>', {
                id: `carrera-${element.id}`,
                class: 'carrera-div',
            }).append(
                $('<p>').text(element.nombre)
            ).appendTo('#carreras');
        }
    });
    $('.carrera-div').on('click', mostrarPensum);
}).catch((error) => {
    console.log("Error de conexión: " + error);
})

// 5. function carrera
function mostrarPensum() {
    let id = this.id.split("-")[1];
    let name = this.firstChild.innerHTML;
    fetch("https://api.cadif1.com/carrera/" + id).then((respuesta) => {
        if (respuesta.ok) {
            return respuesta.json();
        } else {
            console.log("Error: " + respuesta.statusText);
        }
    }).then((json) => {
        $('#modalBodyTwo').empty();
        json.carrera.pensum.forEach(subArray => {
            subArray.forEach(element => {
                $('<div>', {
                    class: "div-carreras-pensum"
                }).append(
                    $('<p>').text("Materia: " + element.materia),
                    $('<p>').text("Nivel: " + element.nivel),
                    $('<p>').text("Periodo: " + element.periodo)
                ).appendTo('#modalBodyTwo');
            })
        });
        $('#exampleModalLabelTwo').text("Carrera: " + name);
        $('#modal-activar-two').click();
    }).catch((error) => {
        console.log("Error de conexión: " + error);
    })

}

