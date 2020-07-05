import { HomepageView } from "../views/HomepageView";
import { UserLoginView } from "../views/UserLoginView";
import { UserSignupView } from "../views/UserSignupView";
import { ModeratorView } from "../views/ModeratorView";
import authSplashScreen from '../authSplashScreen';
import { ReportUserView } from "../views/ReportUserView";
import { ReportActivityView } from "../views/ReportActivityView"

export const routes = [
    {component: authSplashScreen(UserLoginView), path: '/login'},
    {component: authSplashScreen(ReportUserView), path: '/report_user'},
    {component: authSplashScreen(ReportActivityView), path: '/report_activity'},
    {component: authSplashScreen(UserLoginView), path: '/login', exact: true},
    {component: authSplashScreen(UserSignupView), path: '/register', exact: true},
    {component: (HomepageView), path: '/', exact: true},
    {component: authSplashScreen(ModeratorView), path: '/moderator'}
];
