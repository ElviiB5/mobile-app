import { addDoc, collection, updateDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getUsers = async (setUsersData) => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let usersArray = [];
      querySnapshot.forEach((doc) => {
        const { name, address, phone, rol } = doc.data();
        usersArray.push({ id: doc.id, name, address, phone, rol });
      });
      setUsersData(usersArray);
    });
    return () => unsubscribe(); 
}

export const getUsersWithPassword = async (setUsersData) => {
  const q = query(collection(db, 'users'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let usersArray = [];
    querySnapshot.forEach((doc) => {
      const { name, address, phone, rol, password } = doc.data();
      usersArray.push({ id: doc.id, name, address, phone, rol, password });
    });
    setUsersData(usersArray);
  });
  return () => unsubscribe(); 
}

export const getUserById = async (setUserData, id) => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name, address, phone, rol } = doc.data();
        if(id === doc.id)
            setUserData({name, address, phone, rol})
      });
    });
    return () => unsubscribe(); 
}

export const userLogin = async (setLogin, typedName, typedPassword) => {
    console.log("UserActions", typedName)
    console.log("PasswordActions", typedPassword)
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name, password, rol } = doc.data();
        if(typedName === name && typedPassword === password){
          console.log("FOUND!!")
          setLogin({id: doc.id, name, rol})
        }
      });
    });
    return () => unsubscribe(); 
}

export const getUserByName = async (setUserId, selectedName) => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { name } = doc.data();
        if(selectedName === name)
            setUserId(doc.id)
      });
    });
    return () => unsubscribe(); 
}

export const createUser = async (name, address, phone, rol, password)  => {
    await addDoc(collection(db, 'users'), {
        name: name,
        address: address,
        phone: phone,
        rol: rol,
        password: password
    })
}

export const updateUser = async (id, name, address, phone, rol)  => {
    await updateDoc(doc(db, 'users', id), {
        name: name,
        address: address,
        phone: phone,
        rol: rol
    })
}

export const updatePassword = async (id, password)  => {
    await updateDoc(doc(db, 'users', id), {
        password: password
    })
}

export const deleteUser = async (id) => {
    await deleteDoc(doc(db, 'users', id))
}