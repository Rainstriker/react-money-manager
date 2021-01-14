import WelcomePage from '../pages/Welcome';
import LoginPage from '../pages/LoginPage';
import ManagePage from '../pages/Manage';

const components = {
  welcome: {
    url: '/',
    component: WelcomePage
  },
  LoginPage: {
    url: '/login',
    component: LoginPage
  },
  manage: {
    url: '/manage',
    component: ManagePage
  }
}

export default {
  guest: {
    allowedRoutes: [components.welcome, components.LoginPage], redirectRoutes: '/' 
  },
  user: {
    allowedRoutes: [components.manage, components.LoginPage], redirectRoutes: '/manage' 
  }
};