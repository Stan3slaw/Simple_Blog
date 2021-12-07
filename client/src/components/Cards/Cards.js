import React from 'react';

import Grid from '@mui/material/Grid';
import CardBox from './Card/Card';

const Cards = ({ items }) => {
  return (
    <Grid sx={{ p: 4 }} container spacing={4}>
      {items.map((card) => (
        <CardBox key={card._id} post={card} />
      ))}
    </Grid>
  );
};

export default Cards;
