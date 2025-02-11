import { ReactNode } from 'react';
import { DataSubject } from './data-subject/DataSubject';
import { CombinationsSubject } from './combinations-subject/CombinationsSubject';
import { NumberEncodingsSubject } from './number-encodings-subject/NumberEncodingsSubject';
import { MoreCandySubject } from './MoreCandySubject';
import { DataTypesSubject } from './data-types-subject/DataTypesSubject';
import { TextEncodingsSubject } from './text-encodings-subject/TextEncodingsSubject';
import { EncodingSubject } from './encoding-subject/EncodingSubject';
import { BooleanSubject } from './boolean-subject/BooleanSubject';
import { NullSubject } from './null-subject/NullSubject';
import { RecapSubject } from './recap-subject/RecapSubject';
import { JsonSubject } from './json-subject/JsonSubject';
import { JsonPrimitivesSubject } from './json-primitives-subject/JsonPrimitivesSubject';
import { JsonListsSubject } from './json-lists-subject/JsonListsSubject';
import { JsonObjectsSubject } from './json-objects-subject/JsonObjectsSubject';
import { JsonRecapSubject } from './json-recap-subject/JsonRecapSubject';
import { OverviewSubject } from './overview-subject/OverviewSubject';
import { CandypaloozaSubject } from './candypalooza-subject/CandypaloozaSubject';

export type Subject = {
  index: number;
  title: string | (string | null)[];
  Component: () => ReactNode;
};

export const subjects: Subject[] = [
  { title: 'Overview', Component: OverviewSubject },
  { title: 'What is data?', Component: DataSubject },
  { title: 'Combinations', Component: CombinationsSubject },
  { title: 'Encoding', Component: EncodingSubject },
  {
    title: ['Number', null, 'Encodings'],
    Component: NumberEncodingsSubject,
  },
  {
    title: ['More', null, 'Candy Pls'],
    Component: MoreCandySubject,
  },
  {
    title: ['Text', null, 'Encodings'],

    Component: TextEncodingsSubject,
  },
  { title: 'Data Types', Component: DataTypesSubject },
  { title: 'Boolean', Component: BooleanSubject },
  { title: 'Null', Component: NullSubject },
  {
    title: ['Recap', null, 'Beach Episode'],

    Component: RecapSubject,
  },
  { title: 'JSON', Component: JsonSubject },
  {
    title: ['JSON', null, 'Primitives'],

    Component: JsonPrimitivesSubject,
  },
  {
    title: ['JSON', null, 'Lists'],
    Component: JsonListsSubject,
  },
  {
    title: ['JSON', null, 'Objects'],
    Component: JsonObjectsSubject,
  },
  {
    title: ['JSON', null, 'Recap'],
    Component: JsonRecapSubject,
  },
  {
    title: ['Candypalooza', null, 'Recap'],
    Component: CandypaloozaSubject,
  },
].map((subject, index) => {
  return {
    index,
    ...subject,
  };
});
