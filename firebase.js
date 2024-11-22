const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc } = require('firebase/firestore');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC0oSaTA4N7yhRFHw7IaAjRf8XSFp9BUkU",
    authDomain: "appointment-bc12e.firebaseapp.com",
    projectId: "appointment-bc12e",
    storageBucket: "appointment-bc12e.appspot.com",
    messagingSenderId: "395862541041",
    appId: "1:395862541041:web:10e3a82afc6f2652cfdf50",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);



async function getProfFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, 'profs'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('Firestore Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching Firestore data:', error);
        throw error;
    }
}



async function getRfidFromFirestore() {
    try {
        const querySnapshot = await getDocs(collection(db, 'rfid'));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log('RFID Data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching RFID data:', error);
        throw error;
    }
}
// set appointment to firestore
async function addEventToDatabase(event) {
    try {
        const docRef = await addDoc(collection(db, 'consultation-form'), event);
        console.log('Document written with ID:', docRef.id);
    } catch (error) {
        console.error('Error adding document:', error);
        throw error;
    }
}

module.exports = { getProfFromFirestore, auth,
     signInWithEmailAndPassword, getRfidFromFirestore,addEventToDatabase};