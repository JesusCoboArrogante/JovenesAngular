import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidacionesPropias } from './validators';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  miFormulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.miFormulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
      DNI: ['', [Validators.required, ValidacionesPropias.validarDNI]],
      fechaNacimiento: ['', [Validators.required, ValidacionesPropias.validarFecha]],
      sexo: ['', Validators.required],
      dniFile: ['', ValidacionesPropias.validarExtension],
      interes: [[], ValidacionesPropias.validarListas],
      CP: ['', [Validators.required, ValidacionesPropias.validarCP]],
      situacionSelect: ['', ValidacionesPropias.validarListas],
      checkboxAcepto: [false, Validators.requiredTrue]
    });
  }

  enviarFormulario() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log('Formulario enviado');
    console.log(this.miFormulario.value);
  }

  limpiarFormulario() {
    this.miFormulario.reset();
  }

  provinciaCalculada(): string {
    let cp = this.miFormulario.get('CP')?.value;

    if (cp && cp.length >= 2) {
      return ValidacionesPropias.obtenerProvincia(cp);
    }

    return '';
  }

  
}