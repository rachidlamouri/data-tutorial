import { Box, Stack } from '@mui/material';
import { PropsWithChildren } from 'react';
import { LearnableProvider } from '../../learnable-provider/LearnableProvider';
import { Checkmark } from './Checkmark';

type LearnableProps = PropsWithChildren<{
  index: number;
}>;

export function Learnable({ index, children }: LearnableProps) {
  return (
    <LearnableProvider index={index} forceVisible={false}>
      <Stack direction="row" alignItems="center">
        <Box>
          <Checkmark />
        </Box>
        <Stack gap={0.5}>{children}</Stack>
      </Stack>
    </LearnableProvider>
  );
}
