import { Stack } from '@mui/material';

import { CameraAltOutlined as CameraIcon } from '@mui/icons-material';
import { BulletPoints } from './BulletPoints';

type BigPictureProps = {
  bulletPoints: string[];
};

export function BigPicture({ bulletPoints }: BigPictureProps) {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <CameraIcon sx={{ fontSize: 80 }} color="info" />
      <Stack>
        <BulletPoints>{bulletPoints}</BulletPoints>
      </Stack>
    </Stack>
  );
}
