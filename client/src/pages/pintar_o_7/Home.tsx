import React from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import Hero from '../../components/pintar_o_7/Hero';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';
import Box from '@mui/system/Box';

export default function Home() {
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

    return (
        <Box component="div">
            <Hero />
            <Box
                component="div"
                className="flex w-full items-center py-12 justify-evenly font-poppin font-normal">
                <MultipleSelectTypes
                    values={selectedTypes}
                    setValues={setSelectedTypes}
                />
                <Box component="div" className="w-20 flex justify-center">
                    preço
                </Box>
                <Box component="div" className="w-20 flex justify-center">
                    batatas
                </Box>
            </Box>
            <Divider variant="middle" />
            <Box
                component="div"
                className="grid grid-cols-3 gap-6 justify-items-center py-12">
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
                <Box
                    component="div"
                    className="bg-black dark:bg-white w-40 h-40"></Box>
            </Box>
            <Divider variant="middle" />
        </Box>
    );
}
