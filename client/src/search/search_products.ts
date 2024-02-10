import { db } from '../utils/db';
import { Product } from '../types/product';
import {
    DocumentData,
    getDocs,
    query,
    QueryDocumentSnapshot,
    where,
} from 'firebase/firestore';

export const searchAvailableProducts = async (
    page: number
): Promise<Product[]> => {
    const q = query(db.products, where('price', '>', 10));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(
        (doc: QueryDocumentSnapshot<Product, DocumentData>): Product =>
            doc.data()
    );
};
