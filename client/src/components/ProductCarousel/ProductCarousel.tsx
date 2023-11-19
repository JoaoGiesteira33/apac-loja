import Carousel from 'react-multi-carousel';
import { ProductType } from '../../types/product';
import ProductThumbnail from '../ProductThumbnail';
import 'react-multi-carousel/lib/styles.css';
import './styles.css';

export default function ProductCarousel(props: { title: string }) {
    const items: ProductType[] = [
        {
            id: 1,
            title: 'Title1',
            author: 'Author1',
            thumbnailPhoto: 'https://picsum.photos/700/700',
            photos: ['https://picsum.photos/700/700'],
            price: {
                amount: { EUR: 10 },
                discount: 0,
            },
            description: 'Description1',
            stock: 1,
            product_type: 'product_type1',
            piece_info: null,
            book_info: null,
        },
        {
            id: 2,
            title: 'Title2',
            author: 'Author2',
            thumbnailPhoto: 'https://picsum.photos/400/500',
            photos: ['https://picsum.photos/400/500'],
            price: {
                amount: { EUR: 20 },
                discount: 0,
            },
            description: 'Description2',
            stock: 2,
            product_type: 'product_type2',
            piece_info: null,
            book_info: null,
        },
        {
            id: 3,
            title: 'Title3',
            author: 'Author3',
            thumbnailPhoto: 'https://picsum.photos/800/600',
            photos: ['https://picsum.photos/800/600'],
            price: {
                amount: { EUR: 30 },
                discount: 0,
            },
            description: 'Description3',
            stock: 3,
            product_type: 'product_type3',
            piece_info: null,
            book_info: null,
        },
        {
            id: 4,
            title: 'Title4',
            author: 'Author4',
            thumbnailPhoto: 'https://picsum.photos/800/400',
            photos: ['https://picsum.photos/800/400'],
            price: {
                amount: { EUR: 40 },
                discount: 0,
            },
            description: 'Description4',
            stock: 4,
            product_type: 'product_type4',
            piece_info: null,
            book_info: null,
        },
        {
            id: 5,
            title: 'Title5',
            author: 'Author5',
            thumbnailPhoto: 'https://picsum.photos/450/400',
            photos: ['https://picsum.photos/450/400'],
            price: {
                amount: { EUR: 50 },
                discount: 0,
            },
            description: 'Description5',
            stock: 5,
            product_type: 'product_type5',
            piece_info: null,
            book_info: null,
        },
        {
            id: 6,
            title: 'Title6',
            author: 'Author6',
            thumbnailPhoto: 'https://picsum.photos/450/400',
            photos: ['https://picsum.photos/450/400'],
            price: {
                amount: { EUR: 60 },
                discount: 0,
            },
            description: 'Description6',
            stock: 6,
            product_type: 'product_type6',
            piece_info: null,
            book_info: null,
        },
        {
            id: 7,
            title: 'Title7',
            author: 'Author7',
            thumbnailPhoto: 'https://picsum.photos/450/400',
            photos: ['https://picsum.photos/450/400'],
            price: {
                amount: { EUR: 70 },
                discount: 0,
            },
            description: 'Description7',
            stock: 7,
            product_type: 'product_type7',
            piece_info: null,
            book_info: null,
        },
        {
            id: 8,
            title: 'Title8',
            author: 'Author8',
            thumbnailPhoto: 'https://picsum.photos/450/400',
            photos: ['https://picsum.photos/450/400'],
            price: {
                amount: { EUR: 80 },
                discount: 0,
            },
            description: 'Description8',
            stock: 8,
            product_type: 'product_type8',
            piece_info: null,
            book_info: null,
        },
        {
            id: 9,
            title: 'Title9',
            author: 'Author9',
            thumbnailPhoto: 'https://picsum.photos/450/400',
            photos: ['https://picsum.photos/450/400'],
            price: {
                amount: { EUR: 90 },
                discount: 0,
            },
            description: 'Description9',
            stock: 9,
            product_type: 'product_type9',
            piece_info: null,
            book_info: null,
        },
    ];
    const responsive = {
        desktop0: {
            breakpoint: { max: 20000, min: 1800 },
            items: 7,
            partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
        },
        desktop1: {
            breakpoint: { max: 1800, min: 1500 },
            items: 6,
            partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
        },
        desktop2: {
            breakpoint: { max: 1500, min: 1200 },
            items: 5,
            partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
        },
        desktop3: {
            breakpoint: { max: 1200, min: 900 },
            items: 4,
            partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
        },
        desktop4: {
            breakpoint: { max: 900, min: 600 },
            items: 3,
            partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
            breakpoint: { max: 600, min: 300 },
            items: 2,
            partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
        },
        mobile: {
            breakpoint: { max: 300, min: 0 },
            items: 1,
            partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
        },
    };

    return (
        <>
            <h2 className="text-2xl">{props.title}</h2>
            <Carousel
                responsive={responsive}
                draggable={false}
                partialVisible={true}
                keyBoardControl={true}
                containerClass="my-container-class"
                itemClass="my-item-class">
                {items.map((item) => (
                    <ProductThumbnail key={item.id} product={item} />
                ))}
            </Carousel>
        </>
    );
}
