// src/components/Home.jsx
import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Paper,
  Stack,
  Button,
  Chip,
  Tooltip,
  Link,
  Divider,
  useTheme,
} from '@mui/material';
import {
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Email as EmailIcon,
  Code as CodeIcon,
  Speed as SpeedIcon,
  Verified as VerifiedIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';

const roles = ['Frontend Engineer', 'React Developer', 'UI/UX Enthusiast', 'JavaScript Specialist'];
const skills = [
  { name: 'React', level: 90 },
  { name: 'JavaScript', level: 95 },
  { name: 'Material-UI', level: 85 },
  { name: 'TypeScript', level: 70 },
  { name: 'CSS & HTML5', level: 90 },
  { name: 'REST API', level: 85 },
];
const stats = [
  { icon: <CodeIcon fontSize="large" color="primary" />, label: 'Projects Completed', value: 32 },
  { icon: <SpeedIcon fontSize="large" color="primary" />, label: 'Avg. Performance Score', value: '98%' },
  { icon: <VerifiedIcon fontSize="large" color="primary" />, label: 'Client Satisfaction', value: '99%' },
];
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};
const HomeSkill = ({ skill }) => (
  <Box
    component={motion.div}
    variants={fadeInVariants}
    custom={skill.index}
    sx={{
      background: 'rgba(255,255,255,0.1)',
      borderRadius: 2,
      p: 2,
      flex: '1 1 calc(33% - 16px)',
      m: 1,
      textAlign: 'center',
      border: '1px solid rgba(255,255,255,0.15)',
      boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    }}
  >
    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
      {skill.name}
    </Typography>
    <Box
      sx={{
        height: 8,
        width: '100%',
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 4,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: `${skill.level}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #f6a560 0%, #764ba2 100%)',
          borderRadius: 4,
          transition: 'width 1s ease-in-out',
        }}
      />
    </Box>
    <Typography mt={1} fontWeight={500} variant="body2" color="text.secondary">
      {skill.level}%
    </Typography>
  </Box>
);

const Home = () => {
  const theme = useTheme();
  console.log('Rendering Home Component');

  return (
    <Box
      component={motion.div}
      initial="hidden"
      animate="visible"
      sx={{
        minHeight: '90vh',
        pt: { xs: 8, md: 6 },
        pb: { xs: 8, md: 6 },
        px: { xs: 3, md: 4 },
        background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: '100%',
          maxWidth: 1200,
          mx: 'auto',
          p: { xs: 3, md: 5 },
          borderRadius: 5,
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(0,0,0,0.35)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: { md: 480 },
        }}
      >
        {/* Left pane: avatar and socials fixed height and vertically centered */}
        <Box
          sx={{
            width: { xs: '100%', md: '33%' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pb: { xs: 3, md: 0 },
            pr: { md: 4 },
            minWidth: 230,
          }}
        >
          <Box
            sx={{
              width: 180,
              height: 180,
              borderRadius: '50%',
              overflow: 'hidden',
              border: `4px solid ${theme.palette.secondary.main}`,
              cursor: 'pointer',
              boxShadow: '0 0 25px rgba(255 255 255 / 0.6)',
              transition: 'transform 0.4s ease',
              '&:hover': { transform: 'scale(1.1) rotate(5deg)' },
            }}
          >
            <Avatar
              src="https://i.pravatar.cc/400"
              alt="Your Name"
              sx={{ width: '100%', height: '100%' }}
            />
          </Box>
          <Stack direction="row" justifyContent="center" spacing={4} mt={4} flexWrap="wrap">
            {[{
              icon: <GitHubIcon fontSize="large" />,
              href: 'https://github.com/yourusername',
              label: 'GitHub',
            }, {
              icon: <LinkedInIcon fontSize="large" />,
              href: 'https://linkedin.com/in/yourusername',
              label: 'LinkedIn',
            }, {
              icon: <EmailIcon fontSize="large" />,
              href: 'mailto:youremail@example.com',
              label: 'Email',
            }].map(({ icon, href, label }) => (
              <Tooltip key={label} title={label} placement="top">
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener"
                  sx={{
                    color: 'white',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.4)', color: theme.palette.secondary.light },
                    display: 'inline-block',
                  }}
                >
                  {icon}
                </Link>
              </Tooltip>
            ))}
          </Stack>
        </Box>

        {/* Right pane: main content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: { xs: '100%', md: '60%' },
          }}
        >
          <Typography variant="h2" sx={{
            fontWeight: 'bold', 
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem', lg: '3.6rem' },
            lineHeight: 1.1
          }}>
            Hello, I&apos;m <Box component="span" sx={{ color: theme.palette.secondary.light }}>Your Name</Box>
          </Typography>
          <Typography variant="h4" sx={{ mb: 4, minHeight: 40, fontWeight: 500, fontFamily: 'monospace' }}>
            <Typewriter
              words={roles}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </Typography>
          <Typography sx={{
            fontSize: { xs: '1rem', md: '1.15rem' },
            mb: 5,
            opacity: 0.85,
            maxWidth: 650,
            lineHeight: 1.5,
            textAlign: 'justify',
            userSelect: 'text'
          }}>
            I’m a driven and passionate frontend developer with 2.6 years of hands-on experience building highly interactive web applications with React and Material-UI, tailoring scalable frontend architecture for great user experiences.
          </Typography>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: '0.05em', mb: 2 }}>
              Skills & Proficiencies
            </Typography>
            <Box
              component={motion.div}
              initial="hidden"
              animate="visible"
              sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {skills.map((skill, i) => (
                <HomeSkill key={skill.name} skill={{ ...skill, index: i }} />
              ))}
            </Box>
          </Box>
          {/* Call to action buttons */}
          <Stack direction="row" spacing={3} mt={5} flexWrap="wrap">
            <Button
              href="#projects"
              variant="contained"
              color="secondary"
              size="large"
              sx={{ fontWeight: 600, borderRadius: 3, px: 5, py: 1.5 }}
            >
              View Projects
            </Button>
            <Button
              href="mailto:youremail@example.com"
              variant="outlined"
              color="secondary"
              size="large"
              sx={{ fontWeight: 600, borderRadius: 3, px: 5, py: 1.5 }}
            >
              Get in touch
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* Divider and Stats */}
      <Divider sx={{ my: 7, borderColor: 'rgba(255,255,255,0.15)' }} />
      <Grid container spacing={4} justifyContent="center" textAlign="center" color="text.primary">
        {stats.map(({ icon, label, value }) => (
          <Grid item xs={12} sm={4} md={3} key={label}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              sx={{
                p: 3,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 3,
                boxShadow: '0 0 20px rgba(0,0,0,0.1)',
                userSelect: 'none',
              }}
            >
              {icon}
              <Typography variant="h4" fontWeight={600} mt={1}>
                {value}
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {label}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;