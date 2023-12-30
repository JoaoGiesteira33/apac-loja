import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/system/Box';
import { ListItemIcon, styled } from '@mui/material';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

const MyKeyboardArrowDownOutlinedIcon = styled('KeyboardArrowDownOutlinedIcon')(
    ({ primary }) => ({
        backgroundColor: primary ? 'palevioletred' : 'white',
        color: primary ? 'white' : 'palevioletred',
    })
);
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 10 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const availableTypes: string[] = [
    'Pintura',
    'Escultura',
    'Fotografia',
    'Desenho',
    'Colagens',
    'Impressões e Gravuras',
    'Arte Digital',
    'Instalação',
    'Desing',
    'Arte Têxtil',
];

export default function MultipleSelectTypes({
    values,
    setValues,
}: {
    values: string[];
    setValues: React.Dispatch<React.SetStateAction<string[]>>;
}) {
    const handleSelectedTypesChange = (
        event: SelectChangeEvent<typeof values>
    ) => {
        const value = event.target.value;
        if (value[value.length - 1] === 'all') {
            setValues(
                values.length === availableTypes.length ? [] : availableTypes
            );
            return;
        }
        setValues(typeof value === 'string' ? value.split(',') : value);
    };

    return (
        <Box
            component="div"
            sx={{
                flexGrow: '1',
                paddingX: { xs: '2rem', sm: '4rem', md: '6rem', lg: '8rem' },
                display: 'flex',
                alignItems: 'center',
            }}>
            <FormControl
                variant="standard"
                sx={{ m: 1, width: 70, margin: '0' }}>
                <InputLabel shrink={false} id="multiple-checkbox-label">
                    {values.length < 1 && 'tipos'}
                </InputLabel>
                <Select
                    labelId="multiple-checkbox-label"
                    id="multiple-checkbox"
                    multiple
                    disableUnderline
                    value={values}
                    onChange={handleSelectedTypesChange}
                    IconComponent={KeyboardArrowDownOutlinedIcon}
                    renderValue={() => ['tipos']}
                    MenuProps={MenuProps}>
                    <MenuItem divider value="all">
                        <ListItemIcon>
                            <Checkbox
                                checked={
                                    availableTypes.length > 0 &&
                                    values.length === availableTypes.length
                                }
                                indeterminate={
                                    values.length > 0 &&
                                    values.length < availableTypes.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText primary="Todos" />
                    </MenuItem>
                    {availableTypes.map((type) => (
                        <MenuItem divider key={type} value={type}>
                            <Checkbox checked={values.indexOf(type) > -1} />
                            <ListItemText primary={type} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
