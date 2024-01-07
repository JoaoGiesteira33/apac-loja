import React from 'react';

import { Box, Divider, Typography } from '@mui/material';

const NotFound: React.FC = () => {
    return (
        <Box component="div" sx={{ flexGrow: 1, alignItems: 'center', py: 10 }}>
            <Typography variant="h1" textAlign="center" fontWeight="bold">
                404
            </Typography>

            <Typography variant="h2" textAlign="center">
                Oops! Página não encontrada
            </Typography>
        </Box>
    );
};

export default NotFound;
