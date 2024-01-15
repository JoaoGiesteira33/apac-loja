export type Address = {
    street: string;
    postal_code: string;
    city: string;
    country: string;
};

export type Demographics = {
    name: string;
    birth_date: Date;
    address: Address;
    phone: string;
};

export type Statistics = {};
export type SellerFields = {
    demographics: Demographics;
    statistics: Statistics;
    profile_picture: string;
    about: string;
    seller_type: string;
};

export type ClientFields = {
    demographics: Demographics;
    statistics: Statistics;
    search_history: string[];
    favorites: string[];
    cart: string[];
    interests: string[];
};

export interface User {
    email: string;
    role: string;
    client_fields: ClientFields | null;
    seller_fields: SellerFields | null;
    active_chat_id: string[];
    tags: string[];
}
