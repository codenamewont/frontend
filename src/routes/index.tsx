import LandingPage from '../pages/LandingPage';
import AuthPage from '../pages/AuthPage';
import DashboardPage from '../pages/DashboardPage';
import TemplateViewPage from '../pages/TemplateViewPage';
import TemplateEditPage from '../pages/TemplateEditPage';

export const routes = [
    { path: '/', element: <LandingPage /> },
    { path: '/auth', element: <AuthPage /> },
    { path: '/dashboard', element: <DashboardPage /> },
    { path: '/templates/:id', element: <TemplateViewPage /> },
    { path: '/templates/:id/edit', element: <TemplateEditPage /> }
];
