import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';

export function InfoText({ children }: PropsWithChildren) {
  return (
    <Typography component="span" color="info">
      {children}
    </Typography>
  );
}
