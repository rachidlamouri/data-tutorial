import { Box, ListItem, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import { LearnableProvider } from '../../learnable-provider/LearnableProvider';
import { Checkmark } from './Checkmark';

type LearnableProps = PropsWithChildren<{
  index: number;
}>;

export function Learnable({ index, children }: LearnableProps) {
  return (
    <LearnableProvider index={index} forceVisible={false}>
      <ListItem divider>
        <Stack direction="row" alignItems="center">
          <Box>
            <Checkmark />
          </Box>
          <Stack>{children}</Stack>
        </Stack>
      </ListItem>
    </LearnableProvider>
  );
}
