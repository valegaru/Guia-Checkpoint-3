import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; //Importar los modulos
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore'; //Importar funciones para agregar info a la db
import { Product } from '../types/products';

const firebaseConfig = {
	apiKey: 'AIzaSyBYbGMD0aW7X5vbeJ2jSI9oZfm57ltn1QI',
	authDomain: 'labs-9a0f6.firebaseapp.com',
	projectId: 'labs-9a0f6',
	storageBucket: 'labs-9a0f6.appspot.com',
	messagingSenderId: '909162520072',
	appId: '1:909162520072:web:6c5a6b47b5d7145472bbbd',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);


export const addProduct = async (product: Omit<Product, "id">) => {
  try {
    //agrega un documento en la collection products
    const where = collection(db, "products");
    await addDoc(where, product);
    console.log("se añadió con éxito");
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async () => {
  //saca los documentos de la collection products y les toma una foto guardandolos en la constante
  const querySnapshot = await getDocs(collection(db, "products"));
  const arrayProducts: Array<Product> = [];

  //recorre lo que se guardo
  querySnapshot.forEach((doc) => {
    //no trae el id
    const data= doc.data() as any;
    arrayProducts.push({ id: doc.id, ...data });
  });

  return arrayProducts;
};

export default {
  addProduct,
  getProducts,
};
