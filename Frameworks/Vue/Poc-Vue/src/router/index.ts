import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Users from '../views/Users.vue'
import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    {path: '/', name: 'Login', component: Login},
    {
        path: '/home', name: 'Home', component: Home, children: [//not lazy loading
            {path: '/users', name: 'Users', component: Users},
        ]
    },
    {path: '/login', name: 'Login', component: Login},
    {path: '/about', name: 'About', component: () => import(/* webpackChunkName: "about" */'../views/About.vue')},//lazy loading
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
