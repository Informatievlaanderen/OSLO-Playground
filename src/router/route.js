import Vue from 'vue';
import Router from 'vue-router';
import Home from "../views/Home";

Vue.use(Router);

/**
* Router from Vue. Associate pages with paths.
* @type {VueRouter}
*/
const router = new Router({
    mode: 'history',
    base: '/playground/',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
    ]
});

export default router
