import React from 'react';

import { Box, Divider, Stack, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MultipleSelectTypes from '../../components/pintar_o_7/MultipleSelectTypes';
import NewProductRequest from '../../components/pintar_o_7/NewProductRequest';

export default function Requests() {
    // Filters
    const [selectedTypes, setSelectedTypes] = React.useState<string[]>([]);
    const [artist, setArtist] = React.useState<string>('');
    const [dateFilter, setDateFilter] = React.useState<Date | null>(null);

    return (
        <Box
            component="div"
            sx={{
                paddingY: '2rem',
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '20%',
                },
            }}>
            <Stack
                direction="column"
                spacing={4}
                alignItems={'center'}
                justifyContent={'flex-start'}>
                <Typography variant="h3">New Requests</Typography>
                <Box component={'div'} className="w-full">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        alignItems={{ xs: 'flex-start', sm: 'center' }}
                        spacing={{ xs: 1, sm: 2, md: 4 }}
                        justifyContent="space-between"
                        sx={{
                            paddingY: '2rem',
                            width: '100%',
                        }}>
                        <Box className="flex-shrink-0" component={'div'}>
                            <MultipleSelectTypes
                                values={selectedTypes}
                                setValues={setSelectedTypes}
                            />
                        </Box>
                        <TextField
                            variant="standard"
                            margin="normal"
                            label="Artista"
                            type="text"
                            value={artist}
                            onChange={(e) => setArtist(e.target.value)}
                        />
                        <DatePicker
                            disableFuture
                            openTo="day"
                            views={['year', 'month', 'day']}
                            format="DD/MM/YYYY"
                            label="Antes de"
                            value={dateFilter}
                            slotProps={{
                                textField: {
                                    variant: 'standard',
                                    name: 'date',
                                    margin: 'normal',
                                },
                            }}
                            onChange={(value: Date) => setDateFilter(value)}
                        />
                    </Stack>
                </Box>
                <NewProductRequest></NewProductRequest>
                <NewProductRequest></NewProductRequest>
            </Stack>
        </Box>
    );
}
