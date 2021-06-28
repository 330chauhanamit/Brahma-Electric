import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonProgressBar, IonButton, IonItem, IonIcon, 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonSearchbar, IonModal, IonImg, IonChip, IonLabel, IonFab, IonFabButton } from '@ionic/react';
import { useState, useEffect } from 'react';
import { closeCircleOutline, informationCircleOutline, navigateOutline } from 'ionicons/icons';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [centerId, setCenterId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSearch, setFilteredSearch] = useState([
    {
      id: 0,
      name: "",
      imgcode: "",
      address: "",
      mapadd: "",
      rate: "",
      pa: "",
      pn: ""
    }])
  var ids:any[]; 
  ids=[
    {
      "id": 0,
      "name": "Vibhuti Khand",
      "imgcode": "dth6vWEVJFQp2zJTUtvJMTMFfQemvkhU-35JsycDoPhYowxVJJ9kCHX6t7MKN_5sPW4lG9zrOr-xJV0qpz0oLUfO5_YENTLXUt2H4X3vIQ2L_8leQkF1ms2WwcxklyzH2MiNGVFjQdA=w2400",
      "address": "Railway Station Rd, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
      "mapadd": "https://goo.gl/maps/NhFVkA4bDiy5LSh78",
      "rate": "11.5",
      "pa": "9113188264@paytm", 
      "pn": "Raj Kumar"
    },
    {
      "id": 1,
      "name": "Vishwas Khand",
      "imgcode": "xKWTQA46sFH9uY1bocUunIP1OZDYD01l1QiB1Bn4o6lJcBV0HEZRew-anSkg_ejGehqMV71bmB5mxDiOsycwHpjTIedwUUdr7L1qeWVnMCPBIW5-S3KuMWZQZAS_d0MP5-iXF-aMNSY=w2400",
      "address": "Manoj Pandey Chauraha, B-18, Vishwas Khand, Near, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
      "mapadd": "https://goo.gl/maps/tQ6sfMVWeo7uRMgY9",
      "rate": "12",
      "pa": "9113188264@paytm", 
      "pn": "Raj Kumar"
    },
    {
      "id": 2,
      "name": "Vijayant Khand",
      "imgcode": "Ycc9nFitQIySN-p47_pMQPLXAS4qsz8lOTcwGy4FFfTETB0agcAZlsNMT7m2ldnqc5Q_WzkH2Tn98iJh8ia9LCIbt9rDIEqM72bf1hikQyPCmTJnzjMFwnqkrP1wkp8Z3PyYhnr6Xig=w2400",
      "address": "CP -2, Railway Station Rd, Vijayant Khand, Lucknow, Uttar Pradesh 226010",
      "mapadd": "https://goo.gl/maps/RMc3jM33FgUz3WfTA",
      "rate": "12",
      "pa": "9113188264@paytm", 
      "pn": "Raj Kumar"
    },
    {
      "id": 3,
      "name": "Viraj Khand",
      "imgcode": "Ufiwvj5v6zB4DOb2ZwNATIvC_tta9e5NHVw3vEB2WKg68nSfO7w4JKIoHWaUSXreIZGPnjwgZasKYKNumpAMxtqNbfz0Zua0GI9T_A7lXPIGL3YOzOsz3vsYMDPqwfdjEV0J943Jf-Q=w2400",
      "address": "Besides Singapore Mall, Viraj Khand-4, Viraj Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
      "mapadd": "https://goo.gl/maps/9JXCMHUvGG2crwbo7",
      "rate": "10.75",
      "pa": "9113188264@paytm", 
      "pn": "Raj Kumar"
    },
    {
      "id": 4,
      "name": "Vikas Khand",
      "imgcode": "8KiaKs9Co2BryAaGfLQAbZXBExW1AUMdg9NtCMl7CdUfIiGTzjY9mJkEaUiT4UKTOnQ9YW7neKeMCwQ3Z3TkkO8GQHW7mMPIVdBPnvCjst2LaVWFDfTP078ch_2kHfmk133swPPDE7s=w2400",
      "address": "Indian Oil Corporation Petrol Pump, Patrakarpuram Rd, Vikas Khand 1, Gomti Nagar, Lucknow, Uttar Pradesh 226010",
      "mapadd": "https://goo.gl/maps/ssrxWiFuedCy2UD67",
      "rate":  "11",
      "pa": "9113188264@paytm", 
      "pn": "Raj Kumar"
    },
    ]
  function makeid(length:Number) {
      var result           = [];
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
   charactersLength)));
     }
     return result.join('');
  }
  useEffect(() => {
      let tempSearchResult = ids.filter(ele => ele.name.includes(searchQuery))
      setFilteredSearch([...tempSearchResult])
  },[searchQuery])
  async function sendPayment(amt:String, pn:String, pa:String) {
    const tid = makeid(15)
    const tr = makeid(10)
    var upiurl = 'upi://pay?pa='+pa+'&pn='+pn+'&tn=Brahma Electric Payment&tid=' + tid + '&tr=' + tr +'&am='+amt+'&cu=INR'
    console.log(upiurl)
    await window.open(upiurl)
   }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Find Station</IonTitle>
          <IonProgressBar color="secondary" value={0.33}></IonProgressBar>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonModal id="model1" isOpen={showModal}>
        <IonHeader>
          <IonButton color="light" id="close" onClick={() => setShowModal(false)}>
            <IonIcon icon={closeCircleOutline} />
          </IonButton>
        </IonHeader>
          <IonContent id="modelcontent">
          <IonChip className="modeltext" color="primary">
          <IonLabel color="secondary" className="fnttext2">Details</IonLabel>
        </IonChip>
            <IonCard>
            <IonChip className="modeltext" color="dark">
              <IonLabel color="secondary" className="fnttext2">Address</IonLabel>
            </IonChip>
            <p>{ids.filter(ele => ele.id == centerId)[0].address}</p>
            </IonCard>
            <IonCard>
              <IonItem>
              <IonChip color="dark">
                <IonLabel color="secondary">Rate (per Unit) </IonLabel>
              </IonChip>
              <IonChip outline color="primary">
                <IonLabel>&#8377; {ids.filter(ele => ele.id == centerId)[0].rate}</IonLabel>
              </IonChip>
            </IonItem>
            </IonCard>
            <IonCard>
            <IonChip className="modeltext" color="dark">
              <IonLabel color="secondary" className="fnttext2">Engagement</IonLabel>
            </IonChip>
            <IonImg className="graph" src={"https://lh3.googleusercontent.com/" + ids.filter(ele => ele.id == centerId)[0].imgcode} />
            </IonCard>
            <IonCard>
            <IonButton onClick={() => sendPayment(String(50), ids.filter(ele => ele.id == centerId)[0].pn, ids.filter(ele => ele.id == centerId)[0].pa)} color="Primary">
                <IonLabel color="secondary" className="fnttext2">Book a battery @ 50</IonLabel>
            </IonButton>
            </IonCard>
          </IonContent>
        </IonModal>
        <IonSearchbar value={searchQuery} onIonChange={e => setSearchQuery(e.detail.value!)}>
        </IonSearchbar>
        {filteredSearch.map((search) => (
          <IonCard color="light" key={search.id}>
              <IonCardHeader>
                <IonCardSubtitle>
                  <IonChip className="citytext1" color="dark">
                    <IonLabel color="secondary" className="citytext2">Lucknow</IonLabel>
                  </IonChip>
                </IonCardSubtitle>
                <IonCardTitle>{search.name}</IonCardTitle>
              </IonCardHeader>
              <IonButton onClick={() => window.open(ids[search.id].mapadd)} color="light" id="somthing">
              <IonIcon icon={navigateOutline} />
              </IonButton>
              <IonButton onClick={() => {
                setShowModal(true)
                setCenterId(search.id)
                }} color="light" id="somthing">
              <IonIcon icon={informationCircleOutline} />
              </IonButton>
          </IonCard>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
