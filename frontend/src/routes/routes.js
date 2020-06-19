import {HomepageView} from "../views/HomepageView";
import {UserLoginView} from "../views/UserLoginView";

export const routes = [
    {component: HomepageView, path:'/', exact: true},
    {component: UserLoginView, path: '/login'},
];