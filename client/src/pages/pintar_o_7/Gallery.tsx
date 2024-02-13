import React, { useEffect, useState } from 'react';

import Hero from '../../components/pintar_o_7/Hero';
import SelectTypes from '../../components/pintar_o_7/SelectType';
import SelectPrice from '../../components/pintar_o_7/SelectPrice';

import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';

import useProductSearch from '../../hooks/useProductSearch';
import ProductThumbnail from '../../components/pintar_o_7/ProductThumbnail';
import { useTranslation } from 'react-i18next';
import { checkLink } from '../../fetchers';
import { ProductQuery } from '../../types/product';

export default function Home() {
  const [t] = useTranslation();
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [selectedPriceRange, setSelectedPriceRange] = useState<
    [number, number]
  >([0, maxPrice]);

  const [featuredProducts] = useState({
    // available: true,
    featured: true,
  } as ProductQuery);
  const [productQuery, setProductQuery] = useState<ProductQuery>({
    // available: true,
    limit: 10,
    minPrice: selectedPriceRange[0],
    maxPrice: selectedPriceRange[1],
    // orderBy: "published_date",
    productTypes: selectedTypes,
  } as ProductQuery);

  const all = useProductSearch(productQuery);
  const featured = undefined;
  const randomFeaturedProduct = { photos: ["https://picsum.photos/seed/EFWHk/640/480"] };
  console.log(all);
  // const featured = useProductSearch(featuredProducts);
  // const [randomFeaturedProduct, setRandomFeaturedProduct] = useState(null);
  //
  //
  // console.log(" all ", all)
  // useEffect(() => {
  //   if (featured.products && featured.products.length > 0) {
  //     setRandomFeaturedProduct(
  //       featured.products[
  //       Math.floor(Math.random() * featured.products.length)
  //       ]
  //     );
  //   }
  // }, [featured.products]);

  // useEffect(() => {
  //   getMaxPrice()
  //     .then((res) => {
  //       console.log('MaxPrice:', res);
  //       setSelectedPriceRange([0, res]);
  //       setMaxPrice(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // useEffect(() => {
  //   setProductQuery((prevProductQuery) => ({
  //     ...prevProductQuery,
  //     productTypes: selectedTypes
  //   }));
  // }, [selectedTypes]);

  // Whenever selectedPriceRange changes, update productQuery.minPrice and productQuery.maxPrice
  // useEffect(() => {
  //   setProductQuery(prevProductQuery => {
  //     const [minPrice, maxPrice] = selectedPriceRange;
  //     return { ...prevProductQuery, minPrice, maxPrice };
  //   });
  // }, [selectedPriceRange]);

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <Hero
        title={'Pintar o 7'}
        subtitle={
          t('home.iniciative') +
          ' Associação Portuguesa das Artes e da Cultura'
        }
        img={checkLink(
          randomFeaturedProduct && randomFeaturedProduct.photos[0]
        )}
        color={'#FF3D00'}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-evenly"
        sx={{ paddingY: '2rem', maxWidth: 'xl', width: '100%' }}>
        <Box
          component="div"
          sx={{
            flexGrow: '1',
            paddingX: {
              xs: '2rem',
              sm: '4rem',
              md: '6rem',
              lg: '8rem',
            },
            display: 'flex',
            alignItems: 'center',
          }}>
          <SelectTypes
            values={selectedTypes}
            setValues={setSelectedTypes}
            isMultiple={true}
          />
        </Box>
        <SelectPrice
          maxPrice={maxPrice}
          value={selectedPriceRange}
          changeValue={setSelectedPriceRange}
          mouseUpFunc={() => {
            const [minPrice, maxPrice] = selectedPriceRange;
            setProductQuery({
              ...productQuery,
              minPrice,
              maxPrice,
            });
            all.reloadWithQuery(productQuery);
          }}
        />
      </Stack>
      <Divider variant="middle" />

      <Box
        component="div"
        sx={{
          paddingX: {
            xs: '2rem',
            sm: '4rem',
            md: '6rem',
            lg: '8rem',
          },
          paddingY: '3rem',
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Grid
          container
          sx={{
            justifyContent: { xs: 'center', sm: 'space-between' },
            maxWidth: 'xl',
          }}
          spacing={{ xs: 2, md: 4, lg: 8 }}>
          {all &&
            all.products &&
            all.products.map((product, index) => {
              console.log('Creatting grid of products');
              return (
                <Grid
                  key={index}
                  display={'flex'}
                  justifyContent={'center'}
                  alignItems={'flex-start'}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}>
                  <ProductThumbnail product={product} />
                </Grid>
              );
            })}
        </Grid>
      </Box>

      {all && all.error && <div>Error</div>}
      {all && all.loading && (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginY: '2rem',
          }}>
          <CircularProgress />
        </Box>
      )}
      {all && all.hasMore && (
        <Button
          startIcon={<AddCircleOutlineSharpIcon />}
          variant="outlined"
          sx={{
            marginBottom: '2rem',
          }}
          onClick={() => {
            all.loadMore();
          }}>
          {t('global.load-more')}
        </Button>
      )}
      <Divider variant="middle" />
    </Box>
  );
}
