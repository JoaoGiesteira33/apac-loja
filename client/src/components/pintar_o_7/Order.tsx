import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { Box, Divider, Paper } from '@mui/material';
import { OrderType } from '../../types/order';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Order(props: { order: OrderType }) {
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange =
        (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    return (
        <Paper
            sx={{
                width: '100%',
            }}>
            <Box component={'div'} sx={{ padding: '1rem' }}>
                <Typography sx={{ wordWrap: 'break-word' }} variant="h5">
                    Pedido nº{props.order._id}
                </Typography>
                <Typography variant="h6">
                    ({props.order.date ? props.order.date.toLocaleString() : ''}
                    )
                </Typography>
            </Box>
            <Divider />
            <Box component={'div'}>
                {props.order.shipments.map((shipment, index) => {
                    return (
                        <Accordion
                            expanded={expanded === shipment.product_id}
                            onChange={handleChange(shipment.product_id)}>
                            <AccordionSummary
                                aria-controls={`${props.order._id}-${index}-content`}
                                id={`${props.order._id}-${index}-header`}>
                                <Typography>
                                    Encomenda nº{shipment.product_id}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h6">
                                    Nome do Vendedor
                                </Typography>
                                {shipment.states.map((state) => {
                                    return (
                                        <Box
                                            component={'div'}
                                            sx={{
                                                paddingX: '1rem',
                                            }}>
                                            <Typography variant="h6">
                                                {state.value}
                                            </Typography>
                                            <Typography variant="h6">
                                                {state.date.toLocaleString()}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Box>
        </Paper>
    );
}
