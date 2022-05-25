import SignUpContent from '../pages/sign-up-content/sign-up-content';
import SignInContent from '../pages/sign-in-content/sign-in-content';
import CourseContent from '../pages/workspace-content/workspace-content';
import DashboardContent from '../pages/dashboard-content/dashboard-content';

export enum RoutePath {
    ROOT = '/',
    SIGNIN = '/signin',
    SIGNUP = '/signup',
    WORKSPACE_CREATE = '/workspace-create',
    SINGLE_WORKSPACE = '/workspace/:id',
    WORKSPACE = '/workspace',
}

export const unauthorizedPages = [
    {
        key: 'signIn',
        label: 'Sign In',
        path: RoutePath.SIGNIN,
        content: <SignInContent />,
    },
    {
        key: 'signUp',
        label: 'Sign Up',
        path: RoutePath.SIGNUP,
        content: <SignUpContent />,
    },
];

export const authorizedPages = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: RoutePath.WORKSPACE,
        content: <DashboardContent />,
    },
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: RoutePath.SINGLE_WORKSPACE,
        content: <DashboardContent />,
    },
    {
        key: 'workspace-create',
        label: '',
        path: RoutePath.WORKSPACE_CREATE,
        content: <CourseContent />,
    },
];
