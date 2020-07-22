<template>
    <div class="d-flex w-100">
        <LeftMenu @item-clicked="(route)=>onLeftMenuItemClicked(route)">
        </LeftMenu>
        <router-view ></router-view>
    </div>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch} from 'vue-property-decorator'
    import VLeftMenu from "@/components/VLeftMenu.vue";

    @Component({
        components: {LeftMenu: VLeftMenu}
    })
    export default class Home extends Vue {

        onLeftMenuItemClicked(route:string){
            if(route=='/')return this.$router.replace('/')
            //it's required to check the current route, or View Router will throw an exception if you attempt to push a route already visible
            if (this.$route.path !== route) this.$router.push(route);
        }
    }
</script>

