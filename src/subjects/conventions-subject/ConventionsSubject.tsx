import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Input, Link, Stack, Typography, useTheme } from '@mui/material';
import { Byte } from '../../memory/Byte';
import { useState } from 'react';
import { Subject } from '../../layout/subject/Subject';
import { computeDecimalValue } from '../../memory/Register';

function Learnable0() {
  const [value, setValue] = useState(0);

  return (
    <>
      <BulletPoints>
        <Typography>
          Storing a positive integer in a byte is super simple
        </Typography>
        <Typography>
          We just map combinations of bits to the numbers 0 to 255
        </Typography>
      </BulletPoints>
      <Byte onChange={setValue} label={`${value}`} />
    </>
  );
}

function Learnable1() {
  const [bits, setBits] = useState<boolean[]>(
    Array.from({ length: 8 }).map(() => false),
  );
  const [firstBit, ...otherBits] = bits;
  const negativePart = firstBit ? -128 : 0;
  const positivePart = computeDecimalValue(otherBits);
  const value = positivePart + negativePart;

  return (
    <>
      <BulletPoints>
        <Typography>
          For positive and negative integers we use the range -128 to 127
        </Typography>
        <Typography>This is called a signed integer</Typography>
      </BulletPoints>
      <Byte
        onChange={(_value, nextBits) => {
          setBits(nextBits);
        }}
        label={`${value}`}
      />
      <BulletPoints>
        <Typography>All bits set to off represents 0</Typography>
        <Typography>If only the left bit is on it's -128</Typography>
        <Typography>If all bits, but the left are on it's 127</Typography>
        <Typography>If all bits are on it's -1</Typography>
      </BulletPoints>
    </>
  );
}

function Learnable2() {
  const theme = useTheme();
  const [allBytes, setAllBits] = useState(
    Array.from({ length: 4 }).map(() => {
      return Array.from({ length: 8 }).map(() => false);
    }),
  );

  const value = computeDecimalValue(allBytes.flat());

  return (
    <>
      <BulletPoints>
        <Typography>
          Want to store a bigger number? Just group some bytes!
        </Typography>
        <Typography>
          This is a four byte unsigned (ie. positive) integer
        </Typography>
      </BulletPoints>
      <Stack alignItems="center">
        <Stack
          gap={1}
          sx={{
            border: 0.5,
            borderColor: theme.palette.action.disabled,
            borderRadius: 5,
            padding: 2,
          }}
          alignItems="center"
        >
          <Byte
            onChange={(_value, bits) => {
              setAllBits([bits, ...allBytes.slice(1, 4)]);
            }}
          />
          <Byte
            onChange={(_value, bits) => {
              setAllBits([
                ...allBytes.slice(0, 1),
                bits,
                ...allBytes.slice(2, 4),
              ]);
            }}
          />
          <Byte
            onChange={(_value, bits) => {
              setAllBits([
                ...allBytes.slice(0, 2),
                bits,
                ...allBytes.slice(3, 4),
              ]);
            }}
          />
          <Byte
            onChange={(_value, bits) => {
              setAllBits([...allBytes.slice(0, 3), bits]);
            }}
          />
        </Stack>
        <Typography color="secondary">{value}</Typography>
      </Stack>
    </>
  );
}

function Learnable3() {
  const [isByteControlled, setIsByteControlled] = useState(true);
  const [character, setCharacter] = useState('A');
  const [decimalValue, setDecimalValue] = useState('A'.charCodeAt(0));

  return (
    <>
      <BulletPoints>
        <Typography>Want to store text?</Typography>
        <Typography>Let's start with a single character</Typography>
        <Typography>
          You can interact with the byte and the character input below
        </Typography>
      </BulletPoints>
      <Stack alignItems="center">
        <Byte
          onChange={(value) => {
            setIsByteControlled(false);
            setDecimalValue(value);
            setCharacter(String.fromCharCode(value));
          }}
          label={`${decimalValue}`}
          value={isByteControlled ? decimalValue : undefined}
        />
        <Input
          onChange={(event) => {
            const eventValue = event.target.value;
            const characters = eventValue.split('');

            const nextCharacter = characters[characters.length - 1];
            if (nextCharacter === undefined) {
              return;
            }

            setIsByteControlled(true);
            setDecimalValue(nextCharacter.charCodeAt(0));
            setCharacter(nextCharacter);
          }}
          value={character}
          sx={{
            width: 30,
          }}
          inputProps={{
            style: { textAlign: 'center' },
          }}
        />
      </Stack>
      <BulletPoints>
        <Typography>
          You can find all character codes here:{' '}
          <Link href="https://www.ascii-code.com/">ASCII</Link>
        </Typography>
        <Typography>
          We actually use{' '}
          <Link href="https://www.fileformat.info/info/charset/UTF-8/list.htm">
            Unicode Transformation Format - 8-bit (UTF-8)
          </Link>{' '}
          for text, but that's more complicated
        </Typography>
        <Typography>The first 128 UTF-8 codes are the ASCII codes</Typography>
      </BulletPoints>
    </>
  );
}

function Learnable4() {
  const [text, setText] = useState(' Hello  ');

  return (
    <>
      <BulletPoints>
        <Typography>
          Text is just a sequence of bytes where each byte is a character
        </Typography>
      </BulletPoints>
      <Stack gap={1}>
        {text.split('').map((character, index) => {
          return (
            <Byte
              onChange={(value) => {
                const newTextList = text.split('');
                newTextList[index] = String.fromCharCode(value);
                const newText = newTextList.join('');
                setText(newText);
              }}
              label={character}
            />
          );
        })}
      </Stack>
      <BulletPoints>
        <Typography>
          {
            'Think about how many bytes it takes to represent this sentence (129 bytes including this part in parenthesis, which is 1032 bits)'
          }
        </Typography>
      </BulletPoints>
    </>
  );
}

export function ConventionsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={[
          'What are the standards for storing information with bits?',
        ]}
      />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
      <Learnable4 />
    </Subject>
  );
}
