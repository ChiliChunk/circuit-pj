import { Component } from '@angular/core';
import { ListeComponent } from './pieces-justificatives/liste/liste.component';

@Component({
  imports: [ListeComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
