// import { useState } from 'react';

type Artist = {
    id: string;
    image: string;
    name: string;
    biography: string;
    city: string;
    products_selling: string[];
    products_sold: string[];
};

export default function Artist() {
    //const [artist, setArtist] = useState<Artist>();

    return (
        <div>
            <h1>Artist</h1>
        </div>
    );
}
