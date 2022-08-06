import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  // -- Example route with added parameters ,
  // -- can be accesed through "this.$route.params['paramName']"
  // {
  //     path: "/Home/:id",
  //     name: "Home",
  //     component: Home,
  // },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
