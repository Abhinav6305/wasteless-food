import { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme, 
  CssBaseline, 
  Container,
  Typography,
  Box,
  CircularProgress, // Added this import
  Button // Import Button component
} from '@mui/material';
import RecipeSearch from './components/RecipeSearch/RecipeSearch';
import RecipeCard from './components/RecipeCard/RecipeCard';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground'; // Fixed the import path
import AboutDialog from './components/AboutDialog/AboutDialog'; // Add this import

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green theme
    },
    background: {
      default: 'rgba(255,255,255,0.8)',
      paper: 'rgba(255,255,255,0.9)'
    }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
  },
});

function App() {
  const [recipes, setRecipes] = useState(null);
  const [loading, setLoading] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);

  const handleSearch = async (ingredients) => {
    setLoading(true);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients: ingredients.join(',') })
      });
      const data = await response.json();
      setRecipes(Object.values(data.recipes || []));
    } catch (error) {
      console.error('Error:', error);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AnimatedBackground />
      
      {/* About Us Button */}
      <Button 
        variant="contained"
        onClick={() => setAboutOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 20,
          left: 20,
          zIndex: 1000,
          backgroundColor: '#4caf50',
          '&:hover': { backgroundColor: '#388e3c' }
        }}
      >
        About Us
      </Button>

      {/* Logo in top-right */}
      <Box sx={{ position: 'fixed', top: 20, right: 20, zIndex: 1000 }}>
        <img src="/logo.png" alt="Wasteless Food Logo" style={{ height: 80 }} />
      </Box>

      <Container maxWidth="md" sx={{ py: 4, position: 'relative' }}>
        <RecipeSearch onSearch={handleSearch} />
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : recipes === null ? null : recipes.length > 0 ? (
          recipes.map((recipe) => (
            <RecipeCard key={recipe.name} recipe={recipe} />
          ))
        ) : (
          <Typography sx={{ textAlign: 'center', mt: 4 }}>
            No recipes found. Try different ingredients.
          </Typography>
        )}
      </Container>

      <AboutDialog 
        open={aboutOpen} 
        onClose={() => setAboutOpen(false)} 
      />
    </ThemeProvider>
  );
}

export default App;