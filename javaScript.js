import { validarContrasegna } from "./validarContrasegna.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensajeError");

  function mostrarErrores(errores) {
    let texto = "";
    errores.map((error) => {
      texto += `<p>${error}</p>`;
    });

    return texto;
  }

  form.addEventListener("submit", function (event) {
    let errores = [];

    //validar nombre
    const nombre = document.getElementById("nombre");
    if (nombre.value.trim() === "") {
      errores.push("el nombre es obligatorio");
    }

    const correo = document.getElementById("correo");
    if (correo.value.trim() === "") {
      errores.push("el correo es obligatorio");
    } else if (!/^(.+)@(\\S+)$/.test(correo.ariaValueText)) {
      errores.push("el formato del correo no es válido");
    }
    /////////validar contraseña
    const pass = document.getElementById("pass");
    if (pass.value === "") {
      errores.push("La contraseña es obligatoria.");
    } else if (validarContrasegna(pass.value)) {
      errores.push("la contraseña no es segura");
    }

    const colores = document.querySelectorAll('input[name="color"]');
    if (colores.length === 0) {
      errores.push("por favor , seleciona un color");
    }

    let colorSelecionado = false;
    colores.forEach((color) => {
      if (color.checked) {
        colorSelecionado = true;
      }
    });
    if (!colorSelecionado) {
      errores.push("por favor, selecciona un color");
    }

    const aceptoPoliticas = document.getElementById("aceptoPoliticas");
    if (!aceptoPoliticas.checked) {
      errores.push("debes aceptar las políticas de privacidad");
    }

    if (errores.length > 0) {
      event.preventDefault();
      mensajeError.innerHTML = mostrarErrores(errores);
      mensajeError.classList.remove("oculto");
    } else {
      mensajeError.classList("oculto");
    }
  });
});
//////////

// Ejemplo de uso
// console.log(validarContrasegna("Abc123!@#")); // true
// console.log(validarContrasegna("abc123")); // false (falta mayúscula y carácter especial)
// console.log(validarContrasegna("ABCDEF123!")); // false (falta minúscula)
// console.log(validarContrasegna("Abcdef123!")); // true
// console.log(validarContrasegna("Abcaaaa123!")); // false (más de 3 caracteres iguales seguidos)
// console.log(validarContrasegna("Abc123!@#$%^&*()_+-=")); // false (más de 16 caracteres)
