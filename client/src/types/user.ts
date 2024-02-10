interface Address {
    street: string;
    postalCode: string;
    city: string;
    country: string;
}

interface CommonUserFields {
    id: string;
    email: string;
    name: string;
    birthDate: Date;
    phone: string;
    profilePicture: string | null;
    activeChatId: string[];
    tags: string[];
}

interface CustomerFields {
    role: 'customer';
    address: Address;
    searchHistory: string[];
    favorites: string[];
    cart: string[];
    interests: string[];
}

interface SellerFields {
    role: 'seller';
    about: string;
    sellerType: string;
}

type UserRole = CustomerFields | SellerFields;

export type User = CommonUserFields & UserRole;

export type Customer = CommonUserFields & CustomerFields;

export type Seller = CommonUserFields & SellerFields;

export function newCustomer(
    id: string,
    email: string,
    name: string,
    birthDate: Date,
    phone: string,
    address: Address
): Customer {
    return {
        id: id,
        email: email,
        name: name,
        birthDate: birthDate,
        phone: phone,
        profilePicture: '',
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
