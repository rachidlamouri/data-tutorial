import { Stack } from '@mui/material';
import { PropsWithChildren } from 'react';

export function NestedInfo({ children }: PropsWithChildren) {
  return (
    <Stack marginLeft={2} width="fit-content">
      {children}
    </Stack>
  );
}
