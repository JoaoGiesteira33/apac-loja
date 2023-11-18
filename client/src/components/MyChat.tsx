import { Box } from '@mui/material';

import { ChatAvatars } from './ChatAvatars';
import { Toast } from './Toast';
import { MyForm } from './MyForm';

export function MyChat() {
    return (
        <Box
            component="div"
            sx={{
                flexGrow: 1,
                backgroundColor: '#f2f2f2',
                width: 1 / 4,
                height: 1 / 2,
            }}>
            <>
                <ChatAvatars />
                <Toast />
                <MyForm />
            </>
        </Box>
    );
}
