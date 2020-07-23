import ETodoItem from "@/entities/ETodoItem";
import {ActionTree, GetterTree, Module, MutationTree} from "vuex";
import {ITodoState} from "@/interfaces/ITodoState";

export const state : ITodoState = {//initial state
    todos: Array<ETodoItem>()
};

export const getters: GetterTree<ITodoState, any> = {
    todos: state => state.todos
}

export const actions: ActionTree<ITodoState, any> ={
    addToDo(context, eTodoItem: ETodoItem) {
        return new Promise((resolve, reject) => {
            context.commit('addToDo', eTodoItem);
            resolve();
        });
    }
}

export const mutations: MutationTree<ITodoState> = {
    addToDo(state, eTodoItem: ETodoItem) {
        state.todos.push(eTodoItem);
    }
}

export const TodoStore:Module<ITodoState, any>={
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
