<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12"><h1>{{welcomeMessage}}</h1></div>
        </div>
        <div class="row">
            <v-text-field id="Name" label="Type your todo item" v-model="model.name" class="col-md-6"></v-text-field>
            <v-checkbox v-model="model.isCompleted" :label="'Completed'"></v-checkbox>
        </div>
        <div class="row">
            <v-btn  color="primary" small type="submit" @click="AddToDo()" class="col-md-2">Add ToDo</v-btn>
        </div>
        <div class="row">
            <div class="alert alert-primary col-md-12" v-show="message">{{ message }}</div>
        </div>
        <section>
            <ol class="list-group">
                <li class="list-group-item" v-for="todo of ToDos" :key="todo.name">
                    {{ todo.name}}, {{ todo.isCompleted ? "Completed" : "Not Done" }}
                </li>
            </ol>
        </section>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from "vue-property-decorator";
    import ETodoItem from "@/entities/ETodoItem";
    @Component({
        components: {}
    })
    export default class Vuex extends Vue {
        private welcomeMessage: string;
        private message: string;
        private todos: Array<ETodoItem>;
        private model: ETodoItem;
        constructor() {
            super();
            this.welcomeMessage = "TODO with VueX";
            this.todos = [];
            this.model = new ETodoItem();
            this.message = "";
        }
        get ToDos(): ETodoItem[] {
            let todos = this.$store.state.todos; //this.todos;
            return todos;
        }
        AddToDo() {
            this.message = `Adding ${this.model.name} to ToDo List ...`;
            if (this.ToDos.some(x => x.name == this.model.name)) {
                this.message = `ToDo item ${this.model.name} already exists in your list`;
                return;
            }
            //this.todos.push(this.model);
            this.$store.dispatch("addToDo", this.model)
            this.model = new ETodoItem();
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
