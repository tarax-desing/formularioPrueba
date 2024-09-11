document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formulario");
  const mensajeError = document.getElementById("mensajeError");
  form.addEventListener("submit", function (event) {
    let errores = [];
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
    /////////
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
