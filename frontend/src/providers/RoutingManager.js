import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import RoutingPages from "../settings/RoutingPages";


/// Interfaccia per gestire il routing delle pagine
// (customizzato con "auth_admin/src/settings/RoutingPages.js")
export default class RoutingManager {

    /// 
    static getMenuPages() {
        let listPages = [];
        for (let p in RoutingPages.PAGES) {
            listPages.push(RoutingPages.PAGES[p]);
        }
        return listPages;
    }

    /// Generatore delle rotte navigabili e gestibili
    static contentManager(authContext) {
        return <RouterProvider router={
            createBrowserRouter(RoutingManager.getRoutes(authContext))
        } />
    }

    /// Controlla la navigazione
    static getRoutes(authContext) {
        const user = authContext.user;
        let showLoginPopup = false;

        // Redirect forzato a:
        //     - LOGIN => se è richiesta autenticazione e non è ancora avvenuta
        //     - HOME  => (default) se richiesta pagina:
        //         - di login ma il login è già avvenuto
        //         - non esistente
        return RoutingPages.ROUTES.map((r) => ({
            path: r.path,
            element: (() => {

                // Login richiesto
                if (r.requiresAuth === true && user == null) {
                    // Abilita una popup di login per l'autenticazione invece che
                    // navigare ad una nuova pagina (così l'utente rimarrà sulla
                    // stessa pagina e potrà riautenticarsi senza perdere il lavoro
                    // in corso
                    showLoginPopup = true;
                }
                // Login già effettuato
                else {
                    // l'url punta al login
                    if (r.path === RoutingPages.DEFAULT.LOGIN) {
                        // login non necessario => navigazione a Home
                        return <Navigate to={`/${RoutingPages.PAGES.HOME.key}`} replace />;
                    }
                }
                return RoutingPages.getPageWrapper(r.element, showLoginPopup);
            })()
        }));
    }
}