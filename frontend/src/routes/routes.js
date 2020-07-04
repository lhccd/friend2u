import {HomepageView} from "../views/HomepageView";
import {UserLoginView} from "../views/UserLoginView";

import { UserSignupView } from "./views/UserSignupView";
import { ModeratorView } from "./views/ModeratorView";

import { Homepage } from "./components/Homepage";

import authSplashScreen from './authSplashScreen';

export const routes = [
	{ component: authSplashScreen(UserLoginView), path: '/login', exact: true},
	{ component: authSplashScreen(UserSignupView), path: '/login', exact: true},
	{ component: authSplashScreen(Homepage), test: 'aaa', path: '/', exact: true},
	{ component: authSplashScreen(Homepage), path: '/aaa'},
	{ component: Homepage, path: '/bbb'},
	{ component: authSplashScreen(ModeratorView), path: '/moderator'}
];
