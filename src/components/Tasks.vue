<template>
   <div class="container">
     <div class="container-sm">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{erro.field}}</b> - {{erro.defaultMessage}}
        </li>
      </ul>

      <form @submit.prevent="salvar">
        <div class="card mb-3" >
            <div class="card-header titulo">
              <input type="text" class="form-control titulo" placeholder="Título da Tarefa" required
                v-model="task.titulo">
            </div>
            <div class="card-body">
              <textarea class="form-control sem-borda" id="descricao" rows="2"
                  placeholder="Descrição da tarefa.." v-model="task.descricao"/>
            </div>
            <div class="input-group-append">
              <button class="btn btn-lg botao" type="submit" id="button-addon2"
                  title="Adicionar tarefa">
                <i class="fas fa-plus"></i>
              </button>
            </div>
          </div>
      </form>
    </div>

    <div class="list-group list-group-flush m-3 container">
      <div v-for="task of tasks" :key="task.id"  class="list-group-item list-group-item-action"
       :class="[task.status ? 'concluida' : '']">
        <div class="d-flex w-100 ml-4 justify-content-between">
          <div class="row justify-content-start">
            <span class="col-2">
              <input class="form-check-input" type="checkbox" :value="task.status"
               :checked="task.status" id="status" @change="concluir(task)" title="Concluir">
              </span><span class="col-2">
              <h5 class="mb-1" :class="[task.status ? 'concluida' : '']">
                {{ task.titulo }}
                </h5>
              </span>
          </div>
            <small  class="mr-3">
              <div v-if="task.dataCriacao!=null&&(task.dataEdicao==null||task.dataConclusao==null)">
                Criada em {{format_date(task.dataCriacao) }}
              </div>
              <div v-if="task.dataEdicao!=null&&task.dataConclusao==null">
                Editada em {{format_date(task.dataEdicao) }}
              </div>
              <div v-if="task.dataConclusao!=null">
                Concluída em {{format_date(task.dataConclusao) }}
              </div>
            </small>
          </div>
        <p class="mb-1 ml-5">{{ task.descricao }}</p>
          <div class="btn-group btn-group-sm float-right" role="group" aria-label="First group">
            <button v-if="task.status==false" @click="editar(task)" type="button"
             class="btn btn-primary" title="Editar Tarefa">
              <i class="far fa-edit"></i>
            </button>
            <button @click="deletar(task)" type="button" class="btn btn-danger"
            title="Remover Tarefa">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        <small v-if="task.status==true">Concluída</small>
        <small v-else>Em andamento</small>
      </div>
    </div>

  </div>
</template>

<script>

import * as moment from 'moment';
import Task from '../services/tasks';

export default {
  data() {
    return {
      task: {
        id: '',
        titulo: '',
        descricao: '',
      },
      tasks: [],
      errors: '',
    };
  },
  methods: {
    format_date(value) {
      if (value) {
        return moment(String(value)).format('DD/MM/YYYY');
      }
      return '';
    },
    listar() {
      // eslint-disable-next-line
      Task.listar().then(resposta => {
        this.tasks = resposta.data;
      });
    },
    salvar() {
      if (!this.task.id) {
        // eslint-disable-next-line
        Task.salvar(this.task).then((resposta) => {
          this.task = {};
          alert('Salvo com sucesso!');
          this.listar();
        }).catch((e) => {
          this.errors = e.response.data.errors;
        });
      } else {
        // eslint-disable-next-line
        Task.editar(this.task).then((resposta) => {
          this.task = {};
          alert('Editado com sucesso!');
          this.listar();
        }).catch((e) => {
          this.errors = e.response.data.errors;
        });
      }
    },
    editar(task) {
      this.task = task;
    },
    deletar(task) {
    // eslint-disable-next-line
        Task.deletar(task).then(resposta => {
        alert('Removida com sucesso!');
        this.listar();
      });
    },
    concluir(task) {
      if (!task.dataConclusao) {
        // eslint-disable-next-line
        Task.concluir(task).then((resposta) => {
          alert('Conclusão realizada com sucesso!');
          this.listar();
        });
      } else {
        // eslint-disable-next-line
        Task.removeConclusao(task).then((resposta) => {
          alert('Remoção da conclusão realizada com sucesso!');
          this.listar();
        });
      }
    },
  },
  mounted() {
    this.listar();
  },
};
</script>

<style>

  .img-logo{
    max-width: 40%;
    margin: 10% auto;
  }

  .sem-borda{
    border: none !important;
  }

  .titulo{
    border: none !important;
    background:#ffe368 !important;
  }

  .botao{
    float: right !important;
    border-radius: 50% !important;
    margin: 1% 90%;
    color: #fff !important;
    background-color: #ffe368 !important;
    border-color: #ffe368;
  }
  .concluida {
    text-decoration: line-through;
    background: #a5a5a5 !important;
  }

</style>
