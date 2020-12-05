import React from 'react';
import { Box, Paragraph } from 'grommet';

type LibrarySearchingContentType = {
  content: Global.LibraryContentDataShape[];
};

export const LibrarySearchingContent: React.FC<LibrarySearchingContentType> = ({
  content
}) =>
  content.length ? (
    <Box
      as='ul'
      direction='row'
      flex={true}
      justify='around'
      pad='none'
      wrap={true}
    >
      {content.map(({ id, title, link }: Global.LibraryContentDataShape) => (
        <Box
          key={id}
          as='li'
          background={{
            image: `url('${link}')`,
            size: '100% 100%'
          }}
          height='200px'
          margin='medium'
          title={title}
          width='300px'
        />
      ))}
    </Box>
  ) : (
    <Paragraph fill={true} textAlign='center'>
      No matching found
    </Paragraph>
  );
