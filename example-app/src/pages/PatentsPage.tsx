import React from 'react';
import { Grid, Box, Heading, Paragraph } from 'grommet';

export const PatentsPage: React.FC = () => {
  return (
    <>
      <Grid
        margin='20px auto 40px'
        rows={['fill', 'fill']}
        columns={['medium', 'large']}
        gap="none"
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'image', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea="header" background="status-ok" justify='center' align='center'>
          <Heading level='3'>LEW-TOPS-125</Heading>
        </Box>
        <Box gridArea="image"
             background={{
               'image': 'url(https://technology.nasa.gov/t2media/tops/img/LEW-TOPS-125/iStock-157730835_LEW-19309-1_airplane-storm_1388x1050-300dpi.jpg)',
               'size': '100% 100%',
               'color': '#fff'
             }}
             height={{
               'min': '250px',
               'max': 'large'
             }}
        />
        <Box gridArea="main" background="light-4" pad='small'>
          <Paragraph fill={true}>
            Innovators at NASA's Glenn Research Center have developed a new means of avoiding and mitigating icing events for aircraft flying above 14,000 feet,
            dramatically improving aviation safety and reducing operating costs. Often undetectable with current radar, ice crystals in convective storm cells
            can produce a phenomenon referred to as "Ice Crystal Icing," in which ice accumulates, or accretes, in turbofan engines. Ice-crystal accretion can
            cause serious <span className="highlight">engine</span> operational problems and sometimes even catastrophic <span className="highlight">engine</span> failures.
            Using a combination of sensors, <span className="highlight">engine</span> system modeling, and compressor flow analysis code, Glenn's innovation performs
            real-time analysis to determine the potential of ice accretion. This analysis allows pilots to avoid potential icing while using a more direct route
            than would otherwise be possible. Thus, Glenn's system reduces fuel consumption and <span className="highlight">engine</span> wear while fulfilling the
            crucial objective of increasing aircraft safety.
          </Paragraph>
        </Box>
      </Grid>
      <Grid
        margin='20px auto 40px'
        rows={['fill', 'fill']}
        columns={['medium', 'large']}
        gap="none"
        areas={[
          { name: 'header', start: [0, 0], end: [1, 0] },
          { name: 'image', start: [0, 1], end: [0, 1] },
          { name: 'main', start: [1, 1], end: [1, 1] },
        ]}
      >
        <Box gridArea="header" background="status-ok" justify='center' align='center'>
          <Heading level='3'>LAR-TOPS-185</Heading>
        </Box>
        <Box gridArea="image"
             background={{
               'image': 'url(https://technology.nasa.gov/t2media/tops/img/LAR-TOPS-185/Front.jpg)',
               'size': '100% 100%',
               'color': '#fff'
             }}
             height={{
               'min': '250px',
               'max': 'large'
             }}
        />
        <Box gridArea="main" background="light-4" pad='small'>
          <Paragraph fill={true}>
            Turbofan <span className="highlight">Engine</span> Acoustic Liner Design and Analysis Tools",
            "NASA Langley Research Center has developed two tools for turbofan <span className="highlight">engine</span>
            acoustic liner design and analysis. The first is a statistical approach for broadband liner design and assessment.
            The second is graphical software to design and analyze resonant channels in acoustic liners.
          </Paragraph>
        </Box>
      </Grid>
    </>
  );
};