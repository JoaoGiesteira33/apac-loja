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
    const pieceInfo = faker.datatype.boolean() ? generatePieceInfo() : null;

    return {
        seller: faker.string.alphanumeric(10),
        title: faker.commerce.productName(),
        author: faker.person.fullName(),
        photos: [faker.image.url()],
        description: faker.lorem.paragraph(),
        price: parseFloat(faker.commerce.price()),
        product_type: faker.word.noun(),
        piece_info: pieceInfo,
        published_date: faker.date.past(),
    };
}

function generatePieceInfo() {
    return {
        technique: faker.word.noun(),
        materials: [faker.word.noun(), faker.word.noun()],
        dimensions: {
            height: faker.number.int(),
            width: faker.number.int(),
            depth: faker.number.int(),
            weight: faker.number.int(),
        },
        year: faker.number.int(),
        state: faker.word.noun(),
    };
}

function generateMockCustomer() {
    return {
        uid: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        profilePicture: faker.image.url(),
        activeChatId: [],
        tags: [],
        role: 'customer',
        address: {
            street: faker.location.street(),
            postalCode: faker.location.zipCode(),
            city: faker.location.city(),
            country: faker.location.county(),
        },
        searchHistory: [],
        favorites: [],
        cart: [],
        interests: [],
    };
}

function generateMockSeller() {
    return {
        uid: faker.string.alphanumeric(10),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        phone: faker.phone.number(),
        profilePicture: faker.image.url(),
        activeChatId: [],
        tags: [],
        role: 'seller',
        about: faker.person.bio(),
        sellerType: faker.person.jobArea(),
    };
}

const writeMocks = async (mockFunc, idFunc, collection, amount) => {
    for (let i = 0; i < amount; i++) {
        const mock = mockFunc();
        console.log(mock);

        //const id = mockProduct.title + mockProduct.author
        const id = mock.uid;
        console.log(id);

        await setDoc(doc(db, collection, id), mock);
    }
};

await writeMocks(
    generateMockSeller,
    (user) => {
        user.uid;
    },
    'users',
    20
);
