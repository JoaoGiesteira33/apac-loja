import { useEffect, useState } from 'react';
import axios, { Canceler } from 'axios';
import { API_URL_PROD } from '../fetchers';
import { ProductType } from '../types/product';

const MockData: ProductType[] = [];

for (let i = 1; i < 30; i++) {
    const width = Math.floor(Math.random() * 1000) + 200;
    const height = Math.floor(Math.random() * 1000) + 200;

    MockData.push({
        _id: i.toString(),
        _seller: {
            email: 'joao@gmail.com',
            role: 'Boss',
            client_fields: null,
            seller_fields: {
                demographics: {
                    name: 'João',
                    birth_date: new Date(),
                    address: {
                        street: 'Rua do João',
                        postal_code: '1234-123',
                        city: 'Porto',
                        country: 'Portugal',
                    },
                    phone: '912345678',
                },
                statistics: {},
                profile_picture: 'https://picsum.photos/200/300',
                about: 'Fixe',
                seller_type: 'Pintador',
            },
            active_chat_id: [],
            tags: [],
        },
        title: 'O Sol',
        author: 'Zé',
        photos: ['https://picsum.photos/' + width + '/' + height],
        description: 'Retrato do pintor Zé',
        price: 33,
        product_type: 'Quadro',
        piece_info: {
            technique: 'Aguarela',
            material: 'Papel',
            dimensions: {
                height: height,
                width: width,
                depth: 0,
                measure: 'mm',
            },
            year: 2020,
            state: 'Novo',
        },
        book_info: null,
        published_date: new Date(),
    });
}

export default function useProductSearch(query: object, pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    let empty = false;

    useEffect(() => {
        setProducts([]);
        empty = true;
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
                if (empty) {
                    setProducts(res.data.results);
                } else setProducts(products.concat(res.data.results));
                setHasMore(res.data.hasMore);
                setLoading(false);
                console.log('Products:', products.concat(res.data.results));
            })
            .catch((e) => {
                // Ignore the error if it's a request cancellation.
                if (axios.isCancel(e)) return;
                //else setError(true);
            });

        return () => cancel();
    }, [query, pageNumber]);

    return { loading, error, MockData, hasMore, products, setProducts };
}
