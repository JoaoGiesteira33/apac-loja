import { useEffect, useState } from 'react';
import axios, { Canceler } from 'axios';
import { API_URL_PROD } from '../fetchers';

const MockData: {
    id: number;
    name: string;
    price: number;
    description: string;
    photos: [string];
}[] = [];

for (let i = 1; i < 30; i++) {
    const width = Math.floor(Math.random() * 1000) + 200;
    const height = Math.floor(Math.random() * 1000) + 200;

    MockData.push({
        id: i,
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 1000) + 100,
        description: `This is product ${i}`,
        photos: [`https://picsum.photos/${width}/${height}`],
    });
}

export default function useProductSearch(
    query: object,
    pageNumber: number,
    substitute?: string
) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setProducts([]);
    }, [query]);

    useEffect(() => {
        let cancel: Canceler;

        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            url: API_URL_PROD,
            params: { page: pageNumber - 1, ...query }, //Limit é opcional, default=28
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                if (substitute) setProducts(res.data.results);
                else setProducts(products.concat(res.data.results));

                setHasMore(res.data.hasMore);
                setLoading(false);
                console.log('Products:', products.concat(res.data.results));
            })
            .catch((e) => {
                // Ignore the error if it's a request cancellation.
                if (axios.isCancel(e)) return;
                //else setError(true);
            });
    }, [query, pageNumber]);

    return { loading, error, MockData, hasMore, products };
}
