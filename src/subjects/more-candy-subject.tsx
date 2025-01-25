import { BigPicture } from '../layout/BigPicture';
import { Subject } from '../layout/subject/Subject';

export function MoreCandySubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['That was a lot', 'We need more candy']} />
    </Subject>
  );
}
