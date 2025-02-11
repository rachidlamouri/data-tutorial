import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { Subject } from '../../layout/subject/Subject';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { InfoText } from '../../typography/InfoText';

function Learnable0() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>
          JSON lets us define data with <InfoText>text</InfoText>
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Typography color="secondary">"Hello"</Typography>
      </NestedInfo>
    </Stack>
  );
}

function Learnable1() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>
          JSON has 6 data types: <InfoText>text</InfoText>,{' '}
          <InfoText>numbers</InfoText>, <InfoText>booleans</InfoText>,{' '}
          <InfoText>null</InfoText>, <InfoText>lists</InfoText>, and{' '}
          <InfoText>objects</InfoText>
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Typography color="secondary">""</Typography>
        <Typography color="secondary">0</Typography>
        <Typography color="secondary">false</Typography>
        <Typography color="secondary">null</Typography>
        <Typography color="secondary">{'[ ]'}</Typography>
        <Typography color="secondary">{'{ }'}</Typography>
      </NestedInfo>
    </Stack>
  );
}

function Learnable2() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>
          <InfoText>Lists</InfoText> can contain any of the 6 data types
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Typography color="secondary">
          {'[  "", 0, false, null, [ ], { }  ]'}
        </Typography>
      </NestedInfo>
    </Stack>
  );
}

function Learnable3() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>
          <InfoText>Object</InfoText> keys are text, and object values can be
          any of the 6 data types
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Typography color="secondary">
          {
            '{  "text": "", "number": 0, "boolean": false, "null": null, "list": [ ], "object": { } }'
          }
        </Typography>
      </NestedInfo>
    </Stack>
  );
}

function Learnable4() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>
          <InfoText>Lists</InfoText> and <InfoText>objects</InfoText> let us
          define complex data
        </Typography>
      </BulletPoints>
    </Stack>
  );
}

export function JsonRecapSubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['More candy']} />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
      <Learnable4 />
    </Subject>
  );
}
