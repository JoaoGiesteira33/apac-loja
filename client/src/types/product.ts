export type ProductType = {
    id: number;
    title: string;
    author: string;
    thumbnailPhoto: string;
    photos: string[];
    price: Price;
    description: string;
    stock: number;
    product_type: string;
    piece_info: PieceInfo | null;
    book_info: BookInfo | null;
    //rating: number,     // [0-5]
    //reviews: Review[],
};

type Price = {
    //amount: Map<string, number>, // {EUR: 10, USD: 12, GBP: 8}
    amount: { [key: string]: number }; // {EUR: 10, USD: 12, GBP: 8
    //amount: {EUR: number, USD: number, GBP: number,}
    discount: number; // [-0%, -10%, -15%, -25%, -50%]
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
};

type BookInfo = {
    publisher: string;
    genre: string;
    language: string;
    isbn: string; // International Standard Book Number
    ean: string; // European Article Number
    dimensions: Dimensions;
    bookBinding: string; //{hardcover, softcover, spiral, other}
    pages: number;
    dateOfPublication: string;
    ageRestriction: string; //{0+, 6+, 12+, 16+, 18+ or 0, 6, 12, 16, 18}
};

type Dimensions = {
    height: number;
    width: number;
    depth: number;
    measure: string; //{cm, mm, in, ft ...}
};
