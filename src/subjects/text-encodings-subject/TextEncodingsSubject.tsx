import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Link, Stack, Typography } from '@mui/material';
import { OldByte, Byte, ByteHeader } from '../../memory/Byte';
import { useState } from 'react';
import { Subject } from '../../layout/subject/Subject';
import { characterToDecimal } from '../../memory/bitUtils';

function Learnable0() {
  return (
    <>
      <BulletPoints>
        <Typography>Want to encode text?</Typography>
        <Typography>Let's start with a single character</Typography>
      </BulletPoints>
      <ByteHeader />
      <Byte initialUIntValue={characterToDecimal('A')} />
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

function Learnable1() {
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
            <OldByte
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

export function TextEncodingsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['What are some standard text encodings?']} />
      <Learnable0 />
      <Learnable1 />
    </Subject>
  );
}
