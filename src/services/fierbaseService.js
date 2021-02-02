import firebase from "firebase"; 

export default class firebaseService {

    getData = (dbName, dataLoaded, dataRequested=null) =>{
        if(dataRequested) {
            dataRequested()
        }
        let data = [];
        firebase.firestore().collection(dbName).get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const newItem = {...doc.data(), id: doc.id}
                data = [...data, newItem]
            });
            dataLoaded(data)
           
        });  
    }

    setData = (curentUser, dbName, data, actions, validate, close, arr) => {
        if(curentUser) {
            console.log(typeof(data.sum))
            const db = firebase.firestore();
        db.collection(`${curentUser.uid}${dbName}`).add(data)
        .then(function(docRef) {
            actions({...data, id: docRef.id});
            validate(false);
            close();
        })
        .catch(function(error) {
            console.error("Error: ", error);
    });
        } else {
            const id = Math.max(...arr.map(item => item.id)); 
            actions({...data, id: id+1});
            close();
        }
        
    }

    updateField = (curentUser, dbName, document, fieldName, fieldValue, action) =>{
        if(curentUser) {

            const db = firebase.firestore();
        db.collection(`${curentUser.uid}${dbName}`).doc(document).update({
            [fieldName] : fieldValue
        })
        .then(() => {
            action(document, fieldValue);
        })
        .catch(function(error) {
            console.error("Error: ", error);
    });
        } else {
            action(document, fieldValue);
        }
    }
}