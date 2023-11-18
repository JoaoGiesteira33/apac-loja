import Carousel from 'react-multi-carousel';
import { ProductType } from '../../types/product';
import ProductThumbnail from '../ProductThumbnail';
import 'react-multi-carousel/lib/styles.css';
import './styles.css';

export default function ProductCarousel(props: {
    title: string;
    deviceType: string;
}) {
    const items: ProductType[] = [
        {
            id: 1,
            title: 'Title1',
            author: 'Author1',
            thumbnailPhoto: 'https://picsum.photos/700/700',
            photos: ['https://picsum.photos/700/700'],
            price: 10,
            description: 'Description1',
            stock: 1,
            product_type: 'product_type1',
        },
        {
            id: 2,
            title: 'Title2',
            author: 'Author2',
            thumbnailPhoto: 'https://picsum.photos/400/500',
            photos: ['https://picsum.photos/400/500'],
            price: 20,
            description: 'Description2',
            stock: 2,
            product_type: 'product_type2',
        },
        {
            id: 3,
            title: 'Title3',
            author: 'Author3',
            thumbnailPhoto: 'https://picsum.photos/800/600',
            photos: ['https://picsum.photos/800/600'],
            price: 30,
            description: 'Description3',
            stock: 3,
            product_type: 'product_type3',
        },
        {
            id: 4,
            title: 'Title4',
            author: 'Author4',
            thumbnailPhoto: 'https://picsum.photos/800/400',
            photos: ['https://picsum.photos/800/400'],
            price: 40,
            description: 'Description4',
            stock: 4,
            product_type: 'product_type4',
        },
        {
            id: 5,
            title: 'Title5',
            author: 'Author5',
            thumbnailPhoto: 'https://picsum.photos/450/400',
            photos: ['https://picsum.photos/450/400'],
            price: 50,
            description: 'Description5',
            stock: 5,
            product_type: 'product_type5',
        },
    ];
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
            partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            partialVisibilityGutter: 30, // this is needed to tell the amount of px that should be visible.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
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
                deviceType={props.deviceType}
                containerClass="my-container-class"
                itemClass="my-item-class">
                {items.map((item) => (
                    <ProductThumbnail key={item.id} product={item} />
                ))}
            </Carousel>
        </>
    );
}
