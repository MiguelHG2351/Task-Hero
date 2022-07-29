import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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
            // apiKey: process.env.FIREBASE_API_KEY,
            // authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            // projectId: process.env.FIREBASE_PROJECT_ID,
            // storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            // messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            // appId: process.env.FIREBASE_APP_ID,
            // measurementId: process.env.FIREBASE_MEASUREMENT_ID
            apiKey: "AIzaSyA7KISZC8AXHGMS7lJfKGWj_8h5c1R9Rf4",
            authDomain: "task-hero-871fc.firebaseapp.com",
            projectId: "task-hero-871fc",
            storageBucket: "task-hero-871fc.appspot.com",
            messagingSenderId: "755294599757",
            appId: "1:755294599757:web:2ffc4d0e1bf6025361fa04",
            measurementId: "G-RT24CNHJWS",
        });
        this.storage = getStorage(this.app);
    }

    getFile(path) {
        return new Promise((resolve, reject) => {
            getDownloadURL(ref(this.storage, path))
                .then((url) => {
                    resolve(url);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
    uploadFile(path, file) {
        return new Promise((resolve, reject) => {
            const storageRef = ref(this.storage, path);
            uploadBytes(storageRef, file)
                .then(() => {
                    resolve(this.getFile(path));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}

export default Firebase;
