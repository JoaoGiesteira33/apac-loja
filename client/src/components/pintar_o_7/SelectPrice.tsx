import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

function valuetext(value: number) {
    return `${value}€`;
}
const iOSBoxShadow =
    '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';
const IOSSlider = styled(Slider)(({ theme }) => ({
    height: 2,
    padding: '15px 0',
    '& .MuiSlider-thumb': {
        height: 28,
        width: 28,
        backgroundColor: '#fff',
        boxShadow: iOSBoxShadow,
        '&:focus, &:hover, &.Mui-active': {
            boxShadow:
                '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
            // Reset on touch devices, it doesn't add specificity
            '@media (hover: none)': {
                boxShadow: iOSBoxShadow,
            },
        },
    },
    '& .MuiSlider-valueLabel': {
        fontSize: 12,
        fontWeight: 'normal',
        top: 60,
        backgroundColor: 'unset',
        color: theme.palette.text.primary,
        '&:before': {
            display: 'none',
        },
        '& *': {
            background: 'transparent',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
        backgroundColor: '#bfbfbf',
    },
    '& .MuiSlider-mark': {
        backgroundColor: '#bfbfbf',
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
            backgroundColor: 'currentColor',
        },
    },
}));
export default function SelectPrice({
    value,
    changeValue,
    maxPrice,
    mouseUpFunc,
}) {
    const handleChange = (event: Event, newValue: number | number[]) => {
        changeValue(newValue as number[]);
    };

    const marks = [
        {
            value: 0,
            label: '0€',
        },
        {
            value: maxPrice,
            label: `${maxPrice}€`,
        },
    ];

    return (
        <Box
            component="div"
            sx={{
                flexGrow: '1',
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                paddingX: { xs: '2rem', sm: '4rem', md: '6rem', lg: '8rem' },
            }}>
            <Typography sx={{ flexGrow: '1' }} id="slider-label">
                Price Range
            </Typography>
            <IOSSlider
                getAriaLabel={() => 'Price range'}
                aria-label="Price range"
                aria-labelledby="slider-label"
                value={value}
                max={maxPrice}
                valueLabelDisplay="on"
                onChange={handleChange}
                onChangeCommitted={mouseUpFunc}
                getAriaValueText={valuetext}
            />
        </Box>
    );
}
