import { ReactNode } from 'react';
import { DataSubject } from './data-subject/DataSubject';
import { CombinationsSubject } from './combinations-subject/CombinationsSubject';
import { ConventionsSubject } from './conventions-subject/ConventionsSubject';
import { MoreCandySubject } from './more-candy-subject';
import { DataTypesSubject } from './data-types-subject/DataTypesSubject';

export type Subject = {
  index: number;
  title: string;
  Component: () => ReactNode;
};

export const subjects: Subject[] = [
  { title: 'What is data?', Component: DataSubject },
  { title: 'Combinations', Component: CombinationsSubject },
  { title: 'Conventions', Component: ConventionsSubject },
  { title: 'More Candy Pls', Component: MoreCandySubject },
  { title: 'Data Types', Component: DataTypesSubject },
].map((subject, index) => {
  return {
    index,
    ...subject,
  };
});
