import 'zone.js'; // Adicione esta linha no topo
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig) // Garanta que aqui também esteja AppComponent
  .catch((err) => console.error(err));