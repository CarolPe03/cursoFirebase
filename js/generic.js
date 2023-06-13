
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

  /*function verAuth(){
    firebase.auth().onAuthStateChanged(res=>{
      if(res==null){
        document.getElementById("itemSalir").style.display="none";
        document.getElementById("itemTipoLibro").style.display="none";
        document.getElementById("itemLibro").style.display="none";
        document.getElementById("itemPrestamos").style.display="none";
        document.getElementById("itemPerfil").style.display="none";
        document.getElementById("itemRegistro").style.display="inline-block";
       
      if(document.getElementById("divRedes"))
        document.getElementById("divRedes").style.visibility="visible";
        document.getElementById("divDatosUsu").style.visibility="hidden"
      }else {
        document.getElementById("itemSalir").style.display="inline-block";
        document.getElementById("itemTipoLibro").style.display="inline-block";
        document.getElementById("itemLibro").style.display="inline-block";
        document.getElementById("itemPrestamos").style.display="inline-block";
        document.getElementById("itemPerfil").style.display="inline-block";
        document.getElementById("itemRegistro").style.display="none";
     
      if(document.getElementById("divRedes"))
        document.getElementById("divRedes").style.visibility="hidden";
        document.getElementById("divDatosUsu").style.visibility="visible"
  //  if(res.displayName!=null)
  //  document.getElementById("1blNombreUsuario").innerHTML="Bienvenid@: "+ res.displayName;
  //  else
  //  document.getElementById("1blNombreUsuario").innerHTML="Bienvenid@: "+ res.email;
  firebase.firestore().collection("datosUsuario").doc(res.uid).get().then(resultado=>{
    var resp= resultado.data();
    if(res.display!=null){
      document.getElementById("1blNombreUsuario").innerHTML="Bienvenid@: "+ res.displayName;
    } else{
      document.getElementById("1blNombreUsuario").innerHTML="Bienvenid@: "+ res.email;
    }
    if(res.photoURL=!null){
      document.getElementById("1blNombreUsuario").src=res.photoURL;
    }else{
      document.getElementById("imgFotoUsuario").src="./img/noUsuario.png";
    }
         
  })
      }
    });
  }*/
  
  function verAuth() {
    firebase.auth().onAuthStateChanged(res => {
      if (res == null) {
        // Usuario no autenticado
        document.getElementById("itemSalir").style.display = "none";
        document.getElementById("itemTipoLibro").style.display = "none";
        document.getElementById("itemLibro").style.display = "none";
        document.getElementById("itemPrestamos").style.display = "none";
        document.getElementById("itemPerfil").style.display = "none";
        document.getElementById("itemRegistro").style.display = "inline-block";
  
        if (document.getElementById("divRedes")) {
          document.getElementById("divRedes").style.visibility = "visible";
        }
        document.getElementById("divDatosUsu").style.visibility = "hidden";
      } else {
        // Usuario autenticado
        document.getElementById("itemSalir").style.display = "inline-block";
        document.getElementById("itemTipoLibro").style.display = "inline-block";
        document.getElementById("itemLibro").style.display = "inline-block";
        document.getElementById("itemPrestamos").style.display = "inline-block";
        document.getElementById("itemPerfil").style.display = "inline-block";
        document.getElementById("itemRegistro").style.display = "none";
  
        if (document.getElementById("divRedes")) {
          document.getElementById("divRedes").style.visibility = "hidden";
        }
        document.getElementById("divDatosUsu").style.visibility = "visible";
  
        firebase.firestore().collection("datosUsuario").doc(res.uid).get().then(resultado => {
          var resp = resultado.data();
          if (res.displayName != null) {
            document.getElementById("1blNombreUsuario").innerHTML = "Bienvenid@: " + res.displayName+" ";
          } else {
            document.getElementById("1blNombreUsuario").innerHTML = "Bienvenid@: " + res.email+" ";
          }
          if (res.photoURL !== null) {
            // Cambiar el ID de la imagen correcto en la siguiente línea
            document.getElementById("imgFotoUsuario").src = res.photoURL;
          } else {
            document.getElementById("imgFotoUsuario").src = "./img/noUsuario.png";
          }
        });
      }
    });
  }
  
  
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