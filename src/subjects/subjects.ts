import { ReactNode } from 'react';
import { DataSubject } from './data-subject/DataSubject';
import { CombinationsSubject } from './combinations-subject/CombinationsSubject';

export type Subject = {
  index: number;
  title: string;
  Component: () => ReactNode;
};

export const subjects: Subject[] = [
  { title: 'What is data?', Component: DataSubject },
  { title: 'Combinations', Component: CombinationsSubject },
].map((subject, index) => {
  return {
    index,
    ...subject,
  };
});
