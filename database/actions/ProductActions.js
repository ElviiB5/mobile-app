import { addDoc, collection, updateDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getProducts = async (setProductsData) => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArray = [];
      querySnapshot.forEach((doc) => {
        const { name, description, price, stock } = doc.data();
        productsArray.push({ id: doc.id, name, description, price, stock});
      });
      setProductsData(productsArray);
    });
    return () => unsubscribe(); 
}

export const getProductsByName = async (setProductsData, productName) => {
  const q = query(collection(db, 'products'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let productsArray = [];
    querySnapshot.forEach((doc) => {
      const { name, description, price, stock } = doc.data();
      if(name.includes(productName))
          productsArray.push({ id: doc.id, name, description, price, stock});
    });
    setProductsData(productsArray);
  });
  return () => unsubscribe(); 
}

export const getRunningOutProducts = async (setProductsData) => {
  const q = query(collection(db, 'products'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let productsArray = [];
    querySnapshot.forEach((doc) => {
      const { name, description, price, stock } = doc.data();
      if(stock <= 10)
        productsArray.push({ id: doc.id, name, description, price, stock});
    });
    setProductsData(productsArray);
  });
  return () => unsubscribe(); 
}

export const getProductByName = async (setProductId, selectedName) => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        if(selectedName === name)
            setProductId(doc.id)
      });
    });
    return () => unsubscribe(); 
}

export const createProduct = async (name, description, price, stock)  => {
    await addDoc(collection(db, 'products'), {
        name: name,
        description: description,
        price: price,
        stock: stock
    })
}

export const updateProduct = async (id, name, description, price, stock)  => {
    await updateDoc(doc(db, 'products', id), {
        name: name,
        description: description,
        price: price,
        stock: stock
    })
}

export const updateAddingProductStock = async (id, stock)  => {
    await updateDoc(doc(db, 'products', id), {
        stock: stock
    })
}

export const updateProductStock = async (id, soldAmount)  => {
    const actualStock = await getProductById(id)
    const result = parseInt(actualStock) - parseInt(soldAmount)
    await updateDoc(doc(db, 'products', id), {
        stock: result
    })
}

const getProductById = async (id) => {
  return new Promise((resolve, reject) => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { stock } = doc.data();
        if (id === doc.id) {
          resolve(stock);
        }
      });
    });
    return () => unsubscribe();
  });
}

export const deleteProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id))
}