import { db } from '../utils/db';
import { Seller, User } from '../types/user';
import { SellerQuery } from '../types/query';

import {
    DocumentData,
    getDocs,
    orderBy,
    query,
    QueryDocumentSnapshot,
    QuerySnapshot,
    where,
    limit,
    DocumentSnapshot,
    startAfter,
    QueryConstraint,
} from 'firebase/firestore';

export const searchSellers = async (
    sellerQuery: SellerQuery
): Promise<[Seller[], DocumentSnapshot]> => {
    const filters: QueryConstraint[] = [];
    if (sellerQuery.role) {
        filters.push(where('role', '==', sellerQuery.role));
    }
    if (sellerQuery.orderBy) {
        filters.push(orderBy(sellerQuery.orderBy));
    }
    if (sellerQuery.limit) {
        filters.push(limit(sellerQuery.limit));
    }
    if (sellerQuery.startAt) {
        filters.push(startAfter(sellerQuery.startAt));
    }
    console.log('Firebase filters: ', filters);

    const q = query(db.users, ...filters);

    let querySnapshot: QuerySnapshot;
    try {
        querySnapshot = await getDocs(q);
    } catch (error) {
        console.log('ERROR FETCHING SELLERS, ', error);
        return null;
    }

    console.log('Firebase response: ', querySnapshot.docs);

    return [
        querySnapshot.docs.map(
            (doc: QueryDocumentSnapshot<User, DocumentData>): Seller =>
                doc.data() as Seller
        ),
        querySnapshot.docs[querySnapshot.docs.length - 1],
    ];
};
