import { useEffect, useState } from 'react';
import { searchProducts } from '../search/search_products';
import { Product } from '../types/product';
import { ProductQuery } from '../types/query';
import { DocumentSnapshot } from 'firebase/firestore';

export default function useProductSearch(initialQuery: ProductQuery) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [last, setLast] = useState<DocumentSnapshot>();
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        setLast(undefined);
        setLoading(true);
        setError(false);

        const fetchData = async () => {
            try {
                const [productsRes, lastRes] = await searchProducts(query);
                setProducts((prevProducts) => [
                    ...prevProducts,
                    ...productsRes,
                ]);
                console.log('Loaded new products ', productsRes);

                setLast(lastRes);
                setHasMore(!!lastRes); // Check if there are more products to load
                setLoading(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };

        fetchData();

        // Clean-up function
        return () => {
            // You can perform any clean-up here if necessary
        };
    }, [query]); // Trigger fetch whenever the query changes

    const loadMore = () => {
        if (!loading && hasMore && last) {
            setQuery({ ...query, startAt: last });
        }
    };

    const reloadWithQuery = (newQuery: ProductQuery) => {
        setProducts([]);
        setQuery(newQuery);
    };

    return { products, loadMore, loading, error, hasMore, reloadWithQuery };
}
