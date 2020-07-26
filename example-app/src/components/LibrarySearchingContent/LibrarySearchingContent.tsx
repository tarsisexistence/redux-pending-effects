import React from 'react';
import { Box, Paragraph } from 'grommet';

type LibrarySearchingContentType = {
  content: Global.LibraryContentDataShape[]
}

export const LibrarySearchingContent: React.FC<LibrarySearchingContentType> = ({ content }) => (
  content.length ?
    <Box as='ul' flex={true} direction='row' wrap={true} justify='around' pad='none'>
      {
        content.map(({id, title, link}: Global.LibraryContentDataShape) => (
          <Box key={id}
               title={title}
               as='li'
               margin='medium'
               width='300px'
               height='200px'
               background={{
                 'image': `url('${link}')`,
                 'size': '100% 100%',
               }}/>
        ))
      }
    </Box> :
    <Paragraph fill={true} textAlign='center'>No matching found</Paragraph>
);