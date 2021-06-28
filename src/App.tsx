import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { batteryChargingOutline, homeOutline, personOutline} from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Login from './pages/Login'
import { Storage } from '@capacitor/storage';
import {auth, UserContext} from '.'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SignUp from './pages/SignUp';
import { useContext, useEffect, useState } from 'react';

const App: React.FC = () => {
  const [user, setUser] = useState(false)
  const usr = useContext(UserContext)
  
  useEffect(() => {
    Storage.get({ key: 'loggedIn' }).then(({value}) =>{
      if(value === "true") setUser(true)
      else setUser(false)
    })
  }, [auth.currentUser, usr, auth]);
  
  return (
  <IonApp>
     <IonReactRouter>
     <IonTabs>
       <IonRouterOutlet animated={false}>
         <Route exact path="/tab1">
            {user || auth.currentUser ? <Tab1 /> : <Redirect to='/login'/>}
         </Route>
         <Route exact path="/tab2">
            {user || auth.currentUser ? <Tab2/> : <Redirect to='/login'/>}
         </Route>
         <Route exact path="/tab3">
            {user || auth.currentUser ? <Tab3 /> : <Redirect to='/login'/>}
         </Route>
         <Route exact path="/">
            {user || auth.currentUser ? <Redirect to='/tab2'/>: <Redirect to='/login'/>}
         </Route>
         <Route exact path="/login">
            {user || auth.currentUser ? <Redirect to='/tab2'/> : <Login />}
          </Route>
          <Route exact path="/signup">
            {user || auth.currentUser ? <Redirect to='/tab2'/> : <SignUp />}
          </Route>
       </IonRouterOutlet>
      {user ? 
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={batteryChargingOutline} />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={homeOutline} />
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={personOutline} />
          </IonTabButton>
          </IonTabBar> 
          :
        <IonTabBar slot="bottom"></IonTabBar>
        } 
     </IonTabs>
   </IonReactRouter>
  </IonApp>
)
};

export default App;