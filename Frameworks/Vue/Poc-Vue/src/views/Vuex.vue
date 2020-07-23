<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12"><h1>TODO with VueX</h1></div>
        </div>
        <div class="row">
            <v-text-field id="Name" label="Type your todo item" v-model="currentTodoItem.name" class="col-md-6"></v-text-field>
            <v-checkbox v-model="currentTodoItem.isCompleted" :label="'Completed'" class="col-md-6"></v-checkbox>
        </div>
        <div class="row">
            <v-btn color="primary" small type="submit" @click="addTODO()" class="col-md-2">Add ToDo</v-btn>
        </div>
        <div class="row">
            <div class="alert alert-primary col-md-12" v-show="message">{{ message }}</div>
        </div>
        <section>
            <ol class="list-group">
                <li class="list-group-item" v-for="todo of todos" :key="todo.name">
                    {{ todo.name}}, {{ todo.isCompleted ? "Completed" : "Not Done" }}
                </li>
            </ol>
        </section>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ETodoItem from "@/entities/ETodoItem";
    import {Action, State} from "vuex-class";
    import {ITodoState} from "@/interfaces/ITodoState";
    const namespace: string = 'TodoStore';

    @Component({components: {}})
    export default class Vuex extends Vue {
        private message='';
        private currentTodoItem=new ETodoItem();
        @State(namespace) todoStore?: ITodoState;
        @Action('addToDo', {namespace}) addToDo: any;

        get todos(): ETodoItem[] {
            return this.$store.state.TodoStore.todos;
        }

        addTODO() {
            this.message = `Adding ${this.currentTodoItem.name} to ToDo List ...`;
            if (this.todos.some(x => x.name == this.currentTodoItem.name)) {
                this.message = `ToDo item ${this.currentTodoItem.name} already exists in your list`;
                return;
            }
            this.addToDo(this.currentTodoItem);
            this.currentTodoItem = new ETodoItem();
            this.message = "";
        }
    }
</script>

<style scoped lang="scss">
    section {
        margin: 20px;
    }

    ol.list-group li:nth-of-type(even) {
        background: #cdecda;
    }
</style>
