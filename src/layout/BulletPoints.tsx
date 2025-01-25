import { Emergency } from '@mui/icons-material';
import { Stack } from '@mui/material';
import { ReactNode } from 'react';

type BulletPointProps = {
  children: ReactNode[] | ReactNode;
};

export function BulletPoints({ children }: BulletPointProps) {
  const childrenList = Array.isArray(children) ? children : [children];
  return childrenList.map((point, index) => {
    return (
      <Stack key={index} direction="row" alignItems="center" gap={1}>
        <Emergency color="info" sx={{ fontSize: 10 }} />
        {point}
      </Stack>
    );
  });
}
