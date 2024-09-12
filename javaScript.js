document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensajeError");

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
    } else if ("'^(.+)@(\\S+)$".test(correo.ariaValueText)) {
      errores.push("el formato del correo no es válido");
    }
    /////////validar contraseña
    const pass = document.getElementById("pass");
    if (pass.value === "") {
      errores.push("La contraseña es obligatoria.");
    } else if (validarContrasegna(pass.value)) {
      errores.push("la contraseña no es segura");
    }

    const colores = document.querySelectorAll('input[[name="eligeColor"]');
    if (colores.length === 0) {
      errores.push("por favor , seleciona un color");
    }

    // let colorSelecionado = false;
    // colores.forEach(color =>{
    //     if (color.checked){
    //         colorSelecionado = true;
    //     }
    // });
    // if(!colorSelecionado){
    //     errores.push('por favor, selecciona un color');
    // }

    const aceptoPoliticas = document.getElementById("aceptoPoliticas");
    if (!aceptoPoliticas.checked) {
      errores.push("debes aceptar las políticas de privacidad");
    }

    if (errores.length > 0) {
      event.preventDefault();
      mensajeError.textContent = errores.join("");
      mensajeError.classList.remove("oculto");
    } else {
      mensajeError.classList("oculto");
    }
  });
});
//////////
function validarContrasegna(pass) {
  // Verificar longitud
  if (pass.length < 8 || pass.length > 16) {
    return false;
  }

  let tieneMayuscula = false;
  let tieneMinuscula = false;
  let tieneNumero = false;
  let tieneEspecial = false;
  let consecutivos = 1;
  let caracterAnterior = "";

  for (let i = 0; i < pass.length; i++) {
    const caracter = pass[i];

    // Verificar mayúsculas
    if (caracter >= "A" && caracter <= "Z") {
      tieneMayuscula = true;
    }
    // Verificar minúsculas
    else if (caracter >= "a" && caracter <= "z") {
      tieneMinuscula = true;
    }
    // Verificar números
    else if (caracter >= "0" && caracter <= "9") {
      tieneNumero = true;
    }
    // Verificar caracteres especiales
    else if ("!@#$%^&*()_+-=[]{}|;:,.<>¡".includes(caracter)) {
      tieneEspecial = true;
    }

    // Verificar caracteres consecutivos
    if (caracter === caracterAnterior) {
      consecutivos++;
      if (consecutivos > 3) {
        return false;
      }
    } else {
      consecutivos = 1;
    }
    caracterAnterior = caracter;
  }

  // Verificar que se cumplan todos los criterios
  return tieneMayuscula && tieneMinuscula && tieneNumero && tieneEspecial;
}

// Ejemplo de uso
console.log(validarContrasegna("Abc123!@#")); // true
console.log(validarContrasegna("abc123")); // false (falta mayúscula y carácter especial)
console.log(validarContrasegna("ABCDEF123!")); // false (falta minúscula)
console.log(validarContrasegna("Abcdef123!")); // true
console.log(validarContrasegna("Abcaaaa123!")); // false (más de 3 caracteres iguales seguidos)
console.log(validarContrasegna("Abc123!@#$%^&*()_+-=")); // false (más de 16 caracteres)
