import { Typography, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

export function Underline({ children }: PropsWithChildren) {
  const theme = useTheme();

  return (
    <Typography
      component="span"
      sx={{
        textDecoration: 'underline',
        textDecorationColor: theme.palette.info.main,
      }}
    >
      {children}
    </Typography>
  );
}
