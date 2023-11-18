export default function ProductThumbnail2({ product }) {
    return (
        <div className="flex flex-col bg-white rounded shadow overflow-hidden transform transition-transform duration-200 hover:scale-105">
            <div className="h-48 flex-shrink-0">
                <img
                    className="w-full h-full object-cover"
                    src={product.image}
                    alt={product.title}
                />
            </div>
            <div className="p-4 flex-1">
                <h3 className="text-lg font-semibold leading-6">
                    {product.title}
                </h3>
                <h4 className=" font-light leading-6">{product.artist}</h4>
                <h3 className="mt-4 text-lg font-semibold">{product.price}€</h3>
            </div>
        </div>
    );
}
