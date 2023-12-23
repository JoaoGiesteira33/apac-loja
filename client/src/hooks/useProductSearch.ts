import { useEffect, useState } from 'react';
import axios, { Canceler } from 'axios';

export default function useProductSearch(query: string, pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setProducts([]);
    }, [query])

    useEffect(() => {
        let cancel: Canceler;

        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            url: 'http://localhost:5000/api/products',
            params: { q: query, _page: pageNumber, _limit: 10 },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                console.log(res);
                //setProducts((prevProducts) => {
                //   return [...prevProducts, ...res.data];
                //});
                //setHasMore(res.data.length > 0);
                setLoading(false);
            })
            .catch((e) => {
                // Ignore the error if it's a request cancellation.
                if (axios.isCancel(e)) return;
                else setError(true);
            });

        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, products, hasMore };
}
