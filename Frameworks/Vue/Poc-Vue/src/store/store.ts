import Vue from 'vue'
import Vuex from 'vuex'
import ToDoModel from "@/entities/TodoModel";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: Array<ToDoModel>()
  },
  mutations: {
    addToDo(state, todoModel: ToDoModel) {
      state.todos.push(todoModel);
    }
  },
  actions: {
    addToDo(context, todoModel: ToDoModel) {
      context.commit('addToDo', todoModel);
    }
  },
  modules: {
  }
})
