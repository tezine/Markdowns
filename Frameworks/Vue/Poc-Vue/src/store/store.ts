import Vue from 'vue'
import Vuex from 'vuex'
import ETodoItem from "@/entities/ETodoItem";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: Array<ETodoItem>()
  },
  mutations: {
    addToDo(state, todoModel: ETodoItem) {
      state.todos.push(todoModel);
    }
  },
  actions: {
    addToDo(context, todoModel: ETodoItem) {
      return new Promise((resolve, reject) => {
        context.commit('addToDo', todoModel);
        resolve();
      });
    }
  },
  modules: {
  }
})
