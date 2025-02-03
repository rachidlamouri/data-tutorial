import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Link, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Byte, ByteHeader } from '../../memory/Byte';
import { useState } from 'react';
import { Subject } from '../../layout/subject/Subject';
import { characterToByte, characterToDecimal } from '../../memory/bitUtils';
import { Register } from '../../memory/Register';
import { InfoText } from '../../typography/InfoText';
import { Underline } from '../../typography/Underline';
import { InfoOutlined } from '@mui/icons-material';
import { NestedInfo } from '../../layout/learnable/NestedInfo';

function Learnable0() {
  return (
    <>
      <BulletPoints>
        <Typography>Text is a sequence of characters</Typography>
        <Typography>So let's start with a single character</Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <InfoOutlined color="info" fontSize="small" />
          <Typography>
            You can interact with the memory cells <InfoText>and</InfoText> text
            field below
          </Typography>
        </Stack>
      </BulletPoints>
      <NestedInfo>
        <ByteHeader hideUnsignedInt />
        <Byte hideUnsignedInt initialUIntValue={characterToDecimal('A')} />
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  return (
    <>
      <BulletPoints>
        <Typography>
          Notice that the integer encoding of a numeral (<InfoText>0</InfoText>{' '}
          to <InfoText>9</InfoText>) is different than its character encoding
        </Typography>
        <Typography>We'll learn why later</Typography>
      </BulletPoints>{' '}
      <NestedInfo>
        <Stack gap={1}>
          <ByteHeader />
          <Byte initialUIntValue={5} />
          <Byte initialUIntValue={characterToDecimal('5')} />
        </Stack>
      </NestedInfo>
    </>
  );
}

function Learnable2() {
  return (
    <>
      <BulletPoints>
        <Typography>
          This character encoding is the{' '}
          <InfoText>
            American Standard Code for Information Interchange
          </InfoText>{' '}
          (<Link href="https://www.ascii-code.com/">ASCII</Link>)
        </Typography>
        <Typography>
          Computers actually use{' '}
          <InfoText>Unicode Transformation Format 8-bit</InfoText> (
          <Link href="https://www.fileformat.info/info/charset/UTF-8/list.htm">
            UTF-8
          </Link>
          ) for text, but that's more complicated
        </Typography>
        <Typography>
          The first 128 <Underline>UTF-8</Underline> codes are the{' '}
          <Underline>ASCII</Underline> codes
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          hideCombinations
          labels={{
            0: 'Cool',
            1: "Don't care",
          }}
        />
      </NestedInfo>
    </>
  );
}

function Learnable3() {
  const theme = useTheme();
  const [text, setText] = useState('Edit me!');
  const characters = text.split('');

  return (
    <>
      <BulletPoints>
        <Typography>
          Since a byte can encode a character, then a sequence of bytes can
          encode text!
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack gap={1}>
          <TextField
            onChange={(event) => {
              const eventValue = event.target.value;
              setText(eventValue);
            }}
            value={text}
          />
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
            {characters.map((renderedCharacter, renderedIndex) => {
              return (
                <Byte
                  hideUnsignedInt
                  key={renderedIndex}
                  value={characterToByte(renderedCharacter)}
                  onChange={(event) => {
                    const nextCharacters = characters.map(
                      (oldCharacter, oldIndex) => {
                        if (oldIndex === renderedIndex) {
                          return event.character;
                        }

                        return oldCharacter;
                      },
                    );

                    const nextText = nextCharacters.join('');
                    setText(nextText);
                  }}
                />
              );
            })}
          </Stack>
        </Stack>
      </NestedInfo>
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
      <Learnable2 />
      <Learnable3 />
    </Subject>
  );
}
