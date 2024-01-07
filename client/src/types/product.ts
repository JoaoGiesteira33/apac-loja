export type ProductType = {
    _id: string;
    title: string;
    author: string;
    photos: string[];
    description: string;
    price: number;
    product_type: string;
    piece_info: PieceInfo | null;
    book_info: BookInfo | null;
    //rating: number,     // [0-5]
    //reviews: Review[],
};

/*type Review = {
    id: number,
    user: string,
    rating: number,
    comment: string,
}*/

type PieceInfo = {
    technique: string;
    material: string;
    dimensions: Dimensions;
    year: number;
    state: string;
};

type BookInfo = {
    publisher: string;
    genre: string;
    stock: number;
    isbn: string; // International Standard Book Number
};

type Dimensions = {
    height: number;
    width: number;
    depth: number;
    measure: string; //{cm, mm, in, ft ...}
};
