import { createContext, PropsWithChildren, useContext } from 'react';

type SubjectIndexCtx = number;

const SubjectIndexContext = createContext<SubjectIndexCtx>(-1);

type SubjectIndexProviderProps = PropsWithChildren<{
  index: number;
}>;

export function SubjectIndexProvider({
  index,
  children,
}: SubjectIndexProviderProps) {
  return (
    <SubjectIndexContext.Provider value={index}>
      {children}
    </SubjectIndexContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useSubjectIndexContext = () => useContext(SubjectIndexContext);
