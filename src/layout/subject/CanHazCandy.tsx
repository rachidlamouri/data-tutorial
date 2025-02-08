import { Button } from '@mui/material';
import { useSubjectContext } from '../../subject-provider/SubjectProvider';
import { ArrowUpward } from '@mui/icons-material';

export function CanHazCandy() {
  const subject = useSubjectContext();

  return (
    <Button
      startIcon={<ArrowUpward />}
      onClick={() => {
        subject.showAll();
        window.scrollTo({
          top: 0,
        });
      }}
      sx={{
        width: 'fit-content',
      }}
    >
      Can Haz Candy?
    </Button>
  );
}
