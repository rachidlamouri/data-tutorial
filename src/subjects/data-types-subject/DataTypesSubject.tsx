import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Button, Divider, Stack, Typography, useTheme } from '@mui/material';
import { useState } from 'react';
import { Byte, ByteHeader } from '../../memory/Byte';
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
import { InfoText } from '../../typography/InfoText';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1],
    onFinish: onLearn,
  });

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
            <ByteHeader hideCharacter />
          </Stack>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              hideCharacter
              onChange={(event) => {
                setFirstValue(event.unsignedDecimal);
                onTrack(0);
              }}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              hideCharacter
              onChange={(event) => {
                setSecondValue(event.unsignedDecimal);
                onTrack(1);
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
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1],
    onFinish: onLearn,
  });

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
        <Stack direction="row" gap={1}>
          <Byte hideBits hideUnsignedInt hideCharacter />
          <ByteHeader />
        </Stack>
        <Stack gap={1}>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              onChange={(event) => {
                setFirstValue(event.bits);
                onTrack(0);
              }}
              value={firstValue}
            />
          </Stack>
          <Stack direction="row" gap={1}>
            <Byte hideBits hideUnsignedInt hideCharacter />
            <Byte
              onChange={(event) => {
                setSecondValue(event.bits);
                onTrack(1);
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
  const { onLearn } = useLearnableContext();
  const theme = useTheme();
  const value = 107;

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Notice that the <InfoText>integer</InfoText> representation of a
          number can take up <InfoText>less</InfoText> memory than the{' '}
          <InfoText>text</InfoText> representation of the same number
        </Typography>
      </BulletPoints>
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
          <ByteHeader readonlyCharValue="" />
          <Byte
            readonly
            value={unsignedDecimalToByte(value)}
            readonlyUIntValue={`${value}`}
            readonlyCharValue=""
          />
        </Stack>
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
          <ByteHeader readonlyUIntValue="" />
          {value
            .toString()
            .split('')
            .map((renderedCharacter, renderedIndex) => {
              return (
                <Byte
                  key={renderedIndex}
                  readonlyUIntValue=""
                  readonlyCharValue={renderedCharacter}
                  value={characterToByte(renderedCharacter)}
                  readonly
                />
              );
            })}
        </Stack>
      </NestedInfo>
      <NestedInfo>
        <Button
          onClick={() => {
            onLearn();
          }}
        >
          Noticed!
        </Button>
      </NestedInfo>
    </Stack>
  );
}

function Learnable3() {
  const { onLearn } = useLearnableContext();

  return (
    <Stack gap={2}>
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
      <NestedInfo>
        <Stack direction="row" gap={2}>
          <Button variant="text" onClick={onLearn}>
            Ugh
          </Button>
          <Button variant="contained" onClick={onLearn}>
            oh boy!
          </Button>
        </Stack>
      </NestedInfo>
    </Stack>
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
