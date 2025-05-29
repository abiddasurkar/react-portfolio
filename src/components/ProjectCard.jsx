// src/components/ProjectCard.jsx
import React, { useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Chip,
  Button,
  Stack,
  Link,
  Tooltip,
  useTheme,
  Collapse,
  LinearProgress,
  IconButton,
} from '@mui/material';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { motion, AnimatePresence } from 'framer-motion';

// ============================
// Animation Variants
// ============================
const cardVariants = {
  initial: { opacity: 0, scale: 0.85, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 20px 30px rgba(0,0,0,0.25)',
    transition: { duration: 0.3 },
  },
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
  exit: { opacity: 0, scale: 0.8 },
};

const chipVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

// ============================
// Sub-Component: TechStackTag
// ============================
const TechStackTag = React.memo(({ label }) => {
  const theme = useTheme();
  return (
    <motion.div
      variants={chipVariants}
      whileHover={{ scale: 1.15, zIndex: 5 }}
      style={{ display: 'inline-block', marginBottom: 6 }}
    >
      <Chip
        label={label}
        size="small"
        color="primary"
        sx={{
          fontWeight: 600,
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.primary.dark : theme.palette.primary.light,
          color: theme.palette.primary.contrastText,
          boxShadow: '0 1px 5px rgba(0,0,0,0.15)',
          cursor: 'default',
          userSelect: 'none',
          letterSpacing: 0.5,
        }}
        aria-label={`Technology used: ${label}`}
      />
    </motion.div>
  );
});

// ============================
// Sub-Component: ExpandableDescription
// ============================
const ExpandableDescription = ({ description, maxLength = 150 }) => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = useCallback(() => setExpanded((prev) => !prev), []);

  const shouldTruncate = description.length > maxLength;
  const displayedText = !expanded && shouldTruncate ? `${description.slice(0, maxLength)}...` : description;

  return (
    <Box>
      <Typography
        variant="body2"
        color="text.secondary"
        paragraph
        tabIndex={0}
        aria-expanded={expanded}
        sx={{ whiteSpace: 'pre-line', userSelect: 'text' }}
      >
        {displayedText}
      </Typography>
      {shouldTruncate && (
        <Button
          onClick={toggleExpand}
          size="small"
          aria-label={expanded ? 'Show less description' : 'Show more description'}
          sx={{
            textTransform: 'none',
            mt: -1,
            fontWeight: 'bold',
            color: 'primary.main',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          {expanded ? 'Show Less ▲' : 'Read More ▼'}
        </Button>
      )}
    </Box>
  );
};

ExpandableDescription.propTypes = {
  description: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
};

// ============================
// Sub-Component: SkillProgress
// ============================
const SkillProgress = React.memo(({ skill, value }) => {
  const theme = useTheme();
  return (
    <Stack spacing={0.5} sx={{ width: '45%', my: 0.6 }}>
      <Typography variant="caption" component="label" htmlFor={`skill-progress-${skill}`} sx={{ fontWeight: 700 }}>
        {skill}
      </Typography>
      <LinearProgress
        id={`skill-progress-${skill}`}
        variant="determinate"
        value={value}
        sx={{
          height: 10,
          borderRadius: 5,
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.1)' : '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            backgroundColor: theme.palette.primary.main,
            transition: 'width 0.5s ease-in-out',
          },
        }}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        role="progressbar"
      />
    </Stack>
  );
});

// ============================
// Main Component: ProjectCard
// ============================
const ProjectCard = ({ project }) => {
  // Memoize the skills for this project if any skill rating available, else fallback dummy data
  const skills = useMemo(
    () => project.skills || [{ name: 'React', level: 80 }, { name: 'JS', level: 75 }, { name: 'Material-UI', level: 85 }],
    [project.skills]
  );

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      exit="exit"
      style={{ height: '100%' }}
      role="article"
      aria-labelledby={`project-title-${project.id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        // Allow keyboard users to trigger hover behavior (optional)
        if (e.key === 'Enter' || e.key === ' ') {
          e.currentTarget.click();
        }
      }}
    >
      <Card
        sx={{
          maxWidth: 380,
          m: 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          borderRadius: 3,
          cursor: 'pointer',
          backgroundColor: 'background.paper',
          boxShadow: 3,
          transition: 'box-shadow 0.3s ease',
          '&:focus-visible': {
            outline: (theme) => `2px solid ${theme.palette.primary.main}`,
            outlineOffset: '3px',
          },
        }}
      >
        {/* Header */}
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            id={`project-title-${project.id}`}
            variant="h5"
            component="h3"
            gutterBottom
            sx={{
              fontWeight: 800,
              letterSpacing: 1,
              textTransform: 'uppercase',
              mb: 1,
              color: 'primary.main',
            }}
          >
            {project.title}
          </Typography>

          <ExpandableDescription description={project.description} maxLength={160} />

          {/* Skills / Progress Bars */}
          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography variant="subtitle2" mb={1} fontWeight={700} color="text.primary">
              Skill Ratings:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {skills.map(({ name, level }) => (
                <SkillProgress key={name} skill={name} value={level} />
              ))}
            </Box>
          </Box>

          {/* Tech Stack Tags */}
          <Stack direction="row" flexWrap="wrap" spacing={1} aria-label="Tech stack used">
            {project.techStack.map((tech) => (
              <TechStackTag key={tech} label={tech} />
            ))}
          </Stack>
        </CardContent>

        {/* Footer Actions */}
        <CardActions sx={{ px: 2, py: 1, justifyContent: 'space-between' }}>
          <Tooltip title="View source code on GitHub" arrow>
            <Button
              size="small"
              component={Link}
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<OpenInNewIcon />}
              sx={{ fontWeight: '600', textTransform: 'none' }}
            >
              GitHub
            </Button>
          </Tooltip>

          <Tooltip title="See live demo" arrow>
            <Button
              size="small"
              component={Link}
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              endIcon={<OpenInNewIcon />}
              sx={{
                fontWeight: '700',
                textTransform: 'none',
              }}
            >
              Live Demo
            </Button>
          </Tooltip>
        </CardActions>
      </Card>
    </motion.div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    techStack: PropTypes.arrayOf(PropTypes.string).isRequired,
    githubUrl: PropTypes.string.isRequired,
    liveDemo: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        level: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default ProjectCard;