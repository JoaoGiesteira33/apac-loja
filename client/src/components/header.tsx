import { TextField } from '@mui/material';
import logoImg from '../assets/logo_apac.png';

import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';

export default function Header(){
    return (
        <div className="flex justify-around items-center bg-slate-700 h">
            <div>
                <img className="h-20" alt="logo" src={logoImg}/>
            </div>
            <div className='flex-grow max-w-xl'>
                <Box sx={{display: 'flex', alignItems: 'flex-end'}}>
                    <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }}/>
                    <TextField fullWidth id="input-with-sx" variant="standard">

                    </TextField>
                </Box>
            </div>
            <div>
3
            </div>
        </div>
    )
}