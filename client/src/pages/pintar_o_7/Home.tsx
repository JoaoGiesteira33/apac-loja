import React from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import Hero from '../../components/pintar_o_7/Hero';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';

export default function Home() {
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

    return (
        <div>
            <Hero />
            <div className="flex w-full items-center py-12 justify-evenly font-poppins text-black dark:text-white font-normal">
                <MultipleSelectTypes
                    values={selectedTypes}
                    setValues={setSelectedTypes}
                />
                <div className="w-20 flex justify-center">preço</div>
                <div className="w-20 flex justify-center">batatas</div>
            </div>
            <Divider variant="middle" />
            <div className="grid grid-cols-3 gap-6 justify-items-center py-12">
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
                <div className="bg-black w-40 h-40"></div>
            </div>
            <Divider variant="middle" />
        </div>
    );
}
