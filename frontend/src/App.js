import './App.css';
import React, { useState, useContext, useEffect } from 'react';
import SessionManager from './providers/SessionManager';
import Ui, { UiContext } from './components/Ui';
import RoutingManager from './providers/RoutingManager';


const GlobalContextInstance = React.createContext({});
export const useGlobalContext = () => useContext(GlobalContextInstance);

const AuthContextInstance = React.createContext({});
export const useAuthContext = () => useContext(AuthContextInstance);


export default function App() {

    /// Dati autorizzativi visibili e modificabili da tutti i componenti
    /// (lo creo STATE così forza il refresh della gui quando cambiano)
    const [authContext, setAuthContext] = useState({
        user: SessionManager.getUser()
    });

    /// Dati globali visibili e modificabili da tutti i componenti
    const [globalContext, setGlobalContext] = useState({
        spin: null,
        showMenu: false
    });

    /// Attiva\disattiva loading spinner
    function setSpin(active, msg = "") {
        setGlobalContext((prevState) => ({
            ...prevState,
            spin: UiContext.loadingSpin(active, msg)
        }));
    }

    /// init dati autorizzativi
    useEffect(() => {
        SessionManager.initAuthContextInstance(authContext, setAuthContext);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [/* no params se no loopa */]);


    return (
        <>
            <GlobalContextInstance.Provider value={{ globalContext, setGlobalContext, setSpin }}>
                <AuthContextInstance.Provider value={{ authContext, setAuthContext }}>

                    {/* spinner */}
                    <Ui context={globalContext.spin} />

                    {/* Gestisce la navigazione delle rotte e il componente di entrata di ciascuna pagina */}
                    {RoutingManager.contentManager(authContext)}

                </AuthContextInstance.Provider>
            </GlobalContextInstance.Provider>
        </>
    );
}
