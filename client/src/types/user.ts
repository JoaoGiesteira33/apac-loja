
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
class Address {
    constructor(public street: string, public postalCode: string, public city: string, public country: string) { }
}

class PersonalInfo {
    constructor(public name: string, public birthDate: Date, public address: Address, public phone: string) { }
}

class SellerFields {
    constructor(public about: string, public sellerType: string) { }
}

class ClientFields {
    constructor(public searchHistory: string[], public favorites: string[], public cart: string[], public interests: string[]) { }
}

export class User {
    constructor(
        public uid: string,
        public email: string,
        public role: "customer" | "seller" | "admin",
        public personalInfo: PersonalInfo,
        public profilePicture: string | null,
        public customerFields: ClientFields | null,
        public sellerFields: SellerFields | null,
        public activeChatId: string[],
        public tags: string[]
    ) { }

}