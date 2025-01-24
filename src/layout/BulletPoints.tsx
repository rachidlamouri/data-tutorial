import { Circle } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { ReactNode } from 'react';

type BulletPointProps = {
  children: ReactNode[];
};

export function BulletPoints({ children }: BulletPointProps) {
  return children.map((point, index) => {
    return (
      <Stack key={index} direction="row" alignItems="center" gap={1}>
        <Circle sx={{ fontSize: 10 }} />
        {point}
      </Stack>
    );
  });
}
