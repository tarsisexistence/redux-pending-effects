import React from 'react';
import { Box, Grid, Heading, Paragraph } from 'grommet';
import HtmlParser from 'react-html-parser';

export const PatentItem: React.FC<Global.PatentDataShape> = ({
  title,
  description,
  imageUrl
}) => (
  <Grid
    areas={[
      { name: 'header', start: [0, 0], end: [1, 0] },
      { name: 'image', start: [0, 1], end: [0, 1] },
      { name: 'main', start: [1, 1], end: [1, 1] }
    ]}
    as='li'
    columns={['medium', 'large']}
    gap='none'
    margin='20px auto 40px'
    rows={['fill', 'fill']}
  >
    <Box
      align='center'
      background='status-ok'
      gridArea='header'
      justify='center'
    >
      <Heading level='3' textAlign='center'>
        {HtmlParser(title)}
      </Heading>
    </Box>
    <Box
      background={{
        image: `url('${imageUrl}')`,
        size: '100% 100%',
        color: '#fff'
      }}
      gridArea='image'
      height={{
        min: '250px',
        max: 'large'
      }}
    />
    <Box background='light-4' gridArea='main' pad='small'>
      <Paragraph fill={true}>{HtmlParser(description)}</Paragraph>
    </Box>
  </Grid>
);
