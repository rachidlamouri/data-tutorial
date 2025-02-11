import { Stack, Typography } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Subject } from '../../layout/subject/Subject';
import { Underline } from '../../typography/Underline';
import { InfoText } from '../../typography/InfoText';
import { useEffect } from 'react';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { InfoOutlined } from '@mui/icons-material';

function Learnable0() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          <Underline>J</Underline>ava<Underline>S</Underline>cript{' '}
          <Underline>O</Underline>bject <Underline>N</Underline>otation encodes
          data for people <InfoText>and</InfoText> computers
        </Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <InfoOutlined color="info" fontSize="small" />
          <Typography>
            <Underline>JSON</Underline> is <InfoText>not only</InfoText> for
            JavaScript; just derived from it
          </Typography>
        </Stack>
      </BulletPoints>
    </>
  );
}

function Learnable1() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          <Underline>JSON</Underline> is UTF-8 <InfoText>text</InfoText> in a
          specific format
        </Typography>
      </BulletPoints>
    </>
  );
}

function Learnable2() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          It can encode <InfoText>numbers</InfoText>, <InfoText>text</InfoText>,{' '}
          <InfoText>booleans</InfoText>, <InfoText>null</InfoText>, and two
          other things we'll get to later
        </Typography>
      </BulletPoints>
    </>
  );
}

function Learnable3() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          That's right, it is <InfoText>text</InfoText> that can encode{' '}
          <InfoText>text</InfoText>
        </Typography>
      </BulletPoints>
    </>
  );
}

function Learnable4() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          This section only exists so you can get more candy before we learn
          JSON
        </Typography>
      </BulletPoints>
    </>
  );
}

export function JsonSubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['What is JSON (derulo)?']} />
      <Learnable4 />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
    </Subject>
  );
}
