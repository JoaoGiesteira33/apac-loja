import { faker } from '@faker-js/faker';


import {
    doc,
    getFirestore,
    setDoc
} from 'firebase/firestore';

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
    const pieceInfo= faker.datatype.boolean() ? generatePieceInfo() : null;

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

// Example usage

for(let i = 0; i<20; i++){
    const mockProduct = generateMockProduct();
    console.log(mockProduct);

    const id = mockProduct.title + mockProduct.author
    
    await setDoc(doc(db, "products", id), mockProduct);

}