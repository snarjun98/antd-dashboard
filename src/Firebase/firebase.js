import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/analytics';
import 'firebase/storage';
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

export const createCattleProfileDocument = async(cattleData)=>{
  const cattleRef = firestore.doc(`cattles/${cattleData.invoice_id}`);
  const snapShot = await cattleRef.get();
  const { cattle_id,age,Name,breed,image_url,image_name } = cattleData; // need to be changed
  const data={id:cattle_id,
    age:age,
    name:Name,
    breed:breed,
    image_url:image_url,
    image_name:image_name
  }

  if(!snapShot.exists){
    try {
      await cattleRef.set({
        cattle_data:[
          data
        ]
      })

    } catch(error){
       console.log(error); 
    }
  }
  else{
    try {
      await cattleRef.update({
        cattle_data: firebase.firestore.FieldValue.arrayUnion(data)
      })

    } catch(error){
       console.log(error); 
    }
  }
  return cattleRef;
};


export const auth = app.auth();
export const firestore = app.firestore();
export const storage =app.storage();
export default app;