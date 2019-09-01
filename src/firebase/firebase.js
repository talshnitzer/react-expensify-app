import * as firebase from 'firebase'; //takes all of the named exports from firebase and dump it on a new var called firebase
//this is required because firebase doesnt have default export, so we take all the named exports and create
//a variable for them and than acces them from that variable


//copied from firebase page
//change so it's depending on the environment.
//different set of values for production, for development or for testing. 
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
    //apiKey: "AIzaSyCELyTTw1pMVfT_0A4JdsK3uW7AHhEI1k8",
    // authDomain: "expensify-a30fa.firebaseapp.com",
    // databaseURL: "https://expensify-a30fa.firebaseio.com",
    // projectId: "expensify-a30fa",
    // storageBucket: "",
    // messagingSenderId: "746806995598",
    // appId: "1:746806995598:web:d951e7997d320526"
  };

  firebase.initializeApp(firebaseConfig); //This is going to initialize firebase to work with the specific application whose config you provided.

  const database = firebase.database();

  export { firebase, database as default };








// //DB constrauction
// //Firebase does not support arrays, so we need to reconstract the array to an object and th 'id' are the object proporties which contain the content
// //this is the structure that we work with when we store list based data in firebase.

// //listen to "child_removed" event, getting back the child removed data
// database.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// });

// //child_changed
// database.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());   
// });

// //child_added - gets called for existing children and new children
// database.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());   
// });

// //converting firebase objects structure into an array straucture
// //---------------------------
// // database.ref('expenses').on('value',(snapshot) => {
// //     const expenses = [];
// //     snapshot.forEach((childSnapshot) => {
// //         expenses.push({
// //             id: childSnapshot.key,
// //             ...childSnapshot.val()
// //         });
// //     });
// //     console.log(expenses); 
// // });

// // database.ref('expenses')
// //   .once('value')
// //   .then((snapshot) =>{
// //     const expenses = [];

// //     snapshot.forEach((childSnapshot) => {
// //         expenses.push({
// //             id: childSnapshot.key,
// //             ...childSnapshot.val()
// //         });
// //     });

// //     console.log(expenses);
// //   });

// //Create by push
// //--------------
// database.ref('expenses').push({
//     description: 'Rent',
//     note: 'my rent',
//     amount: 100,
//     createdAt: 1
// });


// // database.ref('notes').push({
// //     title: 'Course topics',
// //     body: 'React Native, Angular, Python'
// // }); //when we use push firebase is automatically create a new property on our reference
// //give it a random value and take what we pass into push and set it in the property.
// //we can pass an object a string or a number to push



// //database.ref('notes/-Lmny32aoxMiL6Tos8Jz').remove();

// //Dummy notes data
// //   const firebaseNotes = {
// //       note: {
// //           uoiiyui:{
// //             title: 'First note',
// //             body: 'This is my note'
// //           },
// //           fyiuhulhl: {
// //             title: 'Another note',
// //             body: 'This is my note'
// //           }
// //       }
// //   };

// //   const notes  = [{
// //     id: '12',
// //     title: 'First note',
// //     body: 'This is my note'
// //   }, {
// //     id: '761ase',
// //     title: 'Another note',
// //     body: 'This is my note'
// //   }];

//   //database.ref('notes').set(notes);

//   //READ from firebase
//------------------------
//   //we have two ways we can read data: we can fetch data a single time,
//   // or we can fetch data by subscribing which allows us to get notified on changes.

// //Read Subscribe** to ref point
// //-----------------------------
// //   database.ref().on('value', (snapshot) => {
// //     console.log(`${snapshot.val().name} is a ${snapshot.val().job.title} at ${snapshot.val().job.company}`);
// //   });

// //   setTimeout(() => {
// //     database.ref('name').set('Simon');
// // }, 3500);
  
// //   const onValueChange = database.ref().on('value', (snapshot) => {    //anytime a value changes (or on initial load) at the specified reference, the value event will fire giving you a snapshot of all the data.
// //     console.log(snapshot.val());
// //   }, (e) => {
// //     console.log(('Error with data fetching', e));
    
// //   }); //we're able to get the value back from the database, initially,
// //                             //And every single time it changes
// // setTimeout(() => {
// //     database.ref('age').set(29);
// // }, 3500);

// // setTimeout(() => {
// //     database.ref().off(onValueChange);   //remove subscription for specific subscription method
// // }, 7000);

// // setTimeout(() => {
// //     database.ref('age').set(30);
// // }, 10500);

// //Read Once***
// //------------
// //   database.ref('location/city')
// //     .once('value')
// //     .then((snapshot) => {   //once return a promise, and we get an argument back. 
// //                             //We did request some data and the data is available to us at 'snapshot'.
// //                             //And on the snapshot we have access to our data. method val returns the data as an object 
// //         const val = snapshot.val();
// //         console.log(val);
// //     })
// //     .catch((e) => {
// //         console.log('Error fetching data', e);
// //     });

// //Creat**
// //-------
// //   database.ref().set({  //ref = reference certain section of DB (like collection in MongoDB)
// //     //if we don't provide aruments to it, it means we reference the root
// //     name: 'Yosef Mango',
// //     age: 26,
// //     stressLevel: 6,
// //     job: {
// //         title: 'Software developer',
// //         company: 'Google'
// //     },
// //     location: {
// //         city: 'Tuval', 
// //         country: 'Israel'
// //     }
// //   }).then(() => {
// //       console.log('Data is saved');
// //   }).catch((e) => {
// //     console.log('This failed.', e);
// //   });

// //Update**
// //--------
// //   database.ref().update({
// //     stressLevel: 9,
// //     'job/company': 'Amazon',
// //     'location/city': 'Seattle'
// //   });


// //   database.ref().update({
// //       job: 'Manager',
// //       'location/city': 'Boston'
// //   }); //update need to be called with an object,
//   //update into nested- objects it's not going to update inside
//   //so we need to adrees nested object with "/", and wrap it in ''
// //because otherwise it's not valid property name.
// //update support promises

// //Delete**
// //--------
//   //database.ref('isSingle').set(null); //another option to remove data

// //   database.ref()
// //   .remove()
// //   .then(() => {
// //     console.log('Remove succeeded');
// //   }).catch((e) => {
// //     console.log('Remove fauled: ', e);
// //   });

//   //database.ref().set('This is my data');

// //   database.ref('age').set(27);//updating only the age
// //   database.ref('location/city').set('Carmiel');

// //   database.ref('attributes').set({ //adding new route
// //           height: 155,
// //           weight: 53
// //   }).then(() => {
// //       console.log('attributes saved.');
// //   }).catch((e) => {
// //     console.log('attributes failed to save.', e);
// //   });

  