import { HomepageView } from "../views/HomepageView";
import {UserLoginView} from "../views/UserLoginView";

import {ReportUserView} from "../views/ReportUserView";
import {ReportActivityView} from "../views/ReportActivityView"
export const routes = [
    {component: HomepageView, path:'/', exact: true},
    {component: UserLoginView, path: '/login'},
    {component: ReportUserView, path: '/report_user'},
    {component: ReportActivityView, path: '/report_activity'},
];
