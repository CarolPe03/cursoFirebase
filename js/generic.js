
var firebaseConfig = {
  apiKey: "AIzaSyB0ytTY3TLna2vILvT2WzyOspjlTl3P11Y",
  authDomain: "cursofirebase-adba9.firebaseapp.com",
  projectId: "cursofirebase-adba9",
  storageBucket: "cursofirebase-adba9.appspot.com",
  messagingSenderId: "234912305790",
  appId: "1:234912305790:web:77989a7e17da42a4933e2f",
  measurementId: "G-Q3P18VVJNQ"
  };

  firebase.initializeApp(firebaseConfig);

  function Salir(){
   firebase.auth().signOut().then(resp=>{
    document.location.href="index.html"
    console.log("Cerrar sesion");
   })
   .catch(err => {
     console.error(err);
     alert(err);
       });
}