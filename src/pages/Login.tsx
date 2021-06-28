import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar, IonItem, IonList, IonInput, IonLabel, IonChip, IonButton, IonCard, IonAlert, IonFab, IonSpinner } from '@ionic/react';
import React, { useState, useCallback, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './Login.css';
import { auth } from '..';
import { Storage } from '@capacitor/storage';

const Login: React.FC = () => {
  const [usr, setUsr] = useState('');
  const [pass, setPass] = useState('');
  const [alertText, setAlertText] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const setLog = async () => {
    await Storage.set({
      key: 'loggedIn',
      value: 'true'
    });
  };

  const handlelogin = useCallback(
    () => {
      setLoading(true);
      if (usr.length === 0) {
        setLoading(false);
        setAlertText('Email is required!');
      } else if (pass.length === 0) {
        setLoading(false);
        setAlertText('Password Required!');
      } else {
        auth.signInWithEmailAndPassword(usr, pass).then(async (res) => {
          await setLog().then(() => {
            console.log("Login Worked", { res });
            setUsr('');
            setPass('');
            setLoading(false);
            history.replace('/tab2');
          });
        }).catch((error) => {
          setLoading(false);
          setAlertText(error.message);
          setUsr('');
          setPass('');
        });
      }
    },
    [pass, usr],
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Login</IonTitle>
          <IonProgressBar color="secondary" value={1}></IonProgressBar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonList>
            <IonChip className="head" color="dark">
              <IonLabel color="secondary">Email</IonLabel>
            </IonChip>
            <IonItem className="inputitem">
              <IonInput className="inputbox" value={usr} placeholder="Enter Email" onIonChange={e => setUsr(e.detail.value!)}></IonInput>
            </IonItem>
            <IonChip className="head" color="dark">
              <IonLabel color="secondary">Password</IonLabel>
            </IonChip>
            <IonItem className="inputitem">
              <IonInput className="inputbox" value={pass} type="password" placeholder="Enter Password" onIonChange={e => setPass(e.detail.value!)}></IonInput>
            </IonItem>
          </IonList>
          <IonButton onClick={handlelogin} color="primary" id="submit">
            Submit
          </IonButton>
        </IonCard>
        <IonCard>
          <IonChip className="head" color="dark">
            <IonLabel color="secondary">Don't have a account yet?</IonLabel>
          </IonChip>
          <IonButton routerLink="/signup" color="light">
            Sign Up
          </IonButton>
        </IonCard>
        <IonAlert
          isOpen={alertText.length > 0}
          onDidDismiss={() => setAlertText('')}
          message={alertText}
          buttons={['OK']}
        />
      </IonContent>
      {loading ?
        <IonFab color="none" vertical="center" horizontal="center" slot="fixed">
          <IonSpinner name="lines" />
        </IonFab> : <></>
      }
    </IonPage>
  );
};

export default Login;
