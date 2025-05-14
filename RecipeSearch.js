import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box, 
  Stack,
  Chip,
  IconButton,
  Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

export default function RecipeSearch({ onSearch }) {
  const [input, setInput] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    const trimmedInput = input.trim();
    if (trimmedInput && !ingredients.includes(trimmedInput)) {
      setIngredients([...ingredients, trimmedInput]);
      setInput('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove) => {
    setIngredients(ingredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length > 0) {
      onSearch(ingredients);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        What ingredients do you have?
      </Typography>
      
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        {ingredients.map((ingredient) => (
          <Chip
            key={ingredient}
            label={ingredient}
            onDelete={() => handleRemoveIngredient(ingredient)}
            deleteIcon={<CloseIcon fontSize="small" />}
            sx={{ mb: 1 }}
          />
        ))}
      </Stack>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          placeholder="Add ingredients (e.g., chicken, rice)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
        />
        <Button
          variant="contained"
          onClick={handleAddIngredient}
          disabled={!input.trim()}
        >
          Add
        </Button>
      </Box>

      <Button
        fullWidth
        variant="contained"
        startIcon={<SearchIcon />}
        onClick={handleSubmit}
        disabled={ingredients.length === 0}
        sx={{ mt: 2, py: 1.5 }}
      >
        Find Recipes
      </Button>
    </Box>
  );
}