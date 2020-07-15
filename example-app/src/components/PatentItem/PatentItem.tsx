import React from 'react';
import { Box, Grid, Heading, Paragraph } from 'grommet';
import HtmlParser from 'react-html-parser';

import { PatentDataShape } from '../../services/NasaService';

export const PatentItem: React.FC<PatentDataShape> = ({title, description, imageUrl}) => (
  <Grid
    margin='20px auto 40px'
    rows={['fill', 'fill']}
    columns={['medium', 'large']}
    gap="none"
    as='li'
    areas={[
      { name: 'header', start: [0, 0], end: [1, 0] },
      { name: 'image', start: [0, 1], end: [0, 1] },
      { name: 'main', start: [1, 1], end: [1, 1] },
    ]}
  >
    <Box gridArea="header" background="status-ok" justify='center' align='center'>
      <Heading level='3' textAlign='center'>
        { HtmlParser(title) }
      </Heading>
    </Box>
    <Box gridArea="image"
         background={{
           'image': `url('${imageUrl}')`,
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
        { HtmlParser(description) }
      </Paragraph>
    </Box>
  </Grid>
);