import { DocumentSnapshot } from 'firebase/firestore';

export type Product = {
    id: string;
    seller: string;
    title: string;
    author: string;
    photos: string[];
    description: string;
    price: number;
    product_type: string;
    piece_info: PieceInfo | null;
    // book_info: BookInfo | null;
    published_date: Date;
    //rating: number,     // [0-5]
    //reviews: Review[],
    available: boolean;
    featured: boolean;
};

/*type Review = {
    id: number,
    user: string,
    rating: number,
    comment: string,
}*/

export type PieceInfo = {
    technique: string;
    materials: string[];
    dimensions: Dimensions;
    year: number;
    state: string;
};

// type BookInfo = {
//     publisher: string;
//     genre: string;
//     stock: number;
//     isbn: string; // International Standard Book Number
// };

type Dimensions = {
    height: number;
    width: number;
    depth: number;
    weight: number;
};
