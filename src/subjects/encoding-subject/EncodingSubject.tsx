import { Typography } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { Subject } from '../../layout/subject/Subject';
import { BulletPoints } from '../../layout/BulletPoints';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { Register } from '../../memory/Register';
import { Underline } from '../../typography/Underline';
import { NestedInfo } from '../../layout/learnable/NestedInfo';

function Learnable0() {
  const { onLearn } = useLearnableContext();

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
          onChange={() => {
            onLearn();
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
    <>
      <BulletPoints>
        <Typography>
          The bit below <Underline>encodes</Underline> the number of dogs in the
          tent
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          hideCombinations
          onChange={() => {
            onLearn();
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
    </>
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
        <Register
          hideCombinations
          onChange={() => {
            onLearn();
          }}
          labels={{
            0: 'Cool',
            1: 'Neat',
          }}
        />
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
