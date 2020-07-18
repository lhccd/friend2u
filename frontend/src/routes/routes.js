import { HomepageView } from "../views/HomepageView";
import { UserLoginView } from "../views/UserLoginView";
import { UserSignupView } from "../views/UserSignupView";
import { ModeratorView } from "../views/ModeratorView";
import AuthSplashScreen from '../AuthSplashScreen';
import { ReportUserView } from "../views/ReportUserView";
import { ReportActivityView } from "../views/ReportActivityView"
import {ActivityListView} from "../views/ActivityListView";
import {ActivityDetailedView} from "../views/ActivityDetailedView";
import {ActivityCreateView} from "../views/ActivityCreateView";

import { ActivityHistoryView } from "../views/ActivityHistoryView";
import {ActivityEditView} from "../views/ActivityEditView";
import {CompanionView} from "../views/CompanionView";

import {UserProfileView} from "../views/UserProfileView";
import {EditProfileView} from "../views/EditProfileView";
import {ResetPasswordAskView} from "../views/ResetPasswordAskView";
import {ResetPasswordView} from "../views/ResetPasswordView";

import { NotFound } from "../components/NotFound" 
import { ReportUserPageOld } from "../components/reports/ReportUserPageOld" 

export const routes = [
    {component: AuthSplashScreen(UserLoginView), path: '/login'},
    {component: AuthSplashScreen(ReportUserView), path: '/report/:category/:id'},
    {component: AuthSplashScreen(ReportUserPageOld), path: '/report_user'},
    {component: AuthSplashScreen(ReportActivityView), path: '/report_activity/:id'},
    {component: AuthSplashScreen(UserLoginView), path: '/login', exact: true},
    {component: AuthSplashScreen(UserSignupView), path: '/register', exact: true},
    {component: AuthSplashScreen(HomepageView), path: '/', exact: true},
    {component: AuthSplashScreen(ModeratorView), path: '/moderator'},
    {component: AuthSplashScreen(HomepageView), path:'/', exact: true},
    {component: AuthSplashScreen(ActivityEditView), path: '/activities/edit/:id' },
    {component: AuthSplashScreen(ActivityCreateView), path: '/activities/create'},
    {component: AuthSplashScreen(ActivityListView), path: '/activities/:category'},
    {component: AuthSplashScreen(ActivityDetailedView), path: '/detail/:id'},
    {component: AuthSplashScreen(ActivityHistoryView), path: '/activityhistory'},
    {component: AuthSplashScreen(CompanionView), path: '/chooseCompanion/:id' },
    {component: AuthSplashScreen(UserProfileView), path: '/profile/:id' },
    {component: AuthSplashScreen(EditProfileView), path: '/editProfile' },
    {component: AuthSplashScreen(ResetPasswordAskView), path: '/password/reset', exact: true},
    {component: AuthSplashScreen(ResetPasswordView), path: '/password/reset/:id/:token' },
    
    //Not found route
    {component: AuthSplashScreen(NotFound), path: '*', exact: true },
];
