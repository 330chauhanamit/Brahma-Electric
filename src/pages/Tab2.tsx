import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, IonProgressBar, 
   IonImg, IonChip, IonLabel, IonCard, IonSpinner } from '@ionic/react';
import { callOutline } from 'ionicons/icons';
import './Tab2.css';
import React from 'react';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Brahma Electric</IonTitle>
          <IonProgressBar color="secondary" value={0.66}></IonProgressBar>
        </IonToolbar>
      </IonHeader>
      <IonContent id="maincontent">
        <IonTitle id="maintitle">
          India's Largest <br/> Charging Network
        </IonTitle>
        <IonChip className="fnttext" color="dark">
          <IonLabel color="secondary" className="fnttext2">1. Find a Station near you</IonLabel>
        </IonChip>
        <IonImg className="fntimg" src="https://i.pinimg.com/originals/2a/6b/65/2a6b651433f3c6ece42ba25439f76c0d.gif" />
        <IonChip className="fnttext" color="dark">
          <IonLabel color="secondary" className="fnttext2">2. Charge/Swap Battery</IonLabel>
        </IonChip>
        <IonImg className="fntimg" src="https://473075-1485068-raikfcquaxqncofqfm.stackpathdns.com/wp-content/uploads/2020/09/SWAG_Cycle-charge_compress.gif" />
        <IonChip className="fnttext" color="dark">
          <IonLabel color="secondary" className="fnttext2">3. Done</IonLabel>
        </IonChip>
        <IonImg className="fntimg" src="https://electricvehicles.in/wp-content/uploads/2018/09/Avera-Electric-Vehicles.gif" />
        <IonCard>
          <p id="presence">Presence</p>
        </IonCard>
        <IonImg id="lko" src="https://media.istockphoto.com/vectors/lucknow-skyline-vector-illustration-linear-style-vector-id502698782?k=6&m=502698782&s=612x612&w=0&h=99vnGzYVnwfpdigPtj9D36Zw14oa1UieIE4OiJtRKmY=" />
        <IonCard>
          <p>Coming Soon...</p>
        </IonCard>
        <IonImg src="https://lh3.googleusercontent.com/O1yR42BIwV9Wd3mmlx1jLEVzV8bUVdwGwpeQSucaA9_XtRWCSTOrdXAU__vNkK6tZdqkswE0xsIurAGbJvdMjNxdRs5VOMf5n0KbvT_dB322LM_-p2EChpZsu_jDpMI9PZhqTPNogKk=w2400" />
        <IonImg src="https://lh3.googleusercontent.com/fo_DuljATG44uRyngl-0sAilAB-Q33LQOZh1r6z_LDJIpZr-xud4zcHHM0dE1rxGZVGGqCl91ilkUVai6UsdgOcErh5igikAU5tN63O4BU4CDYwHCpTGgLx0WQ5OKvr_F7miqoHUfZs=w2400" />
        <IonCard>
          <p id="presence">&#169; 2021 Brahma Electric</p>
        </IonCard>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => window.open('tel:7248634696')}>
            <IonIcon icon={callOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
    )
};

export default Tab2;