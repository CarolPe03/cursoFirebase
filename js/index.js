
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
    if(name==""){
        document.getElementById("alertaErrorRegistro").style.display="block";
        document.getElementById("alertaErrorRegistro").innerHTML="Debe ingresar un nombre"
return;    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            return res.user.updateProfile({
                displayName: name
            });
        })
        .then(profile => {
            alert("Se registró correctamente");
            document.getElementById("btnCancelar").click();
            //CERRAR SESION
            firebase.auth().signOut();
        })
        .catch(err => {
            alert("Ocurrió un error");
        });
}
function authGoogle(){
    const providerGoogle = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res=>{
        console.log(res);
        document.location.href="./misPrestamos.html";
    }).catch(err=>{
        alert(err);
    });
}
function authGit(){
    const providerGithub = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(providerGithub).then(res=>{
        console.log(res);
        document.location.href="./misPrestamos.html";
    }).catch(err=>{
        alert(err);
    });
}
function authFacebook(){
    const providerFacebook = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithPopup(providerFacebook).then(res=>{
        console.log(res);
        document.location.href="./misPrestamos.html";
    }).catch(err=>{
        alert(err);
    });
}