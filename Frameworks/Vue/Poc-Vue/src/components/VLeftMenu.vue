<template>
    <v-card height="100vh" width="256">
        <v-navigation-drawer permanent>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title class="title">
                        PoC-Vue
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        Menu
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list dense nav>
                <v-list-item v-for="item in items" :key="item.title" link @click="itemClicked(item.route)">
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-card>
</template>

<script lang="ts">
    import {Vue, Component, Prop, Watch, Emit} from 'vue-property-decorator'

    @Component({components: {}})
    export default class VLeftMenu extends Vue {
        @Emit() itemClicked(route:string) {}
        items = [
            {title: 'Slots', route:'/slots', icon: 'mdi-image'},
            {title: 'Users', route:'/users', icon: 'mdi-view-dashboard'},
            {title: 'Todo', route:'/todo', icon: 'mdi-image'},
            {title: 'About', route:'/about', icon: 'mdi-help-box'},
            {title: 'Logout', route:'/', icon: 'mdi-help-box'},
        ];
    }
</script>

<style scoped>

</style>
