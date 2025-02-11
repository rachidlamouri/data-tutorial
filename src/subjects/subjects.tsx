import { ReactNode } from 'react';
import { DataSubject } from './data-subject/DataSubject';
import { CombinationsSubject } from './combinations-subject/CombinationsSubject';
import { NumberEncodingsSubject } from './number-encodings-subject/NumberEncodingsSubject';
import { MoreCandySubject } from './more-candy-subject';
import { DataTypesSubject } from './data-types-subject/DataTypesSubject';
import { TextEncodingsSubject } from './text-encodings-subject/TextEncodingsSubject';
import { EncodingSubject } from './encoding-subject/EncodingSubject';
import { BooleanSubject } from './boolean-subject/BooleanSubject';
import { NullSubject } from './null-subject/NullSubject';
import { RecapSubject } from './recap-subject/RecapSubject';
import { JsonSubject } from './json-subject/JsonSubject';
import { JsonPrimitivesSubject } from './json-primitives-subject/JsonPrimitivesSubject';

export type Subject = {
  index: number;
  title: ReactNode;
  Component: () => ReactNode;
};

export const subjects: Subject[] = [
  { title: 'What is data?', Component: DataSubject },
  { title: 'Combinations', Component: CombinationsSubject },
  { title: 'Encoding', Component: EncodingSubject },
  {
    title: (
      <>
        Number
        <br />
        Encodings
      </>
    ),
    Component: NumberEncodingsSubject,
  },
  {
    title: (
      <>
        More
        <br />
        Candy Pls
      </>
    ),
    Component: MoreCandySubject,
  },
  {
    title: (
      <>
        Text
        <br />
        Encodings
      </>
    ),
    Component: TextEncodingsSubject,
  },
  { title: 'Data Types', Component: DataTypesSubject },
  { title: 'Boolean', Component: BooleanSubject },
  { title: 'Null', Component: NullSubject },
  {
    title: (
      <>
        Recap
        <br />
        Beach Episode
      </>
    ),
    Component: RecapSubject,
  },
  { title: 'JSON', Component: JsonSubject },
  {
    title: (
      <>
        JSON
        <br />
        Primitives
      </>
    ),
    Component: JsonPrimitivesSubject,
  },
].map((subject, index) => {
  return {
    index,
    ...subject,
  };
});
