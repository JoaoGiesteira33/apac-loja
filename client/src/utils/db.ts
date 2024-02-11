import {
    collection,
    doc,
    DocumentData,
    FirestoreDataConverter,
    getDocs,
    getFirestore,
    query,
    QueryDocumentSnapshot,
    setDoc,
    where,
} from 'firebase/firestore';
import { app, auth } from './firebase';

import { Product } from '../types/product';
import { Customer, Seller, User } from '../types/user';

const converter = <T>(): FirestoreDataConverter<T> => ({
    toFirestore: (data: T): DocumentData => data as DocumentData,
    fromFirestore: (snap: QueryDocumentSnapshot) => {
        const obj = snap.data();
        obj.id = snap.id;
        return obj as T;
    },
});

// helpers
const collectionGeneric = <T>(collectionPath: string) =>
    collection(getFirestore(app), collectionPath).withConverter(converter<T>());
const docGeneric = <T>(docPath: string) =>
    doc(getFirestore(app), docPath).withConverter(converter<T>());

// new entries here
export const db = {
    users: collectionGeneric<User>('users'),
    user: (id: string) => docGeneric<User>(`users/${id}`),

    products: collectionGeneric<Product>('products'),
    product: (id: string) => docGeneric<Product>(`products/${id}`),
};

export const getUserInfo = async (): Promise<Customer | Seller> => {
    console.log(auth.currentUser.uid);
    const q = query(db.users, where('id', '==', auth.currentUser.uid));
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs[0].data();

    switch (user.role) {
        case 'customer':
            return user as Customer;
        case 'seller':
            return user as Seller;
    }
};

export const saveUserInfo = async (user: User): Promise<void> => {
    await setDoc(db.user(user.id), user);
};

export const saveProduct = async (product: Product): Promise<void> => {
    await setDoc(db.product(product.title + product.author), product);
};
