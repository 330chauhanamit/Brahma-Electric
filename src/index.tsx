import React, {createContext, FC, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/app'
import 'firebase/auth';
import "firebase/firestore";
import {getUserDocument} from './firebase'

firebase.initializeApp({
  apiKey: "AIzaSyDOW1kn4Wlke6Fy1BTUqSGe8Pqo2UQx1jU",
  authDomain: "brahma-elec.firebaseapp.com",
  projectId: "brahma-elec",
  storageBucket: "brahma-elec.appspot.com",
  messagingSenderId: "549857476801",
  appId: "1:549857476801:web:12fb74069884a0c8d91440",
  measurementId: "G-4F920Z8XL9"
})

export const auth = firebase.auth()
export const firestore = firebase.firestore();

export const UserContext = createContext<any>(null);

const UserProvider: FC = ({children}) => {
const [user, setUser] = useState<any>(null)

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      const data = await getUserDocument(userAuth?.uid)
      console.log(data)
      setUser(data)
    })
  }, [auth])

  return <UserContext.Provider value={user}>
    {children}
  </UserContext.Provider>
}

ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
    <App />
    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
