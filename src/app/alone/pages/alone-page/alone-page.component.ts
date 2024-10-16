import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CounterAloneComponent } from "../../components/counter-alone/counter-alone.component";

@Component({
  selector: 'app-alone-page',
  standalone: true,
  imports: [CommonModule, CounterAloneComponent],
  templateUrl: './alone-page.component.html',
  styleUrl: './alone-page.component.css'
})
export class AlonePageComponent {

}
