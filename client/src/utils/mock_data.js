import { faker } from '@faker-js/faker';

import { doc, getFirestore, setDoc } from 'firebase/firestore';

import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyBpHtitQxSijv9lW2ly6j438qtpPTUHXko',
    authDomain: 'galeria-pintar-o-7.firebaseapp.com',
    projectId: 'galeria-pintar-o-7',
    storageBucket: 'galeria-pintar-o-7.appspot.com',
    messagingSenderId: '339316639859',
    appId: '1:339316639859:web:78dc9b2895638875de4206',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function generateMockProduct() {
    const pieceInfo = generatePieceInfo();

    return {
        id: faker.string.alphanumeric(10),
        seller: faker.string.alphanumeric(10),
        title: faker.commerce.productName(),
        author: faker.person.fullName(),
        photos: [faker.image.url()],
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        product_type: faker.word.noun(),
        piece_info: pieceInfo,
        published_date: faker.date.past(),
        available: faker.datatype.boolean(0.9),
        featured: faker.datatype.boolean(0.2),
    };
}

function generatePieceInfo() {
    return {
        technique: faker.word.noun(),
        materials: [
            faker.commerce.productMaterial(),
            faker.commerce.productMaterial(),
        ],
        dimensions: {
            height: faker.number.int(300),
            width: faker.number.int(300),
            depth: faker.number.int(10),
            weight: faker.number.int(50),
        },
        year: faker.date.past({ years: 15 }).getFullYear(),
    };
}

function generateMockCustomer() {
    return {
        id: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        profilePicture: faker.image.avatar(),
        activeChatId: [],
        tags: [],
        role: 'customer',
        address: {
            street: faker.location.street(),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: faker.location.country(),
        },
        searchHistory: [],
        favorites: [],
        cart: [],
        interests: [],
    };
}

function generateMockSeller() {
    return {
        id: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        profilePicture: faker.image.avatar(),
        activeChatId: [],
        tags: [],
        role: 'seller',
        about: faker.person.bio(),
        sellerType: faker.person.jobArea(),
    };
}

const writeMocks = async (mockFunc, collection, amount) => {
    for (let i = 0; i < amount; i++) {
        const mock = mockFunc();
        console.log(mock);

        await setDoc(doc(db, collection, mock.id), mock);

        await new Promise((r) => setTimeout(r, 1000));
    }
};

await writeMocks(generateMockSeller, 'users', 20);

await writeMocks(generateMockCustomer, 'users', 20);

await writeMocks(generateMockProduct, 'products', 20);
