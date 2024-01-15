import { useEffect, useState } from 'react';
import axios, { Canceler } from 'axios';
import { API_URL_USER } from '../fetchers';

export default function useArtistSearch(query: object, pageNumber: number) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [artists, setArtists] = useState([]);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        setArtists([]);
    }, [query]);

    useEffect(() => {
        let cancel: Canceler;

        setLoading(true);
        setError(false);

        axios({
            method: 'GET',
            url: API_URL_USER + '/sellers',
            params: {
                page: pageNumber - 1,
                select: 'seller_fields(demographics,profile_picture,about)',
            },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
        })
            .then((res) => {
                setArtists(artists.concat(res.data.results));
                setHasMore(res.data.hasMore);
                console.log('Artists:', artists.concat(res.data.results));
                setLoading(false);
            })
            .catch((e) => {
                // Ignore the error if it's a request cancellation.
                if (axios.isCancel(e)) return;
                //else setError(true);
            });
    }, [pageNumber]);

    return { loading, error, hasMore, artists };
}
