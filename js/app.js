/**
 * ! Seleccionar solamente un checkbox a la vez
 * ? Primeramente seleccionamos todos los checkboxes de los que queremos que solo se seleccione uno}
 * * checkboxes que tengan el atributo name="opcion"
 */
// Seleccionar los elementos de la interfaz
const inputEmail = document.getElementById("input");
const btnSubmit = document.getElementById("btn-procesar");
const btnCopiar = document.getElementById("btn-copiar");

const checkboxes = document.querySelectorAll(
  'input[type="checkbox"][name="opcion"]'
);

btnSubmit.addEventListener("click", procesar);
btnCopiar.addEventListener("click", copiar);

// Recorremos todos nuestros checkbox seleccionados
// Y gregamos el evento "change" a cada checkbox seleccionado
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    // Deseleccionamos los checkboxes que no han sido seleccionados
    checkboxes.forEach((c) => {
      if (c !== checkbox) {
        c.checked = false;
      }
    });
  });
});

function encriptar(texto) {
  return texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
}

function desencriptar(texto) {
  return texto
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");
}

function procesar() {
  const encriptarCheckbox = document.getElementById("encriptar");
  const desencriptarCheckbox = document.getElementById("desencriptar");

  // Obtener los elementos de los checkboxes
  const texto = document.getElementById("input").value;
  let resultado = "";

  if (encriptarCheckbox.checked) {
    resultado = encriptar(texto);
  } else if (desencriptarCheckbox.checked) {
    resultado = desencriptar(texto);
  } else {
    console.log("No seleccionaste nada");
  }

  document.getElementById("resultado").value = resultado;
  btnCopiar.classList.remove("opacity-50");
  btnCopiar.disabled = false;
}

function copiar() {
  const resultado = document.getElementById("resultado");

  // Crear un elemento de texto temporal
  const elementoTemporal = document.createElement("textarea");
  elementoTemporal.value = resultado.value;

  // Agregar el elemento temporal a la página
  document.body.appendChild(elementoTemporal);

  // Seleccionar el contenido del elemento temporal
  elementoTemporal.select();

  // Copiar el contenido al portapapeles
  document.execCommand("copy");

  // Eliminar el elemento temporal de la página
  document.body.removeChild(elementoTemporal);
}

inputEmail.addEventListener("input", comprobarVacio);
inputEmail.addEventListener("blur", comprobarTexto);

function mostrarAlerta(mensaje, referencia) {
  limpiarAlerta(referencia);

  // Generar alerta en HTML
  const error = document.createElement("p");
  error.textContent = mensaje;
  error.classList.add("ingresa-texto");

  // Mostrar el error o falta de texto al formulario
  referencia.parentElement.appendChild(error);
}

function limpiarAlerta(referencia) {
  // Comprueba si ya existe una alerta
  const alerta = referencia.parentElement.querySelector(".ingresa-texto");
  if (alerta) {
    // Si exsite, elimina la anterior
    alerta.remove();
  }
}

function comprobarVacio(evento) {
  if (inputEmail.value.length > 0) {
    btnSubmit.classList.remove("opacity-50");
    btnSubmit.disabled = false;
    limpiarAlerta(evento.target.parentElement.parentElement);
    // Limpiamos la alerta un padrón anterior
    return;
  }
  btnSubmit.classList.add("opacity-50");
  btnSubmit.disabled = true;
  mostrarAlerta("Es obligatorio ingresar un texto", evento.target.parentElement);
}
