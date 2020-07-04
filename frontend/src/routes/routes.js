import { HomepageView } from "../views/HomepageView";
import {UserLoginView} from "../views/UserLoginView";

import { UserSignupView } from "../views/UserSignupView";
import { ModeratorView } from "../views/ModeratorView";

import authSplashScreen from '../authSplashScreen';

export const routes = [
	{ component: authSplashScreen(UserLoginView), path: '/login', exact: true},
	{ component: authSplashScreen(UserSignupView), path: '/register', exact: true},
	{ component: authSplashScreen(HomepageView), path: '/', exact: true},
	{ component: authSplashScreen(ModeratorView), path: '/moderator'}
];
