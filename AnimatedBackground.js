import { Box, keyframes } from '@mui/material';
import { styled } from '@mui/system';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const VegetableImg = styled('img')({
  position: 'absolute',
  animation: `${float} 6s ease-in-out infinite`,
  filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))'
});

export default function AnimatedBackground() {
  const vegetables = ['tomato', 'carrot', 'broccoli', 'onion'];
  
  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: -1,
      overflow: 'hidden',
      backgroundColor: '#4caf50'
    }}>
      {vegetables.map((veg, i) => (
        <VegetableImg
          key={veg}
          src={`/vegetables/${veg}.png`}
          sx={{
            width: 100,
            left: `${10 + (i * 25)}%`,
            top: `${20 + (i * 15)}%`,
            animationDelay: `${i * 0.5}s`
          }}
        />
      ))}
    </Box>
  );
}