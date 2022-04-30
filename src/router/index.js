import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard";
import OAuth2Callback from "@/views/OAuth2Callback";
import Profile from "@/views/Profile";
import UserDisplay from "@/views/UserDisplay";
import NotFound from "@/views/NotFound";

const router = createRouter({
    history: createWebHistory(),
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || {top: 0};
    },
    routes: [
        {
            path: "/:catchAll(.*)*",
            name: "NotFound",
            component: NotFound
        },
        {
            path: "/",
            name: "Home",
            component: Home,
            includeInHeader: true
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: Dashboard,
            includeInHeader: true
        },
        {
            path: "/oauth_callback",
            name: "OAuth2Callback",
            component: OAuth2Callback,
            includeInHeader: false
        },
        {
            path: "/profile",
            name: "Profile",
            component: Profile,
            includeInHeader: false
        },
        {
            path: "/users/:id(\\d+)",
            name: "User",
            component: UserDisplay,
            includeInHeader: false,
            props: true
        }
        // {
        //     path: "/users",
        //     name: "User",
        //     component: NotFound,
        //     includeInHeader: false,
        //     children: [
        //         {
        //             path: ":catchall(.*)",
        //             component: NotFound,
        //         },
        //         {
        //             path: "/:id(\\d+)",
        //             component: UserDisplay,
        //             props: true
        //         }
        //     ]
        // }
    ]
});

export default router;
