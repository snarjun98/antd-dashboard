import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAtBiIb4pro9a4Jft2SVVgKeaekyPjCcy0",
  authDomain: "cattle-health-monitoring-iot.firebaseapp.com",
  projectId: "cattle-health-monitoring-iot",
  storageBucket: "cattle-health-monitoring-iot.appspot.com",
  messagingSenderId: "26134444440",
  appId: "1:26134444440:web:f4118e6ab698390068d3ed",
  measurementId: "G-WGPN4CNQTN"
})

export const createUserProfileDocument = async(userAuth,additionalData)=>{
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if(!snapShot.exists){
    const { displayName,email,phone,invoiceId} = userAuth; // need to be changed
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        phone,
        invoiceId,
        createdAt,
        ...additionalData
      })

    } catch(error){
       console.log(error); 
    }
  }
  return userRef;
};

export const auth = app.auth();
export const firestore = app.firestore();
export default app;