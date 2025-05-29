// src/components/Footer.jsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Link as MuiLink,
  Grid,
  Stack,
  TextField,
  Button,
  IconButton,
  useTheme,
  Tooltip,
  Divider,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  const theme = useTheme();

  // State for newsletter email input, loading, success/errors
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handler for newsletter subscription form submit
  const handleSubscribe = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setLoading(true);

    // Simulate API call - replace with real backend API integration
    setTimeout(() => {
      setLoading(false);
      setSuccess('Thank you for subscribing!');
      setEmail('');
    }, 2000);
  };

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        backgroundColor: theme.palette.grey[900],
        color: theme.palette.grey[300],
        py: { xs: 5, md: 8 },
        px: { xs: 3, md: 10 },
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Decorative SVG wave */}
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          top: 0,
          // width: '100%',
          height: '80px',
          fill: theme.palette.grey[900],
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <path d="M0,0V46.29c48,22.24,103.44,35,158.23,35,98.54,0,129.9-42.41,195.69-42.41S503,96.93,570,96.93c50.74,0,74.21-15.58,122-20.68A310.33,310.33,0,0,1,850.42,99.08c55.5,0,97.52-32.23,149.86-32.23,51.7,0,88.9,35.12,149.72,35.12s89.17-37.69,89.17-37.69V0Z" />
      </svg>

      <Grid container spacing={6}>

        {/* Contact & Newsletter Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Contact
          </Typography>
          <Typography sx={{ mb: 1 }}>
            <strong>Email:</strong>{' '}
            <MuiLink
              href="mailto:youremail@example.com"
              target="_blank"
              rel="noopener"
              underline="hover"
              sx={{ color: 'inherit' }}
            >
              youremail@example.com
            </MuiLink>
          </Typography>
          <Typography sx={{ mb: 3 }}>
            <strong>Phone:</strong> (123) 456-7890
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
            Newsletter
          </Typography>
          <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1 }}>
            <TextField
              type="email"
              placeholder="Your email"
              variant="filled"
              size="small"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email address to subscribe"
              sx={{
                bgcolor: theme.palette.background.paper,
                borderRadius: 1,
                flexGrow: 1,
                input: { color: theme.palette.text.primary },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              disabled={loading}
              sx={{ whiteSpace: 'nowrap' }}
              aria-label="Subscribe to newsletter"
            >
              {loading ? 'Sending...' : 'Subscribe'}
            </Button>
          </Box>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        </Grid>

        {/* Quick Links */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Quick Links
          </Typography>
          <Stack spacing={1}>
            <MuiLink href="/" underline="hover" sx={{ color: 'inherit' }}>
              Home
            </MuiLink>
            <MuiLink href="/about" underline="hover" sx={{ color: 'inherit' }}>
              About
            </MuiLink>
            <MuiLink href="/projects" underline="hover" sx={{ color: 'inherit' }}>
              Projects
            </MuiLink>
            <MuiLink href="/contact" underline="hover" sx={{ color: 'inherit' }}>
              Contact
            </MuiLink>
          </Stack>
        </Grid>

        {/* Resources */}
        <Grid item xs={6} md={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Resources
          </Typography>
          <Stack spacing={1}>
            <MuiLink href="/resume.pdf" target="_blank" rel="noopener" underline="hover" sx={{ color: 'inherit' }}>
              Resume
            </MuiLink>
            <MuiLink href="https://github.com/yourusername" target="_blank" rel="noopener" underline="hover" sx={{ color: 'inherit' }}>
              GitHub
            </MuiLink>
            <MuiLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener" underline="hover" sx={{ color: 'inherit' }}>
              LinkedIn
            </MuiLink>
          </Stack>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
            Follow Me
          </Typography>
          <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
            <Tooltip title="GitHub" arrow>
              <IconButton
                aria-label="GitHub"
                component="a"
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white', '&:hover': { color: theme.palette.secondary.light } }}
              >
                <GitHubIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="LinkedIn" arrow>
              <IconButton
                aria-label="LinkedIn"
                component="a"
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white', '&:hover': { color: theme.palette.secondary.light } }}
              >
                <LinkedInIcon fontSize="large" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Twitter" arrow>
              <IconButton
                aria-label="Twitter"
                component="a"
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener"
                sx={{ color: 'white', '&:hover': { color: theme.palette.secondary.light } }}
              >
                <TwitterIcon fontSize="large" />
              </IconButton>
            </Tooltip>
          </Stack>

          <Button variant="outlined" href="/contact" sx={{ color: 'white', borderColor: 'white' }}>
            Contact Me
          </Button>
        </Grid>
      </Grid>

      <Divider sx={{ mt: 5, borderColor: 'rgba(255,255,255,0.2)' }} />

      <Box mt={3} textAlign="center" fontSize={14} color="rgba(255,255,255,0.6)">
        © {new Date().getFullYear()} Your Name. Built with React & Material-UI.
      </Box>

      {/* Back to Top Button */}
      <Box
        onClick={() =>
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          bgcolor: theme.palette.primary.main,
          // width: 50,
          height: 50,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          '&:hover': { bgcolor: theme.palette.primary.dark },
          zIndex: 1300,
          boxShadow: theme.shadows[5],
          color: 'white',
          userSelect: 'none',
        }}
        aria-label="Back to top"
        role="button"
      >
        <KeyboardArrowUpIcon fontSize="large" />
      </Box>
    </Box>
  );
};

export default Footer;