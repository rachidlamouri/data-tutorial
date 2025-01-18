import { Box, IconButton, ListItem, Stack } from '@mui/material';
import { Check as CheckIcon } from '@mui/icons-material';
import { PropsWithChildren } from 'react';

type LearnableProps = PropsWithChildren;

export function Learnable({ children }: LearnableProps) {
  return (
    <ListItem divider>
      <Stack direction="row" alignItems="center">
        <Box>
          <IconButton disabled>
            <CheckIcon
              sx={
                {
                  // color: 'transparent',
                }
              }
            />
          </IconButton>
        </Box>
        <Stack>{children}</Stack>
      </Stack>
    </ListItem>
  );
}
