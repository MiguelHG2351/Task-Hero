// This is an example of how to read a JSON Web Token from an API route
import Firebase from "lib/firebase";


export default async (req, res) => {
    const firebase = Firebase.getInstance();
    const img = await firebase.getFile()

    res.json({ data: img });
};
