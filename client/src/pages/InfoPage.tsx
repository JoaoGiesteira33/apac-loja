import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Box, Typography } from '@mui/material';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import infoBanner from '../assets/infoBanner.png';
import Hero from '../components/pintar_o_7/Hero';

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

const recursiveObjectToJSX = (obj: string | Array<Object>, level: number) => {
    if (typeof obj === 'string') {
        //Return string, applying HTML tags inside it
        return (
            <Typography
                variant="body1"
                dangerouslySetInnerHTML={{ __html: obj }}
            />
        );
    } else {
        return obj.map((item) => {
            const { title, text } = item as any;
            return (
                <Box component="div" mb={2} alignItems={'center'}>
                    <Typography variant="h6" fontWeight="bold" align="center">
                        {title}
                    </Typography>
                    {recursiveObjectToJSX(text, level + 1)}
                </Box>
            );
        });
    }
};

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
                            {t('info.privacy.title')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                            {recursiveObjectToJSX(
                                t('info.privacy.text', { returnObjects: true }),
                                5
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, .125)' }}>
                    <AccordionSummary
                        aria-controls="panel2-content"
                        id="panel2-header">
                        <Typography variant="h5" fontWeight="bold">
                            {t('info.terms.title')}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
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
                            {recursiveObjectToJSX(
                                t('info.terms.text', { returnObjects: true }),
                                5
                            )}
                        </Box>
                    </AccordionDetails>
                </Accordion>
                {/* <Accordion>
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
                </Accordion> */}
            </Box>
        </Box>
    );
};

export default InfoPage;
