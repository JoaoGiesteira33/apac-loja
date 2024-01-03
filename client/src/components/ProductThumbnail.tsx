import { Divider } from '@mui/material';
import { ProductType } from '../types/product';

export default function ProductThumbnail(props: { product: ProductType }) {
    console.log(props.product);
    return (
        <div className="flex bg-[#EFF0F6] flex-col rounded shadow overflow-hidden transform transition-transform duration-200 hover:scale-105">
            <div className="h-48 flex justify-center p-4 rounded-lg flex-shrink-0">
                <img
                    className="w-auto h-full border-2 border-[#a0a3bd] object-cover"
                    src={props.product.photos[0]}
                    alt={props.product.title}
                />
            </div>
            <Divider variant="middle" />
            <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold leading-6">
                    {props.product.title}
                </h3>
                <h4 className=" font-light leading-6">
                    {props.product.author}
                </h4>
                <h3 className="mt-4 text-lg font-semibold">
                    {props.product.price}€
                </h3>
            </div>
        </div>
    );
}
