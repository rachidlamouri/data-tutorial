import { BigPicture } from '../../layout/BigPicture';
import { Subject } from '../../layout/subject/Subject';

export function CombinationsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={['How is information represented with bits?']}
      />
      Placeholder
    </Subject>
  );
}
