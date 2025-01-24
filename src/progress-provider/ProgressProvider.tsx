import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { useSubjectIndexContext } from '../subject-index-provider/SubjectIndexProvider';
import { subjects } from '../subjects/subjects';

type ProgressCtx = {
  progress: boolean[][];
  initSubjectProgress: (subjectIndex: number, count: number) => void;
  updateLearnableProgress: (
    subjectIndex: number,
    learnableIndex: number,
    progress: boolean,
  ) => void;
};

const ProgressContext = createContext<ProgressCtx>({
  progress: [],
  initSubjectProgress: () => {},
  updateLearnableProgress: () => {},
});

type ProgressProviderProps = PropsWithChildren;

export function ProgressProvider({ children }: ProgressProviderProps) {
  const [progress, setProgress] = useState<boolean[][]>(subjects.map(() => []));

  return (
    <ProgressContext.Provider
      value={{
        progress,
        initSubjectProgress: (subjectIndex, count) => {
          setProgress((previous) => {
            return previous.map((previousSubject, index) => {
              if (index == subjectIndex) {
                return Array.from({ length: count }).map(() => false);
              }

              return previousSubject;
            });
          });
        },
        updateLearnableProgress: (subjectIndex, learnableIndex, progress) => {
          setProgress((previous) => {
            return previous.map((previousSubject, subIndex) => {
              if (subIndex == subjectIndex) {
                return previousSubject.map((previousLearnable, learnIndex) => {
                  if (learnIndex == learnableIndex) {
                    return progress;
                  }

                  return previousLearnable;
                });
              }

              return previousSubject;
            });
          });
        },
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSubjectProgress = () => {
  const subjectIndex = useSubjectIndexContext();
  const { progress, initSubjectProgress, updateLearnableProgress } =
    useContext(ProgressContext);

  return {
    subjectProgress: progress[subjectIndex],
    initSubjectProgress: (learnableCount: number) => {
      initSubjectProgress(subjectIndex, learnableCount);
    },
    updateLearnableProgress: (
      learnableIndex: number,
      learnableProgress: boolean,
    ) => {
      updateLearnableProgress(subjectIndex, learnableIndex, learnableProgress);
    },
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const useProgress = () => {
  const { progress } = useContext(ProgressContext);
  return { progress };
};
