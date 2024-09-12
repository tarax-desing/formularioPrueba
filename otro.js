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
