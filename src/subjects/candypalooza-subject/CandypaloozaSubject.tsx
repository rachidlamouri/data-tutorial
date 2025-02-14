import { Button } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { Subject } from '../../layout/subject/Subject';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';

function Learnable0() {
  const { onLearn } = useLearnableContext();

  return (
    <>
      <Button onClick={onLearn}>Omnomnom</Button>
    </>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();

  return (
    <>
      <Button onClick={onLearn}>Omnomnomnomnom</Button>
    </>
  );
}

export function CandypaloozaSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={[
          'Buy a woman eat candy, she day, teach candy woman to a lifetime',
        ]}
      />
      <Learnable0 />
      <Learnable1 />
    </Subject>
  );
}
