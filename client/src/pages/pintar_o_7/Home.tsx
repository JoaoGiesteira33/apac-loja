import React from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import Divider from '@mui/material/Divider';

import Hero from '../../components/pintar_o_7/Hero';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';
import Box from '@mui/system/Box';
import Stack from '@mui/material/Stack';

export default function Home() {
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);

    return (
        <Box component="div">
            <Hero />
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-evenly"
                className="p-12 font-normal">
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
            </Stack>
            <Divider variant="middle" />
            <Divider variant="middle" />
        </Box>
    );
}
