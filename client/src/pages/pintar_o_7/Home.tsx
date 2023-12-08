import React from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import Hero from '../../components/pintar_o_7/Hero';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';

export default function Home() {
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

    const handleSelectedTypesChange = (
        event: SelectChangeEvent<typeof selectedTypes>
    ) => {
        const {
            target: { value },
        } = event;
        setSelectedTypes(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <div>
            <Hero />
            <div className="flex w-full items-center py-12 justify-evenly font-poppins text-black dark:text-white font-normal">
                <MultipleSelectTypes handleChange={handleSelectedTypesChange} values={selectedTypes}/>
                <div className="w-20 flex justify-center">tipo</div>
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
