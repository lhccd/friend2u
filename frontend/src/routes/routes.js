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
import {ActivityEditView} from "../views/ActivityEditView";
import {CompanionView} from "../views/CompanionView";
import {LandingPageView} from "../views/LandingPageView";
import UploadPage from "../components/UploadImage";

import {UserProfileView} from "../views/UserProfileView";
import {EditProfileView} from "../views/EditProfileView";
import {ResetPasswordAskView} from "../views/ResetPasswordAskView";
import {ResetPasswordView} from "../views/ResetPasswordView";

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
    {component: authSplashScreen(ActivityHistoryView), path: '/activityhistory'},
    {component: authSplashScreen(ActivityEditView), path: '/activities/edit/:id' },
    {component: authSplashScreen(CompanionView), path: '/chooseCompanion/:id' },
    {component: LandingPageView, path: '/landing', exact: true},
    {component: UploadPage, path: '/uploadimage'},
    {component: authSplashScreen(UserProfileView), path: '/profile/:id' },
    {component: authSplashScreen(EditProfileView), path: '/editProfile' },
    {component: authSplashScreen(ResetPasswordAskView), path: '/password/reset', exact: true},
    {component: authSplashScreen(ResetPasswordView), path: '/password/reset/:id/:token' },
];
