import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaTarefasComponent } from './components/lista-tarefas/lista-tarefas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ListaTarefasComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'GerenciadorTarefas-App';
}