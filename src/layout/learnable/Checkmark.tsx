import { IconButton } from '@mui/material';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { Check as CheckIcon } from '@mui/icons-material';

export function Checkmark() {
  const {
    isVisible,
    isLearned,
    updateLearned: onLearnChange,
  } = useLearnableContext();

  return (
    <IconButton
      disabled={!isVisible}
      color={isLearned ? 'success' : undefined}
      onClick={() => {
        onLearnChange(!isLearned);
      }}
    >
      <CheckIcon
        sx={{
          color: isVisible ? undefined : 'transparent',
        }}
      />
    </IconButton>
  );
}
