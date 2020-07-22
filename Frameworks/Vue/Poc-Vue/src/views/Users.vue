<template>
    <div class="container topContainer">
        <v-data-table
                :headers="headers"
                :items="users"
                :items-per-page="5"
                class="elevation-1"
        ></v-data-table>
        <HelloWorld
         @emit-clicked="onHelloWorldClicked">
        </HelloWorld>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {EUser} from "@/entities/EUser";
    import {UsersService} from "@/services/user.service";
    import HelloWorld from "@/components/VHelloWorld.vue";

    @Component({
        components: {HelloWorld}
    })
    export default class Users extends Vue {

        users:EUser[]=[];
        headers = [
            {text: 'ID', value: 'id'},
            {text: 'Name', align: 'start', sortable: false, value: 'name',}
        ];

        async mounted() {
            this.users = (await UsersService.getUsers()).data;
        }

        onHelloWorldClicked(){
            console.log('hello world clicked');
        }

        async onBtnSaveClicked(){

        }
    }
</script>

<style scoped lang="scss">
 .topContainer{
     margin-top: 20px;
 }
</style>
