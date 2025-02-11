import { Button, Typography } from '@mui/material';
import { BigPicture } from '../layout/BigPicture';
import { Subject } from '../layout/subject/Subject';
import { useLearnableContext } from '../learnable-provider/LearnableProvider';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  return (
    <Button
      onClick={() => {
        onLearn();
      }}
    >
      Omnomnomnomnom
    </Button>
  );
}

export function MoreCandySubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['That was a lot', 'We need more candy']} />
      <Learnable0 />
    </Subject>
  );
}
