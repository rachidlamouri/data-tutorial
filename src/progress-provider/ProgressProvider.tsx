import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useSubjectIndexContext } from '../subject-index-provider/SubjectIndexProvider';
import { subjects } from '../subjects/subjects';
import useLocalStorage from 'use-local-storage';

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

type ProgressProviderProps = PropsWithChildren<{
  onInit: () => void;
}>;

export function ProgressProvider({ children, onInit }: ProgressProviderProps) {
  const [initState, setInitState] = useState(false);
  const [progress, setProgress] = useLocalStorage<boolean[][]>(
    'subject-progress',
    subjects.map(() => []),
  );

  useEffect(() => {
    if (initState) {
      return;
    }

    if (progress.every((list) => list.length > 0)) {
      setInitState(true);
      onInit();
    }
  }, [initState, onInit, progress]);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        initSubjectProgress: (subjectIndex, count) => {
          if (progress[subjectIndex].length > 0) {
            return;
          }

          setProgress((previous) => {
            return previous?.map((previousSubject, index) => {
              if (index == subjectIndex) {
                return Array.from({ length: count }).map(() => false);
              }

              return previousSubject;
            });
          });
        },
        updateLearnableProgress: (subjectIndex, learnableIndex, progress) => {
          setProgress((previous) => {
            return previous?.map((previousSubject, subIndex) => {
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
