window.onload=function(){
    verAuth();
    firebase.auth().onAuthStateChanged(resp=>{
        cargarPerfil();
    });
}
var user;

function cambiarFoto(archivo) {
  var file = archivo.files[0];
  var reader = new FileReader();
  reader.onloadend = function() {
    document.getElementById("imgFoto").src = reader.result;
  };
  reader.readAsDataURL(file);
}

function cargarPerfil(){
    user= firebase.auth().currentUser.uid;
    firebase.firestore().collection("datosUsuario").doc(user).get().then(resultado=>{
    var resp= resultado.data();
    document.getElementById("txtname").value=resp.displayName;
    document.getElementById("txtnombre").value=resp.nombre;
    document.getElementById("txtapellido").value=resp.apellido;
    document.getElementById("txtemail").value=resp.email;
    document.getElementById("txttelefono").value=resp.phoneNumber;
    document.getElementById("txtdescripcion").value=resp.descripcion!=undefined ? resp.descripcion:"";
    document.getElementById("imgFoto").src=resp.photoURL;


    }).catch(err=>{
    alert(err);
    })
}
