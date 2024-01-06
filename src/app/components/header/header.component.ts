import { Component, Input } from '@angular/core';
import { Currency } from '../../models/currency'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() currency: Currency[];
}
