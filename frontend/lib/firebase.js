import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
class Firebase {
    // singleton
    static instance = null;

    static getInstance() {
        if (!Firebase.instance) {
            Firebase.instance = new Firebase();
        }
        return Firebase.instance;
    }

    constructor() {
        this.app = initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID
        });
        this.storage = getStorage(this.app);
    }

    getFile(path) {
        return new Promise((resolve, reject) => {
            getDownloadURL(ref(this.storage, "xd/migration.sql"))
                .then((url) => {
                    // `url` is the download URL for 'images/stars.jpg'
        
                    // This can be downloaded directly:
                    // const xhr = new XMLHttpRequest();
                    // xhr.responseType = "blob";
                    // xhr.onload = (event) => {
                    //     const blob = xhr.response;
                    // };
                    // xhr.open("GET", url);
                    // xhr.send();
        
                    // Or inserted into an <img> element
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        })
    }
}

export default Firebase;
