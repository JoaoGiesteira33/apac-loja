
// Replace the following import with the actual library you are using for Firebase
// export type Address = {
//     street: string;
//     postal_code: string;
//     city: string;
//     country: string;
// };

// export type PersonalInfo = {
//     name: string;
//     birth_date: Date;
//     address: Address;
//     phone: string;
// };

// export type SellerFields = {
//     about: string;
//     seller_type: string;
// };

// export type ClientFields = {
//     search_history: string[];
//     favorites: string[];
//     cart: string[];
//     interests: string[];
// };

// export type User = {
//     uid: string;
//     email: string;
//     role: string;
//     personal_info?: PersonalInfo;
//     profile_picture?: string;
//     client_fields?: ClientFields;
//     seller_fields?: SellerFields;
//     active_chat_id?: string[];
//     tags?: string[];
// }
// class Address {
//     constructor(public street: string, public postalCode: string, public city: string, public country: string) { }
// }

// class SellerFields {
//     constructor(public about: string, public sellerType: string) { }
// }

// class ClientFields {
//     constructor(public searchHistory: string[], public favorites: string[], public cart: string[], public interests: string[]) { }
// }

// export class User {
//     constructor(
//         public uid: string,
//         public email: string,
//         public role: "customer" | "seller" | "admin",
//         public name: string,
//         public birthDate: Date,
//         public address: Address,
//         public phone: string,
//         public profilePicture: string | null,
//         public activeChatId: string[],
//         public tags: string[]
//     ) { }

// }

// export class Customer extends User {
//     clientFields: ClientFields;
//     constructor(
//         uid: string,
//         email: string,
//         name: string,
//         birthDate: Date,
//         address: Address,
//         phone: string,
//         profilePicture: string | null,
//     ) {
//         super(uid, email, "customer", name, birthDate, address, phone, profilePicture, null, [], []);
//         this.clientFields = new ClientFields([], [], [], []);
//     }
// }

// export class Seller extends User {
//     sellerFields: SellerFields;
//     constructor(
//         uid: string,
//         email: string,
//         name: string,
//         birthDate: Date,
//         address: Address,
//         phone: string,
//         profilePicture: string | null,
//         about: string,
//         sellerType: string
//     ) {
//         super(uid, email, "customer", name, birthDate, address, phone, profilePicture, null, [], []);
//         this.sellerFields = new SellerFields(about, sellerType);
//     }
// }

interface Address {
    street: string;
    postalCode: string;
    city: string;
    country: string;
}

interface CommonUserFields {
    uid: string;
    email: string;
    name: string;
    birthDate: Date;
    phone: string;
    profilePicture: string | null;
    activeChatId: string[];
    tags: string[];
}

interface CustomerFields {
    role: "customer";
    address: Address;
    searchHistory: string[];
    favorites: string[];
    cart: string[];
    interests: string[];
}

interface SellerFields {
    role: "seller";
    about: string;
    sellerType: string;
}

type UserRole = CustomerFields | SellerFields;

export type User = CommonUserFields & UserRole;

export type Customer = CommonUserFields & CustomerFields;

export type Seller = CommonUserFields & SellerFields;

export function newCustomer(
    uid: string,
    email: string,
    name: string,
    birthDate: Date,
    phone: string,
    address: Address,
): Customer {
    return {
        uid: uid,
        email: email,
        name: name,
        birthDate: birthDate,
        phone: phone,
        profilePicture: "",
        activeChatId: [],
        tags: [],
        role: 'customer',
        address,
        searchHistory: [],
        favorites: [],
        cart: [],
        interests: [],
    };
}