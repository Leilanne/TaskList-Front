import { http } from './config';

export default {

  listar: () => http.get('tasks'),

  // eslint-disable-next-line
  salvar: task => http.post('task', task),

  deletar: task => http.put('task/remove', task),

  concluir: task => http.put('task/conclui', task),

  removeConclusao: task => http.put('task/remove-conclusao', task),

  editar: task => http.put('task/edita', task),


};
