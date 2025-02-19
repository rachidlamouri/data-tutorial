import { Button, Stack, Typography } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { Subject } from '../../layout/subject/Subject';
import { BulletPoints } from '../../layout/BulletPoints';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { Register } from '../../memory/Register';
import { Underline } from '../../typography/Underline';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: ['0', '1'],
    onFinish: onLearn,
  });

  return (
    <>
      <BulletPoints>
        <Typography>
          An <Underline>encoding</Underline> is a convention for mapping
          combinations of bits to information
        </Typography>
        <Typography>
          The bit below <Underline>encodes</Underline> the owner of a tent
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          hideCombinations
          onChange={(value) => {
            onTrack(value === 0 ? '0' : '1');
          }}
          labels={{
            0: 'Pixel',
            1: 'Noel',
          }}
        />
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          The bit below <Underline>encodes</Underline> the number of dogs in the
          tent
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          hideCombinations
          onChange={(value) => {
            if (value === 3) {
              onLearn();
            }
          }}
          labels={{
            0: '0',
            1: '1',
            2: '2',
            3: '3',
          }}
        />
      </NestedInfo>
      <BulletPoints>
        <Typography>Idk who the third dog is either</Typography>
      </BulletPoints>
    </Stack>
  );
}

function Learnable2() {
  const { onLearn } = useLearnableContext();

  return (
    <>
      <BulletPoints>
        <Typography>
          There are standard encodings that help computers send information
          around the world
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Button onClick={onLearn}>Cool!</Button>
      </NestedInfo>
    </>
  );
}

export function EncodingSubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['What is an encoding?']} />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
    </Subject>
  );
}
