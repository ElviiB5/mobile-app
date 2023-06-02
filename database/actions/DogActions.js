import { addDoc, collection, updateDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getDogs = async (setDogsData) => {
    const q = query(collection(db, 'dogs'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let dogsArray = [];
      querySnapshot.forEach((doc) => {
        const { name, sex, age, breed, size, owner } = doc.data();
        dogsArray.push({ id: doc.id, name, sex, age, breed, size, owner });
      });
      setDogsData(dogsArray);
    });
    return () => unsubscribe(); 
}

export const getDogById = async (setDogData, id) => {
    const q = query(collection(db, 'dogs'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        if(id === doc.id)
          setDogData(name)
      });
    });
    return () => unsubscribe(); 
}

export const getDogByName = async (setDogId, selectedName) => {
    const q = query(collection(db, 'dogs'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        if(selectedName === name)
          setDogId(doc.id)
      });
    });
    return () => unsubscribe(); 
}

export const createDog = async (name, sex, age, breed, size, owner)  => {
    await addDoc(collection(db, 'dogs'), {
        name: name,
        sex: sex,
        age: age,
        breed: breed,
        size: size,
        owner: owner
    })
}

export const updateDog = async (id, name, sex, age, breed, size, owner)  => {
    await updateDoc(doc(db, 'dogs', id), {
      name: name,
      sex: sex,
      age: age,
      breed: breed,
      size: size,
      owner: owner
    })
}

export const deleteDog = async (id) => {
    await deleteDoc(doc(db, 'dogs', id))
}