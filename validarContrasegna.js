export function validarContrasegna(pass) {
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
