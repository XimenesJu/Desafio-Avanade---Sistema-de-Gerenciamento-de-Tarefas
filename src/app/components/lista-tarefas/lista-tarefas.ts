import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa';
import { Tarefa } from '../../models/tarefa.model';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './lista-tarefas.html',
  styleUrl: './lista-tarefas.scss'
})
export class ListaTarefasComponent implements OnInit {
  tarefas: any[] = [];
  modoEdicao = false;
  tarefaSelecionada: Tarefa = { titulo: '', descricao: '', status: 'Pendente' };

  constructor(private tarefaService: TarefaService) {}

  ngOnInit(): void {
    this.carregarTarefas();
  }

  carregarTarefas(): void {
    this.tarefaService.getTarefas().subscribe({
      next: (dados) => {
        this.tarefas = dados.map(t => ({ ...t, expandida: false }));
      },
      error: (err) => console.error('Erro ao carregar tarefas', err)
    });
  }

  salvarTarefa(): void {
    if (!this.tarefaSelecionada.titulo.trim()) return;

    if (this.modoEdicao && this.tarefaSelecionada.id) {
      this.tarefaService.updateTarefa(this.tarefaSelecionada.id, this.tarefaSelecionada).subscribe(() => {
        this.resetarFormulario();
        this.carregarTarefas();
      });
    } else {
      this.tarefaService.addTarefa(this.tarefaSelecionada).subscribe(() => {
        this.resetarFormulario();
        this.carregarTarefas();
      });
    }
  }

  prepararEdicao(tarefa: Tarefa): void {
    this.modoEdicao = true;
    this.tarefaSelecionada = { ...tarefa };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  alternarStatus(tarefa: any): void {
    const novoStatus = tarefa.status === 'Pendente' ? 'Concluído' : 'Pendente';
    const { expandida, ...dadosParaEnvio } = tarefa;
    const tarefaAtualizada = { ...dadosParaEnvio, status: novoStatus };

    if (tarefa.id) {
      this.tarefaService.updateTarefa(tarefa.id, tarefaAtualizada).subscribe(() => {
        this.carregarTarefas();
      });
    }
  }

  deletarTarefa(id: number): void {
    if (confirm('Deseja excluir esta tarefa?')) {
      this.tarefaService.deleteTarefa(id).subscribe(() => this.carregarTarefas());
    }
  }

  resetarFormulario(): void {
    this.modoEdicao = false;
    this.tarefaSelecionada = { titulo: '', descricao: '', status: 'Pendente' };
  }

  toggleExpandir(tarefa: any): void {
    tarefa.expandida = !tarefa.expandida;
  }
}