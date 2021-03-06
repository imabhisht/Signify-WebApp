import '../styles/globals.css';
import {useEffect} from 'react';
import {useAuthState} from 'react-firebase-hooks/auth';
import {auth,db} from "../fireabase";
import Login from "./login"
import Loading from '../components/Loading';
import firebase from 'firebase'
import {isMobile} from 'react-device-detect';
import MobileView from '../components/Mobile';

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if(user){
      db.collection('users').doc(user.uid).set({
        email: user.email,
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        photoURL: user.photoURL,
        name: user.displayName
      },{merge:true})
    }
  }, [user])

  if(loading) return <Loading/>

  if(isMobile){
    return <MobileView />
  }else{
    if(!user) return <Login />
  return <Component {...pageProps} />
  }
  
}

export default MyApp
