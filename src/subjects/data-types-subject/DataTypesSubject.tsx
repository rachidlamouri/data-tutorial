import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Byte } from '../../memory/Byte';
import { Subject } from '../../layout/subject/Subject';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import {
  bitsToUnsignedDecimal,
  byteToCharacter,
  characterToByte,
  unsignedDecimalToBits,
  unsignedDecimalToByte,
} from '../../memory/bitUtils';
import { Underline } from '../../typography/Underline';

function Learnable0() {
  const [firstValue, setFirstValue] = useState(0);
  const [secondValue, setSecondValue] = useState(0);
  const sumDecimal = firstValue + secondValue;
  const sumBits = unsignedDecimalToBits(sumDecimal, 16);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Computers can do math with bits which means they can do math with
          numbers
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              hideCharacter
              onChange={(event) => {
                setFirstValue(event.unsignedDecimal);
              }}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              hideCharacter
              onChange={(event) => {
                setSecondValue(event.unsignedDecimal);
              }}
            />
          </Stack>
          <Divider />
          <Stack direction="row" gap={1}>
            <Byte
              readonly
              hideUnsignedInt
              hideCharacter
              value={sumBits.slice(0, 8)}
            />
            <Byte
              readonly
              readonlyUIntValue={`${sumDecimal}`}
              hideCharacter
              value={sumBits.slice(8, 16)}
            />
          </Stack>
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable1() {
  const [firstValue, setFirstValue] = useState(characterToByte('A'));
  const [secondValue, setSecondValue] = useState(characterToByte('B'));
  const sumDecimal =
    bitsToUnsignedDecimal(firstValue) + bitsToUnsignedDecimal(secondValue);
  const sumBits = unsignedDecimalToBits(sumDecimal, 16);
  const firstSumByte = sumBits.slice(0, 8);
  const secondSumByte = sumBits.slice(8, 16);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>Which means you can do math with text</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              onChange={(event) => {
                setFirstValue(event.bits);
              }}
              value={firstValue}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              onChange={(event) => {
                setSecondValue(event.bits);
              }}
              value={secondValue}
            />
          </Stack>
          <Divider />
          <Stack direction="row" gap={1}>
            <Byte readonly hideUnsignedInt hideCharacter value={firstSumByte} />
            <Byte
              readonly
              readonlyUIntValue={`${sumDecimal}`}
              readonlyCharValue={`${byteToCharacter(firstSumByte)}${byteToCharacter(secondSumByte)}`}
              value={secondSumByte}
            />
          </Stack>
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable2() {
  const theme = useTheme();
  const value = 207;

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Notice that the text representation of a number takes up more memory
          than the number representation of a number
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Byte readonly value={unsignedDecimalToByte(value)} />
      </NestedInfo>
      <NestedInfo>
        <Stack
          gap={1}
          width="fit-content"
          sx={{
            border: 0.5,
            borderColor: theme.palette.action.disabled,
            borderRadius: 5,
            padding: 2,
          }}
        >
          {value
            .toString()
            .split('')
            .map((renderedCharacter, renderedIndex) => {
              return (
                <Byte
                  hideUnsignedInt
                  key={renderedIndex}
                  value={characterToByte(renderedCharacter)}
                  readonly
                />
              );
            })}
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable3() {
  return (
    <>
      <BulletPoints>
        <Typography>
          It's important to specify <Underline>data types</Underline>, since
          they drastically change how a program uses that data
        </Typography>
        <Typography>
          So far we have learned two <Underline>data types</Underline>:{' '}
          <Underline>text</Underline> and <Underline>number</Underline>
        </Typography>
        <Typography>
          Next we'll learn about <Underline>boolean</Underline> and{' '}
          <Underline>null</Underline>
        </Typography>
      </BulletPoints>
    </>
  );
}

export function DataTypesSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={[
          'How does changing the interpretation of data change its behavior?',
        ]}
      />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
    </Subject>
  );
}
