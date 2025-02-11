import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Subject } from '../../layout/subject/Subject';

function Learnable0() {
  return (
    <>
      <BulletPoints>Omnomnomnomnom</BulletPoints>
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
    </Subject>
  );
}
