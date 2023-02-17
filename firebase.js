
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js"
import { getFirestore, collection, addDoc, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_z0cgFhbCL1FagxUZt3QN05XPthS3ZSk",
  authDomain: "css-art-gallery.firebaseapp.com",
  projectId: "css-art-gallery",
  storageBucket: "css-art-gallery.appspot.com",
  messagingSenderId: "738111879502",
  appId: "1:738111879502:web:4d1e158a239353f681061f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();

//Funciones guardar y listar
async function saveCard(title, description){
  await addDoc(collection(db, 'cards'), {title, description})
  window.location.reload();
}
const listCards = () => getDocs(collection(db,'cards'));

const onListCards = (callback) => { onSnapshot(collection(db, 'cards'), (callback))}

//Funcion eliminar
async function deleteCard(id){
await deleteDoc(doc(db, 'cards', id));
window.location.reload();

}

//Funcion obtener card
const getCard = id => getDoc(doc(db, 'cards', id));

//Funcion edit card
const editCard = async (id, newFields) => {
  await updateDoc(doc(db,'cards', id), newFields);
  window.location.reload();
}

//Creando Storage
const storage = getStorage();

//Referencias
//let emojiRef = ref(storage, 'emojibase.png');
let emoji;


//Funcion subir imagen
function uploadImg(file){
  emoji = file.name;
  //ImagesRef apunta a 'images'
  const imagesRef = ref(storage, 'images');
  //emojiImagesRef apunta a 'images/emojibase'
  const emojiImagesRef = ref(storage, 'images/' + emoji);

  uploadBytes(emojiImagesRef, file).then((snapshot) => {
    console.log(snapshot)
  })
}

//Obtener imagenes
const getImg = async (name) => {
  const emojiImagesRef = ref(storage, 'images/' + name + '.png');
  let img = await getDownloadURL(emojiImagesRef);
  return img;
}

export {saveCard, listCards, onListCards, deleteCard, getCard, editCard, uploadImg, getImg};
