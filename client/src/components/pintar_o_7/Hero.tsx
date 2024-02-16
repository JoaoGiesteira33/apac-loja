import { Box, Typography } from '@mui/material';

type HeroProps = {
  title: string,
  subtitle: string,
  img: string,
  color: string,
  fontColor: string
}

export default function Hero(props: HeroProps) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: { md: 'row', xs: 'column' },
        justifyContent: 'center',
        width: '100%',
      }}>
      <Box component="div" sx={{ display: 'flex' }}>
        <img
          src={props.img}
          style={{
            maxHeight: '35rem',
            width: '100%',
            height: 'auto',
            objectFit: 'cover',
            backgroundColor: props.color,
          }}
        />
      </Box>
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: { md: 10, xs: 5 },
          flexGrow: 1,
          color: props.fontColor || '#FFF6DE',
          backgroundColor: props.color,
          alignItems: { xs: 'center', md: 'start' },
          justifyContent: { xs: 'center', md: 'end' },
        }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          textAlign={{ md: 'left', xs: 'center' }}
          className="text-3xl md:text-5xl">
          {props.title}
        </Typography>
        <Typography
          textAlign={{ md: 'left', sm: 'center' }}
          marginTop={2}>
          {props.subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
