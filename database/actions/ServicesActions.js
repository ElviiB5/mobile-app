import { addDoc, collection, updateDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getServices = async (setServicesData) => {
    const q = query(collection(db, 'services'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let servicesArray = [];
      querySnapshot.forEach((doc) => {
        const { name, description, price } = doc.data();
        servicesArray.push({ id: doc.id, name, description, price });
      });
      setServicesData(servicesArray);
    });
    return () => unsubscribe(); 
}

export const getServicesByName = async (setServicesData, serviceName) => {
  const q = query(collection(db, 'services'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let servicesArray = [];
    querySnapshot.forEach((doc) => {
      const { name, description, price } = doc.data();
      if(name.includes(serviceName))
          servicesArray.push({ id: doc.id, name, description, price});
    });
    setServicesData(servicesArray);
  });
  return () => unsubscribe(); 
}

export const getServiceById = async (setServiceData, id) => {
    const q = query(collection(db, 'services'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name, description, price } = doc.data();
        if(id === doc.id)
            setServiceData({ name, description, price })
      });
    });
    return () => unsubscribe(); 
}

export const getServiceByName = async (setServiceId, selectedName) => {
    const q = query(collection(db, 'services'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        if(selectedName === name)
            setServiceId(doc.id)
      });
    });
    return () => unsubscribe(); 
}

export const createService = async (name, description, price)  => {
    await addDoc(collection(db, 'services'), {
        name: name,
        description: description,
        price: price
    })
}

export const updateService = async (id, name, description, price)  => {
    await updateDoc(doc(db, 'services', id), {
        name: name,
        description: description,
        price: price
    })
}

export const deleteServices = async (id) => {
    await deleteDoc(doc(db, 'services', id))
}