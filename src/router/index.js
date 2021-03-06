import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import Dashboard from "@/views/Dashboard";
import OAuth2Callback from "@/views/OAuth2Callback";
import Profile from "@/views/Profile";
import Users from "@/views/Users";
import UserDisplay from "@/views/UserDisplay";
import NotFound from "@/views/NotFound";

import Leaderboard from "@/components/users/Leaderboard"

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
            includeInHeader: false,
            beforeEnter(to, from) {
                console.log("test")
                const session_data = window.localStorage.getItem("user_session_data");
                if (session_data === "undefined" || session_data === null) {
                    console.log(to.path.split('/').slice(1));
                    console.log(to.query);
                    console.log(to.hash);
                    return {
                        name: "NotFound",
                        params: { pathMatch: to.path.split('/').slice(1) },
                        query: to.query,
                        hash: to.hash,
                    }
                }
            }
        },
        {
            path: "/users",
            name: "Users",
            component: Users,
            includeInHeader: true,
            children: [
                {
                    path: ":id(\\d+)",
                    component: UserDisplay,
                    props: true,
                },
                {
                    path: ":catchAll(.+)",
                    component: NotFound
                },
                {
                    path: "",
                    component: Leaderboard
                }
            ]
        }
    ]
});

export default router;
