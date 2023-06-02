import { addDoc, collection, updateDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getCustomers = async (setCustomersData) => {
    const q = query(collection(db, 'customers'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let customerssArray = [];
      querySnapshot.forEach((doc) => {
        const { name, address, phone } = doc.data();
        customerssArray.push({ id: doc.id, name, address, phone });
      });
      setCustomersData(customerssArray);
    });
    return () => unsubscribe(); 
}

export const getCustomerById = async (setCustomerData, id) => {
    const q = query(collection(db, 'customers'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name, address, phone } = doc.data();
        if(id === doc.id)
            setCustomerData({name, address, phone})
      });
    });
    return () => unsubscribe(); 
}

export const getCustomerByName = async (setCustomerId, selectedName) => {
    const q = query(collection(db, 'customers'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        if(selectedName === name)
            setCustomerId(doc.id)
      });
    });
    return () => unsubscribe(); 
}

export const createCustomer = async (name, address, phone)  => {
    await addDoc(collection(db, 'customers'), {
        name: name,
        address: address,
        phone: phone
    })
}

export const updateCustomer = async (id, name, address, phone)  => {
    console.log("this is name",name)
    console.log("this is address",address)
    console.log("this is phone",phone)
    await updateDoc(doc(db, 'customers', id), {
        name: name,
        address: address,
        phone: phone
    })
}

export const deleteCustomer = async (id) => {
    await deleteDoc(doc(db, 'customers', id))
}