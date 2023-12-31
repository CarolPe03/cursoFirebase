
window.onload=function(){
    verAuth();
}
function iniciarSesion() {
    var email = document.getElementById("txtcorreoIngresar").value;
    var password = document.getElementById("txtcotraIngresar").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
   
            document.location.href="./misPrestamos.html";
            //Imagen
            if (res.user.photoURL!=null) {
               document.getElementById(imgFotoUsuario).src=res.user.photoURL;
            }else{
                document.getElementById(imgFotoUsuario).src="./img/noUsuario.png";
            }
        })
        .catch(err => {
          console.error(err);
          document.getElementById("alertErrorLogueo").style.display="block";
          document.getElementById("alertErrorLogueo").innerHTML=err;
        });
}
function abrirModalRegistro(){
    document.getElementById("alertaErrorRegistro").style.display="block";
    document.getElementById("alertaErrorRegistro").innerHTML=""

}
function createUser() {
    var name = document.getElementById("txtname").value;
    var email = document.getElementById("txtcorreo").value;
    var password = document.getElementById("txtcontra").value;
    
    if (name == "") {
      document.getElementById("alertaErrorRegistro").style.display = "block";
      document.getElementById("alertaErrorRegistro").innerHTML = "Debe ingresar un nombre";
      return;
    }
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        var usuario = res.user;
        return res.user.updateProfile({
          displayName: name
        }).then(() => {
          alert("Se registró correctamente");
          document.getElementById("btnCancelar").click();
          // CERRAR SESION
          firebase.auth().signOut();
          // Guardo información en la base de datos
          return firebase.firestore().collection("datosUsuario").doc(usuario.uid)
            .set({
              nombre: "",
              apellido: "",
              email: email,
              displayName: usuario.displayName,
              photoURL: usuario.photoURL,
              provider: res.additionalUserInfo.providerId,
              phoneNumber: usuario.phoneNumber == null ? "" : usuario.phoneNumber,
              descripcion: ""
            }).then(() => {
              document.location.href = "./index.html";
            }).catch(err => {
              alert(err);
            });
        });
      })
      .catch(err => {
        alert(err);
      });
  }
function authGoogle(){
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res=>{
        var user=res.user;
        return firebase.firestore().collection("datosUsuarios").doc(user.uid)
        .get().then(el=>{
            var inf=el.data();
            if(inf==null  || inf==inderfined ){
                //Es su primera vez
                return firebase.firestore().collection("datosUsuario").doc(user.uid).set({
                    nombre: res.additionalUserInfo.profile.given_name,
                    apellido: res.additionalUserInfo.profile.family_name,
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    provider: res.additionalUserInfo.providerId,
                    phoneNumber: user.phoneNumber==null ? "": user.phoneNumber,
                    descripcion:""
                }).then(respuesta=>{
                    document.location.href="./misPrestamos.html"
                }).catch(err=>{
                    alert("Ocurrio un error al registrar en la bd")
                })
            }else{
                //Ya existe(no registro bd el usario)
            document.location="/misPrestamos.html"
            }
        })
        console.log(res);
        document.location.href="./misPrestamos.html";
    }).catch(err=>{
        alert(err);
    });
}
function authGit() {
    const providerGithub = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(providerGithub).then(res => {
      return firebase.firestore().collection("datosUsuario").doc(res.user.uid)
        .get().then(el => {
          var inf = el.data();
          if (inf == null || inf == undefined) {
            // No existe bd
            var userName = res.additionalUserInfo.username;
            return firebase.firestore().collection("datosUsuario").doc(res.user.uid)
              .set({
                nombre: "",
                apellido: "",
                email: res.user.email,
                displayName: userName,
                photoURL: res.user.photoURL,
                provider: res.additionalUserInfo.providerId,
                phoneNumber: res.user.phoneNumber,
                descripcion: ""
              }).then(() => {
                document.location.href = "./misPrestamos.html";
              }).catch(err => {
                alert(err);
              });
          } else {
            document.location.href = "./misPrestamos.html";
          }
        })
        .catch(err => {
          alert(err);
        });
    });
  }
  function authFacebook() {
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(providerFacebook).then(res => {
      var user = res.user;
      return firebase.firestore().collection("datosUsuario").doc(res.user.uid)
        .get().then(el => {
          var inf = el.data();
          var userName = res.additionalUserInfo.username;
  
          if (inf == null || inf == undefined) {
            // Registrar
            return firebase.firestore().collection("datosUsuario").doc(res.user.uid)
              .set({
                nombre: "",
                apellido: "",
                email: user.email,
                displayName: res.additionalUserInfo.username || "",
                photoURL: res.user.photoURL,
                provider: res.additionalUserInfo.providerId,
                phoneNumber: res.user.phoneNumber,
                descripcion: ""
              }).then(() => {
                document.location.href = "./misPrestamos.html";
              }).catch(err => {
                alert(err);
              });
          } else {
            document.location.href = "./misPrestamos.html";
          }
        }).catch(err => {
          alert(err);
        });
    });
  }
  
  