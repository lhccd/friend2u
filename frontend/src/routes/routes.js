import { HomepageView } from "../views/HomepageView";
import { UserLoginView } from "../views/UserLoginView";
import { UserSignupView } from "../views/UserSignupView";
import { ModeratorView } from "../views/ModeratorView";
import authSplashScreen from '../authSplashScreen';
import { ReportUserView } from "../views/ReportUserView";
import { ReportActivityView } from "../views/ReportActivityView"
import {ActivityListView} from "../views/ActivityListView";
import {ActivityDetailedView} from "../views/ActivityDetailedView";
import {ActivityCreateView} from "../views/ActivityCreateView";
import { ActivityHistoryView } from "../views/ActivityHistoryView";
import {ActivityEditView} from "../views/ActivityEditView"
import UploadPage from "../components/UploadImage";

export const routes = [
    {component: authSplashScreen(UserLoginView), path: '/login'},
    {component: authSplashScreen(ReportUserView), path: '/report_user'},
    {component: authSplashScreen(ReportActivityView), path: '/report_activity'},
    {component: authSplashScreen(UserLoginView), path: '/login', exact: true},
    {component: authSplashScreen(UserSignupView), path: '/register', exact: true},
    {component: authSplashScreen(HomepageView), path: '/', exact: true},
    {component: authSplashScreen(ModeratorView), path: '/moderator'},
    {component: authSplashScreen(HomepageView), path:'/', exact: true},
    {component: authSplashScreen(ActivityListView), path: '/activities/search', exact: true},
    {component: authSplashScreen(ActivityDetailedView), path: '/detail/:id'},
    {component: authSplashScreen(ActivityCreateView), path: '/activities/create' },
    {component: (ActivityHistoryView), path: '/activityhistory'},
    {component: authSplashScreen(ActivityEditView), path: '/activities/edit/:id' },
    {component: UploadPage, path: '/uploadimage'}
];
