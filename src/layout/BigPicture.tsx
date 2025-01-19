import { Stack, Typography } from '@mui/material';

import {
  Circle as CircleIcon,
  CameraAltOutlined as CameraIcon,
} from '@mui/icons-material';

type BigPictureProps = {
  bulletPoints: string[];
};

export function BigPicture({ bulletPoints }: BigPictureProps) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <CameraIcon sx={{ fontSize: 80 }} color="info" />
      <Stack>
        {bulletPoints.map((point, index) => {
          return (
            <Stack key={index} direction="row" alignItems="center" gap={1}>
              <CircleIcon sx={{ fontSize: 10 }} />
              <Typography>{point}</Typography>
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}
