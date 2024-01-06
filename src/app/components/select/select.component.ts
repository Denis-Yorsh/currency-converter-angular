import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  @Output() outSelectCurrency = new EventEmitter<string>();

  enterCurrency(selectElement: HTMLSelectElement) {
    this.outSelectCurrency.emit(selectElement.value);
  }
}