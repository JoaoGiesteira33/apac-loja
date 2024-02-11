import { useEffect, useState } from 'react';
import { SellerQuery } from '../types/query';
import { Seller } from '../types/user';
import { DocumentSnapshot } from 'firebase/firestore';
import { searchSellers } from '../search/search_sellers';

export default function useSellerSearch(initialQuery: SellerQuery) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [sellers, setSellers] = useState<Seller[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [last, setLast] = useState<DocumentSnapshot>();
    const [query, setQuery] = useState(initialQuery);

    useEffect(() => {
        setLast(undefined);
        setLoading(true);
        setError(false);

        const fetchData = async () => {
            try {
                const [sellersRes, lastRes] = await searchSellers(query);
                setSellers((prevSellers) => [...prevSellers, ...sellersRes]);
                console.log('Loaded new sellers ', sellersRes);

                setLast(lastRes);
                setHasMore(!!lastRes); // Check if there are more sellers to load
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

    const reloadWithQuery = (newQuery: SellerQuery) => {
        setSellers([]);
        setQuery(newQuery);
    };

    return {
        sellers: sellers,
        loadMore,
        loading,
        error,
        hasMore,
        reloadWithQuery,
    };
}
