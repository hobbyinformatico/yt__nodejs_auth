import { Navigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
// componenti pagine
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import TestApiPage from "../pages/TestApiPage";
import Applications from "../pages/Applications";
import Users from "../pages/Users";


export default class RoutingPages {

    /// rotte di default
    static ROOT = '/';
    static JOLLY = '*';

    // pagine default (quelle che non vanno nel menu utente)
    static DEFAULT = {
        LOGIN: 'login'
    }

    static LOGIN_COMPONENT = <LoginPage />
    static HOME_COMPONENT = <HomePage />

    // wrapper per contenuto delle pagine
    static getPageWrapper(content, showLoginPopup) {
        return <PageWrapper content={content} showLoginPopup={showLoginPopup} />
    }

    // nuove pagine (quelle visibili su menu utente)
    static PAGES = {
        HOME: {
            key: 'home',
            label: 'Home'
        },
        /*
        TEST_API: {
            key: 'testApi',
            label: 'Test Api'
        },
        */
        APPLICATIONS: {
            key: 'applications',
            label: 'Applicazioni'
        },
        USERS: {
            key: 'users',
            label: 'Utenti'
        },
    };

    /// pagine
    static ROUTES = [
        {
            path: RoutingPages.ROOT,
            element: <Navigate to={`/${RoutingPages.PAGES.HOME.key}`} replace />,
            requiresAuth: true,
        },
        {
            path: RoutingPages.PAGES.HOME.key,
            element: RoutingPages.HOME_COMPONENT,
            requiresAuth: true,
        },
        {
            path: RoutingPages.DEFAULT.LOGIN,
            element: RoutingPages.LOGIN_COMPONENT,
            requiresAuth: true,
        },
        // --- nuove pagine ---
        /*
        {
            path: RoutingPages.PAGES.TEST_API.key,
            element: <TestApiPage />,
            requiresAuth: true,
        },
        */
        {
            path: RoutingPages.PAGES.APPLICATIONS.key,
            element: <Applications />,
            requiresAuth: true,
        },
        {
            path: RoutingPages.PAGES.USERS.key,
            element: <Users />,
            requiresAuth: true,
        },
        // --- default  ---
        {
            path: RoutingPages.JOLLY,
            element: <Navigate to={`/${RoutingPages.PAGES.HOME.key}`} replace />,
            requiresAuth: true,
        }
    ];
}