import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar, IonItem, IonList, IonInput, IonLabel, IonChip, IonButton, IonCard, IonAlert, IonFab, IonSpinner } from '@ionic/react';
import React, { useCallback, useState } from 'react';
import { useHistory } from "react-router-dom";
import './SignUp.css';
import {auth} from '..';
import { generateUserDocument } from "../firebase";
import { Storage } from '@capacitor/storage';

const SignUp: React.FC = () => {
  const [usr, setUsr] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('Lucknow');
  const [phone, setPhone] = useState('');
  const [battery, setBattery] = useState('');
  const [alertText, setAlertText] = useState('');
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  
  const setLog = async() => {
    await Storage.set({
      key: 'loggedIn', 
      value: 'true' 
    });
  };

  const createUserWithEmailAndPasswordHandler = useCallback (() => {
    setLoading(true)
    setLocation("Lucknow");
    if (usr.length === 0) {
      setAlertText("Email Id Empty")
      setLoading(false)
    }else if (pass.length === 0) {
      setLoading(false)
      setAlertText("Password Required!")
    }else if (pass.length < 0) {
      setLoading(false)
      setAlertText("Password length should be >= 6!")
    }else if (confirmPass !== pass) {
      setLoading(false)
      setAlertText("Password don't match")
    }else if (name.length === 0) {
      setLoading(false)
      setAlertText("Name Empty")
    }else if (location.length === 0) {
      setLoading(false)
      setAlertText("Location Empty")
    }else if (phone.length === 0) {
      setLoading(false)
      setAlertText("Phone Number Empty")
    }else if (battery.length === 0) {
      setLoading(false)
      setAlertText("Battery Type Empty")
    }else{
        auth.createUserWithEmailAndPassword(usr, pass).then(async ({user}) => {
          generateUserDocument(user, name, location, phone, battery).then(async () => {
            await setLog().then(() => {
                auth.signOut().then(() =>
                  auth.signInWithEmailAndPassword(usr, pass).then(
                    () => {
                      setLoading(false)
                      history.replace('/tab2')
                    }
                  )
                )
              })
          })
        }).catch((error) => {
          setLoading(false)
          setAlertText(error.message);
          setBattery('');
          setConfirmPass('');
          setName('');
          setPhone('');
          setUsr('');
          setPass('');
        })
    }
  }, [usr, pass, confirmPass, name, location, phone, battery]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Sign Up</IonTitle>
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
        <IonInput className="inputbox" value={usr} placeholder="Enter Email" onIonChange={e => setUsr(e.detail.value!)} required></IonInput>
      </IonItem>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Password</IonLabel>
      </IonChip>
      <IonItem className="inputitem">
        <IonInput className="inputbox" value={pass} type="password" placeholder="Enter Password" onIonChange={e => setPass(e.detail.value!)} required></IonInput>
      </IonItem>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Confirm Password</IonLabel>
      </IonChip>
      <IonItem className="inputitem">
        <IonInput className="inputbox" value={confirmPass} type="password" placeholder="Re-enter Password" onIonChange={e => setConfirmPass(e.detail.value!)} required></IonInput>
      </IonItem>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Name</IonLabel>
      </IonChip>
      <IonItem className="inputitem">
        <IonInput className="inputbox" value={name} placeholder="Enter Name" onIonChange={e => setName(e.detail.value!)} required></IonInput>
      </IonItem>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Location</IonLabel>
      </IonChip>
      <IonItem className="inputitem">
        <IonInput className="inputbox" value={location} placeholder="Enter Location" onIonChange={e => setLocation(e.detail.value!)} disabled required></IonInput>
      </IonItem>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Phone Number</IonLabel>
      </IonChip>
      <IonItem className="inputitem">
        <IonInput className="inputbox" value={phone} placeholder="Enter Phone Number" onIonChange={e => setPhone(e.detail.value!)} required></IonInput>
      </IonItem>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Battery Type</IonLabel>
      </IonChip>
      <IonItem className="inputitem">
        <IonInput className="inputbox" value={battery} placeholder="Enter Battery Type" onIonChange={e => setBattery(e.detail.value!)} required></IonInput>
      </IonItem>
      </IonList>
      <IonButton onClick={(e) => createUserWithEmailAndPasswordHandler()} color="primary" id="submit">
        Submit
      </IonButton>
      </IonCard>
      <IonCard>
      <IonChip className="head" color="dark">
        <IonLabel color="secondary">Already have a account</IonLabel>
      </IonChip>
      <IonButton onClick={() => {history.push('/login')}} color="light">
        Login
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
          <IonSpinner name="lines"/>
        </IonFab> : <></>
      }
    </IonPage>
  );
};

export default SignUp;
