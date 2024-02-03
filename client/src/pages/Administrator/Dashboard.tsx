import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Skeleton, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';

import { useTranslation } from 'react-i18next';

import { getApiUsers, getAuthUsers, getShipments } from '../../fetchers';

const Dashboard: React.FC = () => {
    const [t] = useTranslation();
    const [districtsStats, setDistrictsStats] = useState(null);
    const [registerMonth, setMonthsStats] = useState(null);
    const [lastVisited, setLastVisited] = useState(null);
    const [shipmentState, setShipmentState] = useState(null);
    const [ages, setAges] = useState(null);

    const getDistrictsStats = (users) => {
        const districts: { [key: string]: number }[] = [{}, {}];
        users.forEach((user) => {
            try {
                console.log(user);
                if (user.role == 'client') {
                    if (
                        user.client_fields.demographics.address.city in
                        districts[0]
                    )
                        districts[0][
                            user.client_fields.demographics.address.city
                        ]++;
                    else
                        districts[0][
                            user.client_fields.demographics.address.city
                        ] = 1;
                } else if (user.role == 'seller') {
                    if (
                        user.seller_fields.demographics.address.city in
                        districts[1]
                    )
                        districts[1][
                            user.seller_fields.demographics.address.city
                        ]++;
                    else
                        districts[1][
                            user.seller_fields.demographics.address.city
                        ] = 1;
                }
            } catch (err) {
                console.log(err);
            }
        });
        console.log(districts);
        return districts;
    };

    // estatistica de mes de registo
    const getMonthRegisterStats = (users) => {
        const months: { [key: string]: string } = {};
        users.forEach((user) => {
            if (user.role == 'seller') return;

            const date = new Date(user.dataRegisto);
            const month = date.getMonth();
            if (month in months) months[month]++;
            else months[month] = 1;
        });
        const formattedMonths = [];

        for (const key in months) {
            formattedMonths[key] = {
                id: key,
                value: months[key],
                label: t('months.' + key),
            };
        }
        return formattedMonths;
    };

    // estatistica de ultima visita (ultimos 15 dias, 30 dias, 60 dias, resto)
    const getLastVisitedStats = (users) => {
        const lastVisited = [
            [
                { id: '7', value: 0, label: t('dashboard.7') },
                { id: '15', value: 0, label: t('dashboard.15') },
                { id: '30', value: 0, label: t('dashboard.30') },
                { id: '60', value: 0, label: t('dashboard.60') },
                { id: 'rest', value: 0, label: t('dashboard.rest') },
            ],
            [
                { id: '7', value: 0, label: t('dashboard.7') },
                { id: '15', value: 0, label: t('dashboard.15') },
                { id: '30', value: 0, label: t('dashboard.30') },
                { id: '60', value: 0, label: t('dashboard.60') },
                { id: 'rest', value: 0, label: t('dashboard.rest') },
            ],
        ];

        users.forEach((user) => {
            let type = 0;
            if (user.nivel == 'seller') type = 1;

            const date = new Date(user.dataUltimoAcesso);
            const today = new Date();
            const diff = today.getTime() - date.getTime();
            const days = Math.ceil(diff / (1000 * 3600 * 24));
            if (days < 7) lastVisited[type][0]['value']++;
            else if (days < 15) lastVisited[type][1]['value']++;
            else if (days < 30) lastVisited[type][2]['value']++;
            else if (days < 60) lastVisited[type][3]['value']++;
            else lastVisited[type][4]['value']++;
        });

        return lastVisited;
    };

    // get age users
    const getAgeStats = (users) => {
        const ages: { [key: string]: string } = {};
        users.forEach((user) => {
            if (user.role == 'seller') return;
            const today = new Date();
            const date = new Date(user.client_fields.demographics.birth_date);
            // get age from birthdate
            let age = today.getFullYear() - date.getFullYear();
            const m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
                age--;
            }
            if (age in ages) ages[age]++;
            else ages[age] = 1;
        });
        let i;

        return ages;
    };

    const getShipmentStateStats = (shipments) => {
        const states = [
            { id: 'pending', value: 0, label: t('dashboard.pending') },
            { id: 'reserved', value: 0, label: t('dashboard.reserved') },
            { id: 'paid', value: 0, label: t('dashboard.paid') },
        ];
        console.log('Shipments:', shipments);
        shipments.forEach((shipment) => {
            const state = shipment.states[shipment.states.length - 1].value;
            if (state == 'pending') states[0]['value']++;
            else if (state == 'reserved') states[1]['value']++;
            else if (state == 'paid') states[2]['value']++;
        });
        console.log('States:', states);
        return states;
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        getApiUsers(token, { 'role[in]': 'client,seller' })
            .then((users) => {
                setDistrictsStats(getDistrictsStats(users));
                setAges(getAgeStats(users));
            })
            .catch((err) => {
                console.log(err);
            });
        getAuthUsers(token)
            .then((users) => {
                console.log('Auth Users:', users);
                setMonthsStats(getMonthRegisterStats(users));
                setLastVisited(getLastVisitedStats(users));
            })
            .catch((err) => {
                console.log(err);
            });
        getShipments(token)
            .then((shipments) => {
                setShipmentState(getShipmentStateStats(shipments));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const data = {
        chart1: {
            xAxis: [
                {
                    scaleType: 'band',
                    data: districtsStats ? Object.keys(districtsStats[0]) : [],
                },
            ],
            series: [
                {
                    data: districtsStats
                        ? Object.values(districtsStats[0])
                        : [],
                },
            ],
        },
        chart2: {
            xAxis: [
                {
                    scaleType: 'band',
                    data: districtsStats ? Object.keys(districtsStats[1]) : [],
                },
            ],
            series: [
                {
                    data: districtsStats
                        ? Object.values(districtsStats[1])
                        : [],
                },
            ],
        },
        chart3: {
            series: [
                {
                    data: registerMonth ? registerMonth : [],
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: 'gray',
                    },
                },
            ],
        },
        chart4: {
            series: [
                {
                    data: lastVisited ? lastVisited[0] : [],
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: 'gray',
                    },
                },
            ],
        },
        chart5: {
            series: [
                {
                    data: lastVisited ? lastVisited[1] : [],
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: 'gray',
                    },
                },
            ],
        },
        chart6: {
            xAxis: [
                {
                    scaleType: 'band',
                    data: districtsStats ? Object.keys(ages) : [],
                },
            ],
            series: [
                {
                    data: ages ? Object.values(ages) : [],
                },
            ],
        },
        chart7: {
            series: [
                {
                    data: shipmentState ? shipmentState : [],
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: 'gray',
                    },
                },
            ],
        },
    };

    const rootEffect = {
        flexGrow: 1,
        padding: 2,
    };

    const paperEffect = {
        padding: 2,
        textAlign: 'center',
        color: 'text.secondary',
        height: 400,
        width: '100%',
    };

    const ChartWithSkeleton = (condition, chart, type) => {
        return condition ? (
            type == 'pie' ? (
                <PieChart series={chart.series} />
            ) : type == 'bar' ? (
                <BarChart xAxis={chart.xAxis} series={chart.series} />
            ) : (
                <LineChart series={chart.series} xAxis={chart.xAxis} />
            )
        ) : (
            <Box
                component="div"
                sx={{
                    height: '100%',
                }}>
                <Skeleton
                    variant="rounded"
                    sx={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Box>
        );
    };

    return (
        <Box
            sx={{
                paddingX: {
                    xs: '2rem',
                    sm: '4rem',
                    md: '6rem',
                    lg: '8rem',
                },
                paddingY: '3rem',
            }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Dashboard
            </Typography>
            <Grid container sx={rootEffect} spacing={3}>
                <Grid xs={12}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.clientsCity')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(districtsStats, data.chart1, 'bar')}
                    </Paper>
                </Grid>
                <Grid xs={12}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.artistsCity')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(districtsStats, data.chart2, 'bar')}
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.registerMonth')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(registerMonth, data.chart3, 'pie')}
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.shipmentState')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(shipmentState, data.chart7, 'pie')}
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.lastVisited_client')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(lastVisited, data.chart4, 'pie')}
                    </Paper>
                </Grid>
                <Grid xs={12} sm={6} md={6}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.lastVisited_seller')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(lastVisited, data.chart5, 'pie')}
                    </Paper>
                </Grid>

                <Grid xs={12}>
                    <Typography
                        variant="h6"
                        gutterBottom
                        fontWeight="bold"
                        textAlign="center">
                        {t('dashboard.age')}
                    </Typography>
                    <Paper sx={paperEffect}>
                        {ChartWithSkeleton(ages, data.chart6, 'bar')}
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Dashboard;
