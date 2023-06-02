import { addDoc, collection, updateDoc, doc, deleteDoc, query, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const getSales = async (setSalesData) => {
    const q = query(collection(db, 'sales'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let salesArray = [];
      querySnapshot.forEach((doc) => {
        const { user, customer, dog, entryTime, departureTime, total, date } = doc.data();
        salesArray.push({ id: doc.id, user, customer, dog, entryTime, departureTime, total, date });
      });
      setSalesData(salesArray);
    });
    return () => unsubscribe(); 
}

export const getSaleTotal = async (setTotal, id) => {
  const q = query(collection(db, 'sales'));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let salesArray = [];
    querySnapshot.forEach((doc) => {
      const { total } = doc.data();
      if(doc.id === id)
        setTotal(total)
    });
  });
  return () => unsubscribe(); 
}

export const getSaleByData = async (setSaleid, searchUser, searchCustomer, searchDate) => {
    const q = query(collection(db, 'sales'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { user, customer, date } = doc.data();
        const convertedDate = searchDate.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour12: false,
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          });
        if(user === searchUser && customer === searchCustomer && convertedDate === date){
            console.log("Selected:", doc.id)
            setSaleid(doc.id)
        }
      });
    });
    return () => unsubscribe(); 
}

export const getSaleById = async (setSaleData, id) => {
    const q = query(collection(db, 'sales'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const { user, customer, dog, entryTime, departureTime, total, date } = doc.data();
        if(id === doc.id)
          setSaleData({user, customer, dog, entryTime, departureTime, total, date})
      });
    });
    return () => unsubscribe(); 
}

export const getSoldProducts = async (setSoldProducts, saleid) => {
    const q = query(collection(db, `/sales/${saleid}/products`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let productsArray = [];
      querySnapshot.forEach((doc) => {
        const { product, amount } = doc.data();
        productsArray.push({ id: doc.id,  product, amount});
        });
        setSoldProducts(productsArray);
    });
    return () => unsubscribe(); 
}

export const getSoldServices = async (setSoldServices, saleid) => {
    const q = query(collection(db, `/sales/${saleid}/services`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let servicesArray = [];
      querySnapshot.forEach((doc) => {
        const { service, amount } = doc.data();
        servicesArray.push({ id: doc.id,  service, amount});
        });
        setSoldServices(servicesArray);
    });
    return () => unsubscribe(); 
}

export const addSoldProduct = async (saleid, productid, amount) => {
    await addDoc(collection(db, `/sales/${saleid}/products`), {
        product: productid,
        amount: amount
    })
}

export const addSoldService = async (saleid, serviceid) => {
    await addDoc(collection(db, `/sales/${saleid}/services`), {
        service: serviceid
    })
}

export const createSale = async (user, customer, date)  => {
    const formattedDate = date.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
    await addDoc(collection(db, 'sales'), {
        user: user,
        customer: customer,
        date: formattedDate,
        total: 0
    })
}

export const updateSale = async (id, user, customer, dog)  => {
    await updateDoc(doc(db, 'sales', id), {
        user: user,
        customer: customer,
        dog: dog,
    })
}

export const updateTotalSale = async (id, total)  => {
    await updateDoc(doc(db, 'sales', id), {
        total: total
    })
}

export const deleteSale = async (id) => {
    await deleteDoc(doc(db, 'sales', id))
}

export const deleteSoldProduct = async (saleid, productid) => {
    await addDoc(collection(db, `/sales/${saleid}/products`, productid))
}

export const deleteSoldService = async (saleid, serviceid) => {
    await addDoc(collection(db, `/sales/${saleid}/services`, serviceid))
}