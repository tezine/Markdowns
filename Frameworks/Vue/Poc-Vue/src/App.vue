<template>
    <v-app>
        <v-main>
<!--            <VHelloWorld :e-user="eUser"/>-->
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script lang="ts">
    import HelloWorld from './components/VHelloWorld.vue';
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import {EUser} from "@/entities/EUser";

    @Component({
        components: {HelloWorld}
    })
    export default class App extends Vue {
        eUser = <EUser>{firstName: 'Bruno', lastName: 'Tezine'};
    }
</script>

<style lang="scss">
    @import "./styles";
</style>
