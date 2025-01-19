import { createContext, PropsWithChildren, useContext } from 'react';
import { useSubjectContext } from '../subject-provider/SubjectProvider';

type LearnableCtx = {
  index: number;
  isVisible: boolean;
  isLearned: boolean;
  updateVisiblity: (value: boolean) => void;
  updateLearned: (value: boolean) => void;
  onLearn: () => void;
};

const LearnableContext = createContext<LearnableCtx>({
  index: -1,
  isVisible: false,
  isLearned: false,
  updateVisiblity: () => {},
  updateLearned: () => {},
  onLearn: () => {},
});

type LearnableProviderProps = PropsWithChildren<{
  index: number;
  forceVisible: boolean;
}>;

export function LearnableProvider({
  index,
  children,
  forceVisible,
}: LearnableProviderProps) {
  const { getState, onVisibleChange, onLearnChange } = useSubjectContext();
  const { isVisible, isLearned } = getState(index);

  return (
    <LearnableContext.Provider
      value={{
        index,
        isVisible: forceVisible || isVisible,
        isLearned,
        updateVisiblity: (value) => {
          onVisibleChange(index, value);
        },
        updateLearned: (value) => {
          onLearnChange(index, value);
        },
        onLearn: () => {
          if (!isVisible) {
            onVisibleChange(index, true);
            onLearnChange(index, true);
          }
        },
      }}
    >
      {children}
    </LearnableContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLearnableContext = () => {
  const context = useContext(LearnableContext);
  return context;
};
