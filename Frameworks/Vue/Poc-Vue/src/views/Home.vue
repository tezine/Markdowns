<template>
    <div class="d-flex w-100">
        <LeftMenu @item-clicked="(route)=>onLeftMenuItemClicked(route)">
        </LeftMenu>
        <router-view ></router-view>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import LeftMenu from "@/components/LeftMenu.vue";

    @Component({
        components: {LeftMenu}
    })
    export default class Home extends Vue {


        onLeftMenuItemClicked(route:string){
            console.log('clicou em ',route);
            this.$router.push(route);
        }
    }
</script>

<style scoped>

</style>
