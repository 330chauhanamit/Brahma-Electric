import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar, 
  IonIcon, IonCard, IonAvatar, IonItem, IonChip, IonLabel, IonFab, IonFabButton } from '@ionic/react';
import { logOutOutline, personOutline } from 'ionicons/icons';
import { useCallback, useContext} from 'react';
import { useHistory } from "react-router-dom";
import './Tab3.css';
import {auth} from '..';  
import {UserContext} from '..'
import { Storage } from '@capacitor/storage';

const Tab3: React.FC = () => {
  const history = useHistory()
  const unsetLog = async() => {
    await Storage.set({
      key: 'loggedIn', 
      value: 'false'
    });
  };

  const handlelogout = useCallback(
    () => {
        auth.signOut().then(async () => {
          await unsetLog().then(() => {
            history.replace('/login')
          })
        })
    },
    [],
  )
  
  const user = useContext(UserContext);
  
  console.log(user)

  return (  
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Profile</IonTitle>
          <IonProgressBar color="secondary" value={1}></IonProgressBar>
        </IonToolbar>
      </IonHeader>
      <IonContent color="light" fullscreen>
      <IonCard id="main-p">
          <IonAvatar>
          <IonIcon id="profile" icon={personOutline} />
          </IonAvatar>
      </IonCard>
      <IonCard>
          <IonItem>
            <IonChip color="primary">
              <IonLabel color="success">Name</IonLabel>
            </IonChip>
            <IonChip outline color="primary">
              <IonLabel>{user?.name}</IonLabel>
            </IonChip>
          </IonItem>
      </IonCard>
      <IonCard>
          <IonItem>
            <IonChip color="primary">
              <IonLabel color="success">Location</IonLabel>
            </IonChip>
            <IonChip outline color="primary">
              <IonLabel>{user?.location}</IonLabel>
            </IonChip>
          </IonItem>
      </IonCard>
      <IonCard>
          <IonItem>
            <IonChip color="primary">
              <IonLabel color="success">Ph. No.</IonLabel>
            </IonChip>
            <IonChip outline color="primary">
              <IonLabel>{user?.phone}</IonLabel>
            </IonChip>
          </IonItem>
      </IonCard>
      <IonCard>
          <IonItem>
            <IonChip color="primary">
              <IonLabel color="success">Battery Type</IonLabel>
            </IonChip>
            <IonChip outline color="primary">
              <IonLabel>{user?.battery}</IonLabel>
            </IonChip>
          </IonItem>
      </IonCard>
      <IonFab vertical="bottom" horizontal="center" slot="fixed">
        <IonFabButton onClick={handlelogout}>
          <IonIcon icon={logOutOutline} />
        </IonFabButton>
      </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
