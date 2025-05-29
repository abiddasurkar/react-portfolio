// src/components/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Stack,
  useTheme,
  useMediaQuery,
  Switch,
  styled,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { motion, AnimatePresence } from 'framer-motion';

// Nav items with icons
const navLinks = [
  { title: 'Home', path: '/', icon: <HomeIcon /> },
  { title: 'About', path: '/about', icon: <InfoIcon /> },
  { title: 'Projects', path: '/projects', icon: <FolderOpenIcon /> },
];

// Social links for top right corner desktop view
const socialLinks = [
  {
    Icon: GitHubIcon,
    href: 'https://github.com/yourusername',
    label: 'GitHub Profile',
  },
  {
    Icon: LinkedInIcon,
    href: 'https://linkedin.com/in/yourusername',
    label: 'LinkedIn Profile',
  },
];

// Styled switch for dark/light toggle with icon
const DarkModeSwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        content: "'🌜'",
      },
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor:
      theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
    width: 32,
    height: 32,
    '&:before': {
      content: "'🌞'",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 18,
    },
  },
  '& .MuiSwitch-track': {
    borderRadius: 20 / 2,
    backgroundColor:
      theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    opacity: 1,
  },
}));

// Hamburger icon with Framer Motion animations
const HamburgerToggle = ({ open, onClick }) => {
  return (
    <IconButton
      edge="start"
      color="inherit"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      aria-haspopup="true"
      onClick={onClick}
      sx={{ mr: 1 }}
      size="large"
    >
      <motion.div
        initial={false}
        animate={open ? 'opened' : 'closed'}
        variants={{
          closed: { rotate: 0 },
          opened: { rotate: 45 },
        }}
        transition={{ duration: 0.3 }}
      >
        {open ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
      </motion.div>
    </IconButton>
  );
};

// Main Header Component
const Header = ({ mode, setMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Scroll hide/show header state
  const [showHeader, setShowHeader] = useState(true);
  const lastScrollY = useRef(window.pageYOffset);

  // Hide header on scroll down, show on scroll up behavior
  useEffect(() => {
    const controlHeader = () => {
      if (window.pageYOffset > lastScrollY.current) {
        // scroll down
        setShowHeader(false);
      } else {
        // scroll up
        setShowHeader(true);
      }
      lastScrollY.current = window.pageYOffset;
    };

    window.addEventListener('scroll', controlHeader);
    return () => window.removeEventListener('scroll', controlHeader);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  // Keyboard accessibility for drawer close
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') setDrawerOpen(false);
  };

  // Nav item click handler (closes drawer on mobile)
  const handleNavClick = (path) => {
    navigate(path);
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  // Dark mode toggle
  const handleModeChange = (e) => {
    setMode(e.target.checked ? 'dark' : 'light');
  };

  return (
    <>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: showHeader ? 0 : -85 }}
        transition={{ duration: 0.4 }}
        style={{ position: 'sticky', top: 0, zIndex: 1300 }}
      >
        <AppBar
          position="sticky"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: theme.shadows[4],
            borderBottom: `1px solid ${theme.palette.divider}`,
          }}
        >
          <Toolbar>
            {isMobile && (
              <HamburgerToggle open={drawerOpen} onClick={() => setDrawerOpen(!drawerOpen)} />
            )}
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: theme.palette.primary.main,
                fontWeight: 'bold',
                letterSpacing: 2,
                userSelect: 'none',
                cursor: 'pointer',
                fontFamily: "'Poppins', sans-serif",
              }}
              tabIndex={0}
            >
              My Portfolio
            </Typography>

            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navLinks.map(({ title, path }) => {
                  const active = location.pathname === path;
                  return (
                    <Button
                      key={title}
                      component={Link}
                      to={path}
                      variant={active ? 'contained' : 'text'}
                      color={active ? 'primary' : 'inherit'}
                      sx={{
                        textTransform: 'none',
                        fontWeight: active ? 'bold' : 'normal',
                        borderRadius: 3,
                      }}
                    >
                      {title}
                    </Button>
                  );
                })}

                {/* Dark Mode Toggle */}
                <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
                  <Box sx={{ ml: 2 }}>
                    <DarkModeSwitch
                      checked={mode === 'dark'}
                      onChange={handleModeChange}
                      inputProps={{ 'aria-label': 'Toggle dark mode' }}
                    />
                  </Box>
                </Tooltip>

                {/* Social Icons in header */}
                {socialLinks.map(({ Icon, href, label }) => (
                  <Tooltip title={label} key={label}>
                    <IconButton
                      edge="end"
                      component="a"
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      sx={{
                        color: theme.palette.text.primary,
                        '&:hover': { color: theme.palette.primary.main },
                      }}
                    >
                      <Icon />
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </motion.div>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            width: 260,
            backgroundColor: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: `1px solid ${theme.palette.divider}`,
          },
        }}
      >
        <Box
          sx={{ width: '100%', height: '100%' }}
          role="presentation"
          onKeyDown={handleKeyDown}
        >
          <List>
            {navLinks.map(({ title, path, icon }) => {
              const active = location.pathname === path;
              return (
                <ListItem key={title} disablePadding>
                  <ListItemButton
                    selected={active}
                    onClick={() => handleNavClick(path)}
                    sx={{
                      '&.Mui-selected': {
                        bgcolor: theme.palette.action.selected,
                      },
                    }}
                  >
                    <ListItemIcon sx={{ color: active ? theme.palette.primary.main : 'inherit' }}>
                      {icon || <HomeIcon />}
                    </ListItemIcon>
                    <ListItemText primary={title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Dark Mode Toggle in drawer */}
          <Box sx={{ p: 2, borderTop: `1px solid ${theme.palette.divider}` }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">Dark Mode</Typography>
              <DarkModeSwitch
                checked={mode === 'dark'}
                onChange={handleModeChange}
                inputProps={{ 'aria-label': 'Toggle dark mode' }}
              />
            </Stack>
          </Box>

          {/* Social Icons in drawer */}
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            {socialLinks.map(({ Icon, href, label }) => (
              <Tooltip key={label} title={label}>
                <IconButton
                  component="a"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  sx={{
                    color: theme.palette.text.primary,
                    '&:hover': { color: theme.palette.primary.main },
                  }}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            ))}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;