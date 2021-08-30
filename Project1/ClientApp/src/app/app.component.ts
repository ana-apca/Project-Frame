
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Vitrine } from './models/vitrine';
import { vitrineservice } from './services/vitrine.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  fruta = {} as Vitrine;
  frutas: Vitrine[];

  constructor(private vitrineservice: vitrineservice) { }

  ngOnInit() {
    debugger;
    this.getVitrines();
  }

// define se uma fruta será criada ou atualizada
saveVitrine(form: NgForm) {
  if (this.fruta.codigo !== undefined) {
    this.vitrineservice.updateVitrine(this.fruta).subscribe(() => {
      this.cleanForm(form);
    });
  } else {
    this.vitrineservice.saveVitrine(this.fruta).subscribe(() => {
      this.cleanForm(form);
    });
  }
}

// Chama o serviço para obter todas as frutas
getVitrines() {
  debugger;
  this.vitrineservice.getVitrines().subscribe((frutas: Vitrine[]) => {
    this.frutas = frutas;
  });
}

// retirar estoque
atualizarEstoqueVitrine(fruta: Vitrine) {
  this.vitrineservice.atualizarEstoqueVitrine(fruta).subscribe(() => {
    this.fruta;
  });
}

// copia a fruta a ser editata
editVitrine(fruta: Vitrine) {
  this.fruta = { ...fruta };
}

// limpa o formulario
cleanForm(form: NgForm) {
  this.getVitrines();
  form.resetForm();
  this.fruta = {} as Vitrine;
}
}