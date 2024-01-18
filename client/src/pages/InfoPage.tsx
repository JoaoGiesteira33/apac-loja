import React from 'react';
import Hero from '../components/pintar_o_7/Hero';
import { Box, Typography } from '@mui/material';
import infoBanner from '../assets/infoBanner.png';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion elevation={0} square {...props} />
))(() => ({
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ChevronRightIcon sx={{ fontSize: '1.5rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const InfoPage: React.FC = (props) => {
    const { t } = useTranslation();
    return (
        <Box component="div">
            <Hero
                title={t('info.title')}
                color={'#E5E4E4'}
                fontColor={'#777777'}
                img={infoBanner}
            />
            <Box
                component="div"
                sx={{
                    flexGrow: 1,
                    paddingY: 5,
                    paddingX: {
                        xs: '2rem',
                        sm: '4rem',
                        md: '6rem',
                        lg: '8rem',
                    },
                }}>
                <Accordion
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, .125)' }}>
                    <AccordionSummary
                        aria-controls="panel1-content"
                        id="panel1-header">
                        <Typography variant="h5" fontWeight="bold">
                            {t('info.privacy')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{t('info.privacy_text')}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, .125)' }}>
                    <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header">
                        <Typography variant="h5" fontWeight="bold">
                            {t('info.terms')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{t('info.terms_text')}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header">
                        <Typography variant="h5" fontWeight="bold">
                            FAQ
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>{t('info.faq_text')}</Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    );
};

export default InfoPage;
