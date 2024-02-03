import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import { SxProps, Theme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { CountryType, countries } from '../../types/country';

export default function CountrySelect(props: {
    selection: CountryType;
    setSelection: (value: CountryType) => void;
    selectionInput: string;
    setSelectionInput: (value: string) => void;
    sx?: SxProps<Theme>;
    showCountryAlert: boolean;
}) {
    const { t } = useTranslation();
    return (
        <Autocomplete
            value={props.selection}
            inputValue={props.selectionInput}
            onChange={(event, newValue) => props.setSelection(newValue)}
            onInputChange={(_, newInputValue) => {
                props.setSelectionInput(newInputValue);
            }}
            sx={[...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
            id="country-select"
            options={countries}
            autoHighlight
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...props}>
                    <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                    />
                    {option.label} ({option.code}) +{option.phone}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={t('checkout.shipping.country')}
                    variant="standard"
                    error={props.showCountryAlert}
                    helperText={
                        props.showCountryAlert
                            ? t('global.select-country')
                            : ' '
                    }
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password',
                    }}
                />
            )}
        />
    );
}
