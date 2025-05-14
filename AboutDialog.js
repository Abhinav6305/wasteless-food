import { Dialog, DialogTitle, DialogContent, Typography, Button } from '@mui/material';

export default function AboutDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>About Wasteless Food</DialogTitle>
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Abhinav Rishi - Founder
        </Typography>
        <Typography paragraph>
          Contact: 9618587055
        </Typography>
        <Typography paragraph>
          Email: abhinavrishisaka@gmail.com
        </Typography>
      </DialogContent>
      <Button onClick={onClose} sx={{ mb: 2 }}>
        Close
      </Button>
    </Dialog>
  );
}