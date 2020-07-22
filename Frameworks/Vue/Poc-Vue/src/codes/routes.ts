import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Users from '../views/Users.vue'
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Slots from "@/views/Slots.vue";
import Mixins from "@/views/Mixins.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', name: 'Login', component: Login},//not lazy loading
    {
        path: '/home', name: 'Home', component: Home, children: [
            {path: '/users', name: 'Users', component: Users},
            {path: '/slots', name: 'Slots', component: Slots},
            {path: '/mixins', name: 'Mixins', component: Mixins},
            {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */'../views/About.vue')},//lazy loading
        ]
    },
    {path: '/login', name: 'Login', component: Login},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
