import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

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
        },
    },
    '& .MuiSlider-track': {
        border: 'none',
    },
    '& .MuiSlider-rail': {
        opacity: 0.5,
    },
    '& .MuiSlider-mark': {
        height: 8,
        width: 1,
        '&.MuiSlider-markActive': {
            opacity: 1,
        },
    },
}));
export default function SelectPrice({
    value,
    changeValue,
    maxPrice,
    mouseUpFunc,
}) {
    const theme = useTheme();
    const handleChange = (event: Event, newValue: number | number[]) => {
        changeValue(newValue as number[]);
    };
    const [t] = useTranslation();

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
            <Typography sx={{ flexGrow: '1', pr: 3 }} id="slider-label">
                {t('home.price_range')} €
            </Typography>
            <IOSSlider
                getAriaLabel={() => t('home.price_range')}
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
