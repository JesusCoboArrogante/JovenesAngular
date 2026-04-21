import { AbstractControl, ValidationErrors } from '@angular/forms';

export class ValidacionesPropias {

  static validarDNI(control: AbstractControl): ValidationErrors | null {

    let dni = control.value;
    let letras = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (!dni) return null;

    if (dni.length != 9) return { error: true };

    let numero = parseInt(dni.substring(0, 8));
    let letra = dni.substring(8);

    let letraBuena = letras[numero % 23];

    if (letra != letraBuena) {
      return { error: true };
    }

    return null;
  }

  static validarFecha(control: AbstractControl): ValidationErrors | null {

    let fecha = control.value;

    if (!fecha) return null;

    let partes = fecha.split("/");

    if (partes.length != 3) return { error: true };

    let dia = parseInt(partes[0]);
    let mes = parseInt(partes[1]);
    let anio = parseInt(partes[2]);

    if (mes < 1 || mes > 12) return { error: true };

    if (dia < 1 || dia > 31) return { error: true };

    return null;
  }

  static validarExtension(control: AbstractControl): ValidationErrors | null {

    if (!control.value) return null;

    let nombre = control.value.toLowerCase();

    if (nombre.endsWith(".png") || nombre.endsWith(".jpg")) {
      return null;
    }

    return { error: true };
  }

  static validarCP(control: AbstractControl): ValidationErrors | null {

    let cp = control.value;

    if (!cp) return null;

    if (cp.length == 5 && !isNaN(cp)) {
      return null;
    }

    return { error: true };
  }

  static validarListas(control: AbstractControl): ValidationErrors | null {

    let valor = control.value;

    if (!valor || valor.length == 0) {
      return { error: true };
    }

    return null;
  }

  static obtenerProvincia(cp: string): string {

    let provincias: any = {
      "28": "Madrid",
      "41": "Sevilla",
      "08": "Barcelona"
    };

    let codigo = cp.substring(0, 2);

    return provincias[codigo] || "No sé";
  }

}