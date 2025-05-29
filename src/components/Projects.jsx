// src/components/Projects.jsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  IconButton,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Pagination,
  Stack,
  useTheme,
  Tooltip,
  Alert,
  Snackbar,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SortIcon from '@mui/icons-material/Sort';
import ClearIcon from '@mui/icons-material/Clear';
import { motion, AnimatePresence } from 'framer-motion';

import ProjectCard from './ProjectCard';
import { fetchProjects } from '../api/api';

// Animation variants for container and items
const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.17,
      delayChildren: 0.25,
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

// Sorting options
const SORT_OPTIONS = [
  { value: 'title_asc', label: 'Title: A → Z' },
  { value: 'title_desc', label: 'Title: Z → A' },
  { value: 'date_newest', label: 'Newest First' },
  { value: 'date_oldest', label: 'Oldest First' },
];

// Filtering tabs (could be dynamic)
const FILTER_TABS = [
  { label: 'All', filter: null },
  { label: 'React', filter: 'React' },
  { label: 'Node.js', filter: 'Node.js' },
  { label: 'Design', filter: 'Design' },
  { label: 'API', filter: 'API' },
];

const ITEMS_PER_PAGE = 6;

const Projects = () => {
  const theme = useTheme();

  // Data states
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Fetch projects
  useEffect(() => {
    setLoading(true);
    fetchProjects()
      .then(({ data }) => {
        // Chrome/react-dev only: console log fetched projects count
        console.log(`Fetched ${data.length} projects`);
        setProjects(data);
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setError('Failed to fetch projects. Please try again later.');
        setLoading(false);
        setSnackbarOpen(true);
      });
  }, []);

  // Filtering and Sorting logic
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = [...projects];

    // Filter by activeFilter in techStack
    if (activeFilter) {
      filtered = filtered.filter((project) =>
        project.techStack.some((t) => t.toLowerCase().includes(activeFilter.toLowerCase()))
      );
    }

    // Filter by searchQuery (title + description)
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(
        (project) =>
          project.title.toLowerCase().includes(q) || project.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    switch (sortOption) {
      case 'title_asc':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title_desc':
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'date_newest':
        // Assuming project has dateAdded ISO string: fallback to id descending
        filtered.sort((a, b) => new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0));
        break;
      case 'date_oldest':
        filtered.sort((a, b) => new Date(a.dateAdded || 0) - new Date(b.dateAdded || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [projects, activeFilter, searchQuery, sortOption]);

  // Pagination: slice projects per page
  const paginatedProjects = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedProjects, page]);

  // Handlers
  const handleFilterChange = (event, newValue) => {
    const selectedFilter = FILTER_TABS[newValue]?.filter || null;
    setActiveFilter(selectedFilter);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveFilter(null);
    setSortOption(SORT_OPTIONS[0].value);
    setPage(1);
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ pt: 8, px: { xs: 2, md: 5 }, maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h3" align="center" fontWeight="bold" mb={5}>
        Selected Projects
      </Typography>

      {/* Search + Filter + Sort */}
      <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            placeholder="Search projects by title or description..."
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              'aria-label': 'Search projects',
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                searchQuery && (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                    <IconButton aria-label="Clear search" onClick={() => setSearchQuery('')}>
                      <ClearIcon />
                    </IconButton>
                  </InputAdornment>
                )
              ),
            }}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Tabs
            value={FILTER_TABS.findIndex((tab) =>
              tab.filter === activeFilter
            ) || 0}
            onChange={handleFilterChange}
            aria-label="Project technology filter tabs"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              '& .MuiTab-root': { textTransform: 'none', minWidth: '88px' },
              '& .Mui-selected': {
                color: theme.palette.primary.main,
                fontWeight: 'bold',
              },
            }}
          >
            {FILTER_TABS.map(({ label }) => (
              <Tab key={label} label={label} />
            ))}
          </Tabs>
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small" variant="outlined">
            <Select
              labelId="sort-select-label"
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              displayEmpty
              inputProps={{
                'aria-label': 'Sort projects',
              }}
              startAdornment={
                <InputAdornment position="start">
                  <SortIcon color="action" />
                </InputAdornment>
              }
            >
              {SORT_OPTIONS.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Clear Filters Button */}
      {(!!activeFilter || searchQuery.length > 0 || sortOption !== SORT_OPTIONS[0].value) && (
        <Box sx={{ textAlign: 'right', mb: 3 }}>
          <Button variant="text" size="small" onClick={clearFilters} sx={{ fontWeight: 'bold' }}>
            Clear All Filters
          </Button>
        </Box>
      )}

      {/* Loading Spinner */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}>
          <CircularProgress size={70} />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ textAlign: 'center', mt: 6 }}>
          {error}
        </Alert>
      ) : paginatedProjects.length === 0 ? (
        <Typography variant="h6" textAlign="center" mt={10} color="text.secondary">
          No projects found matching your criteria.
        </Typography>
      ) : (
        <AnimatePresence>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Grid container spacing={4} justifyContent="center">
              {paginatedProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </AnimatePresence>
      )}

      {/* Paginate */}
      {paginatedProjects.length > 0 && (
        <Stack spacing={2} sx={{ mt: 6, mb: 10 }} alignItems="center">
          <Pagination
            count={Math.ceil(filteredAndSortedProjects.length / ITEMS_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
            color="primary"
            siblingCount={1}
            boundaryCount={1}
            shape="rounded"
            showFirstButton
            showLastButton
            aria-label="Projects pagination"
          />
        </Stack>
      )}
    </Box>
  );
};

export default Projects