import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSubjectProgress } from '../progress-provider/ProgressProvider';

type LearnableState = {
  isLearned: boolean;
  isVisible: boolean;
};

type SubjectCtx = {
  onLearnChange: (index: number, value: boolean) => void;
  onVisibleChange: (index: number, value: boolean) => void;
  getState: (index: number) => LearnableState;
  showAll: () => void;
};

const SubjectContext = createContext<SubjectCtx>({
  onLearnChange: () => {},
  onVisibleChange: () => {},
  getState: () => ({ isLearned: false, isVisible: false }),
  showAll: () => {},
});

type SubjectProviderProps = PropsWithChildren<{
  learnableCount: number;
}>;

export function SubjectProvider({
  learnableCount,
  children,
}: SubjectProviderProps) {
  const { initSubjectProgress, updateLearnableProgress } = useSubjectProgress();
  const [learnables, setLearnables] = useState<LearnableState[]>(
    Array.from({ length: learnableCount }).map(() => {
      return {
        isLearned: false,
        isVisible: false,
      };
    }),
  );

  useEffect(() => {
    initSubjectProgress(learnableCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SubjectContext.Provider
      value={{
        onLearnChange: (index: number, value: boolean) => {
          updateLearnableProgress(index, value);
          setLearnables((previous) => {
            return previous.map((state, mapIndex) => {
              if (mapIndex === index) {
                return {
                  ...state,
                  isLearned: value,
                };
              }

              return state;
            });
          });
        },
        onVisibleChange: (index: number, value: boolean) => {
          setLearnables((previous) => {
            return previous.map((state, mapIndex) => {
              if (mapIndex === index) {
                return {
                  ...state,
                  isVisible: value,
                };
              }

              return state;
            });
          });
        },
        getState: (index: number) => {
          if (index < 0 || index >= learnableCount) {
            throw new Error(
              `Invalid index ${index} for count ${learnableCount}`,
            );
          }

          return learnables[index];
        },
        showAll: () => {
          console.log('show all');
          setLearnables((previous) => {
            return previous.map((learnable) => {
              return {
                ...learnable,
                isVisible: true,
              };
            });
          });
        },
      }}
    >
      {children}
    </SubjectContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSubjectContext = () => {
  const context = useContext(SubjectContext);
  return context;
};
