import { Button, Typography } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Subject } from '../../layout/subject/Subject';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useEffect } from 'react';

function Learnable0() {
  return (
    <>
      <BulletPoints>
        <Typography>What is data? (both abstract and physically)</Typography>
        <Typography>What is information?</Typography>
        <Typography>How do we represent information with data?</Typography>
        <Typography>
          How do we simplify representing information with data?
        </Typography>
      </BulletPoints>
    </>
  );
}

function Learnable1() {
  const { updateVisiblity } = useLearnableContext();

  useEffect(() => {
    updateVisiblity(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BulletPoints>
        <Typography>
          Some candy tokens require manual acknowledgement (click the check)
        </Typography>
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
          Most candy tokens are earned through interaction
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Button
          onClick={() => {
            onLearn();
          }}
        >
          Press Me!
        </Button>
      </NestedInfo>
    </>
  );
}

function Learnable3() {
  const { onLearn } = useLearnableContext();
  return (
    <>
      <BulletPoints>
        <Typography>
          Candy tokens can be redeemed after pressing the "Can Haz Candy?"
          buttons at the end of sections
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Button
          onClick={() => {
            onLearn();
          }}
        >
          OK!
        </Button>
      </NestedInfo>
    </>
  );
}

export function OverviewSubject() {
  return (
    <Subject offset={2}>
      <BigPicture
        bulletPoints={['What are we going to learn?', 'How is candy earned?']}
      />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
    </Subject>
  );
}
