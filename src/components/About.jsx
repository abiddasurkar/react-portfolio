// src/components/About.jsx
import React, { useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  useTheme,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Stack,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { motion, AnimatePresence } from 'framer-motion';

// ======== Constants with data ===========
const skillsData = [
  { name: 'JavaScript (ES6+)', icon: <CheckCircleIcon color="primary" />, level: 90 },
  { name: 'React (Hooks, Context API)', icon: <CheckCircleIcon color="primary" />, level: 95 },
  { name: 'Material-UI & CSS', icon: <CheckCircleIcon color="primary" />, level: 85 },
  { name: 'RESTful APIs & Axios', icon: <CheckCircleIcon color="primary" />, level: 85 },
  { name: 'Version Control (Git & GitHub)', icon: <CheckCircleIcon color="primary" />, level: 88 },
];

const experienceData = [
  {
    role: 'Frontend Developer',
    company: 'Innovatech Solutions',
    duration: 'Jan 2021 – Present',
    details:
      'Developed scalable React applications using Material-UI, Redux, and REST APIs. Improved UX by integrating animation libraries, optimizing performance, and enhancing accessibility.',
  },
  {
    role: 'Junior Frontend Engineer',
    company: 'Creative Apps Ltd.',
    duration: 'Jun 2019 – Dec 2020',
    details:
      'Built reusable React components, implemented responsive designs, and collaborated closely with backend engineers to integrate APIs efficiently.',
  },
];

const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'State University',
    duration: '2015 – 2019',
    details: 'Graduated with honors, completed advanced coursework in software engineering and web development.',
  },
];

// ======== Animations ============
const fadeInUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' },
  }),
};

// ======== Sub-components ===========
const SectionHeading = ({ children }) => (
  <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', letterSpacing: '1px' }}>
    {children}
  </Typography>
);

// Render individual skill with progress bar
const SkillItem = ({ skill, index }) => {
  const theme = useTheme();

  return (
    <motion.div variants={fadeInUpVariants} custom={index} key={skill.name}>
      <Box sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ListItemIcon sx={{ color: theme.palette.primary.main, minWidth: 36 }}>
            {skill.icon}
          </ListItemIcon>
          <Typography variant="subtitle1" sx={{ minWidth: 150 }}>
            {skill.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ minWidth: 25 }}>
            {skill.level}%
          </Typography>
        </Stack>
        <LinearProgress
          variant="determinate"
          value={skill.level}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.palette.grey[300],
            '& .MuiLinearProgress-bar': {
              borderRadius: 5,
              backgroundColor: theme.palette.primary.main,
            },
          }}
          aria-label={`${skill.name} proficiency level is ${skill.level} percent`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={skill.level}
          role="progressbar"
        />
      </Box>
    </motion.div>
  );
};

const ExperienceItem = ({ exp, index }) => (
  <motion.div variants={fadeInUpVariants} custom={index} key={exp.role + index}>
    <Box sx={{ mb: 3, p: 3, borderLeft: '5px solid', borderColor: 'primary.main' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {exp.role}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {exp.company} &bull; {exp.duration}
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {exp.details}
      </Typography>
    </Box>
  </motion.div>
);

const EducationItem = ({ edu, index }) => (
  <motion.div variants={fadeInUpVariants} custom={index} key={edu.degree + index}>
    <Box sx={{ mb: 3, p: 3, borderLeft: '5px solid', borderColor: 'secondary.main' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {edu.degree}
      </Typography>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {edu.institution} &bull; {edu.duration}
      </Typography>
      <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
        {edu.details}
      </Typography>
    </Box>
  </motion.div>
);

const AboutIntro = () => (
  <Box sx={{ mb: 6 }}>
    <Typography variant="body1" paragraph>
      I&apos;m a dedicated frontend developer with over 2.6 years of experience building responsive, performant, and accessible web applications using React and Material-UI. I focus on writing clean, reusable code and delivering pixel-perfect UI.
    </Typography>
  </Box>
);

// ======== Main Component ===========
const About = () => {
  return (
    <Box sx={{ px: { xs: 3, md: 10 }, pt: 8, pb: 10, maxWidth: '1000px', mx: 'auto' }}>
      <Paper elevation={10} sx={{ p: { xs: 4, md: 6 }, borderRadius: 5 }}>
        <SectionHeading>About Me</SectionHeading>
        <AboutIntro />

        <SectionHeading>Skills</SectionHeading>
        <List aria-label="List of technical skills">
          <AnimatePresence initial={false}>
            {skillsData.map((skill, idx) => (
              <SkillItem skill={skill} index={idx} key={skill.name} />
            ))}
          </AnimatePresence>
        </List>

        <Divider sx={{ my: 5 }} />

        <SectionHeading>Experience</SectionHeading>
        <Box component="section" aria-label="Work experience">
          {experienceData.map((exp, idx) => (
            <ExperienceItem exp={exp} index={idx} key={exp.role} />
          ))}
        </Box>

        <Divider sx={{ my: 5 }} />

        <SectionHeading>Education</SectionHeading>
        <Box component="section" aria-label="Education history">
          {educationData.map((edu, idx) => (
            <EducationItem edu={edu} index={idx} key={edu.degree} />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};

export default About;