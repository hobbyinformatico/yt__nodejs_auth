# yt__nodejs_auth
Modulo per integrare un sistema autorizzativo su Node.js (ispirato a Oauth)

# 1. Installazione

## backend
```
cd backend
npm install
```

## frontend
```
cd frontend
npm install
```

# 2. Avvio
Avviamo prima il backend che si autoconfigura al primo avvio, creando:
- il database
- il "client_id" => "default"
- la prima utenza (temporanea) ("admin", "admin")

## backend
E' un esempio che potrebbe essere il vostro server in Node.js, che tra le altre cose, espone le chiamate al frontend per gestire il modulo.
Parte e resta in ascolto sulla porta 4000.

```
cd backend
node server.js

http://localhost:4000/
```

## frontend
E' una semplice interfaccia web in React che: crea, modifica o cancella utenze e applicazioni.
Tecnicamente non è necessario mantenerla attiva se non serve gestire utenze e applicazioni.

```
cd frontend
npm start

http://localhost:3000/home
```

# 3. Utilizzo
Esempi fatti con Axios
## Login
Il login può essere eseguito con:
1. username e password
```
    const options = {
        url: "http://localhost:4000/auth/login",
        method: 'POST',
        data: {
            client_id: 'default',
            username: "username",
            password: "password",
        }
    };
    const result = await Axios(options);
    if(result.status == 200) {
        // login OK
    }
```
*Response*
```
{
    "status": 200,
    "data": {
        "username": {
            "id": 1,
            "email": "admin",
            "first_name": "admin",
            "last_name": "admin",
            "is_superuser": 1,
            "created_at": "2023-11-13 19:15:30"
        },
        "access_token": "1d9473f750f8aa30428b90e314a851",
        "refresh_token": "23e54e4d0effe63dfa13482567a3d0"
    },
    "msg": "OK"
}
```
2. refresh_token
Stessa chiamata ma body diverso.
Nella chiamata di refreesh_token non recupero le anagrafiche dell'utente quindi arriva "null".
```
    const options = {
        url: "http://localhost:4000/auth/login",
        method: 'POST',
        data: {
            refresh_token: '23e54e4d0effe63dfa13482567a3d0',
        }
    };
    const result = await Axios(options);
    if(result.status == 200) {
        // login OK
    }
```
*Response*
```
{
    "status": 200,
    "data": {
        "username": null,
        "access_token": "a4d2a7ab83fe52c090cc644a074c37",
        "refresh_token": "41d0af13fe184bc84a75d1cb851671"
    },
    "msg": "OK"
}
```

## Richiesta autenticata
Nelle chiamate autenticate di richiesta servizi o dati, è sufficiente allegare l'access_token con l'header "Authorization".
Per ogni chiamata o gruppo di chiamate possiamo associare un diverso "client_id" che l'utente dovrà fornire al login così da comunicare a quale servizio vuole autenticarsi per utilizzarlo.

Esempio, il server:
- riceve questa richiesta
```
    const options = {
        url: "http://localhost:4000/test",
        method: 'POST',
        headers: { 'Authorization': "a4d2a7ab83fe52c090cc644a074c37" },
        data: {
            "data_to_send": "prova"
        }
    };
    const result = await Axios(options);
    if(result.status == 200) {
        // login OK
    }
```
- estraiamo l'access_token dalla testata "Authorization" della request
- usiamo la funzione "Auth.clientIdAuthorized( access_token )"
- verifichiamo il risultato:
    - se risultato = null
        - l'utente non si è autenticato o la sua sessione è scaduta
    - se risultato != null
        - riceviamo "client_id" e "user" (le info dell'utente legato all'access_token)
- adesso possiamo controllare nel nostro codice se il "client_id" recuperato dalla sessione è quello giusto
    - in questo modo possiamo decidere se per quella chiamata il "client_id" da usare è questo o un'altro e\o decidere se l'accoppiata "utente"+"client_id" è autorizzata a fruire del servizio
