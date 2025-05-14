import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function RecipeCard({ recipe = {} }) {  // Default empty object
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">
          {recipe.name || 'No recipe name available'}
        </Typography>
        {recipe.instructions && (
          <Typography paragraph>
            {recipe.instructions}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}

RecipeCard.defaultProps = {
  recipe: {
    name: 'Unnamed Recipe',
    instructions: ''
  }
};

export default RecipeCard;