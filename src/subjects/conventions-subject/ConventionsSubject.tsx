import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Input, Link, Stack, Typography, useTheme } from '@mui/material';
import { OldByte, Byte, ByteHeader } from '../../memory/Byte';
import { useMemo, useState } from 'react';
import { Subject } from '../../layout/subject/Subject';
import {
  bitsToUnsignedDecimal,
  characterToDecimal,
  unsignedDecimalToBits,
  unsignedDecimalToByte,
} from '../../memory/bitUtils';
import { InfoOutlined } from '@mui/icons-material';
import { InfoText } from '../../typography/InfoText';
import { Underline } from '../../typography/Underline';

function Learnable0() {
  return (
    <>
      <BulletPoints>
        <Typography>
          Encoding a positive <Underline>int</Underline>
          eger in a byte is super simple
        </Typography>
        <Typography>
          We just map combinations of bits to the numbers <InfoText>0</InfoText>{' '}
          to <InfoText>255</InfoText>
        </Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <InfoOutlined color="info" fontSize="small" />
          <Typography>
            You can interact with the memory cell <InfoText>and</InfoText>{' '}
            number field below
          </Typography>
        </Stack>
      </BulletPoints>
      <ByteHeader hideCharacter readonlyUIntValue="Int" />
      <Byte hideCharacter />
    </>
  );
}

function Learnable1() {
  return (
    <>
      <BulletPoints>
        <Typography>
          To support negative integers we need to indicate the{' '}
          <Underline>sign</Underline> (ie. <Underline>+/-</Underline>)
        </Typography>
        <Typography>
          An <Underline>unsigned</Underline> integer byte represents the range{' '}
          <InfoText>0</InfoText> to <InfoText>255</InfoText>
        </Typography>
        <Typography>
          A <Underline>signed</Underline> integer byte represents the range{' '}
          <InfoText>-128</InfoText> to <InfoText>127</InfoText>
        </Typography>
      </BulletPoints>
      <ByteHeader showSignedInt hideCharacter />
      <Byte showSignedInt hideCharacter initialUIntValue={128} />
      <BulletPoints>
        <Typography>
          If only the left bit is on, then its signed value is{' '}
          <InfoText>-128</InfoText>
        </Typography>
        <Typography>
          All bits set to off represents <InfoText>0</InfoText>{' '}
        </Typography>
        <Typography>
          If all bits, but the left are on it's <InfoText>127</InfoText>{' '}
        </Typography>
        <Typography>
          If all bits are on it's <InfoText>-1</InfoText>{' '}
        </Typography>
      </BulletPoints>
    </>
  );
}

function Learnable2() {
  const MAX_VALUE = 4_294_967_295;
  const MAX_VALUE_LENGTH = MAX_VALUE.toString().length;
  const theme = useTheme();

  const init = useMemo(() => {
    const bytes = [
      unsignedDecimalToByte(0),
      unsignedDecimalToByte(0),
      unsignedDecimalToByte(0),
      unsignedDecimalToByte(0),
    ] as const;

    return {
      bytes,
      unsignedDecimal: bitsToUnsignedDecimal(bytes.flat()),
    };
  }, []);

  const [bytes, setBytes] = useState(init.bytes);

  const [unsignedNumberInput, setUnsignedNumberInput] = useState(
    init.unsignedDecimal.toString(),
  );
  const [isUnsignedInputValid, setIsUnsignedInputValid] = useState(true);

  const onByteChange = (newBytes: typeof bytes) => {
    setBytes(newBytes);
    setUnsignedNumberInput(bitsToUnsignedDecimal(newBytes.flat()).toString());
    setIsUnsignedInputValid(true);
  };

  return (
    <>
      <BulletPoints>
        <Typography>
          Want to store a bigger number? Just group some bytes!
        </Typography>
        <Typography>
          This is a four byte unsigned integer (ie. a 32 bit integer)
        </Typography>
        <Typography>
          Its maxiumum value is{' '}
          <InfoText>{MAX_VALUE.toLocaleString()}</InfoText>{' '}
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
            hideUnsignedInt
            hideCharacter
            onChange={({ bits }) => {
              onByteChange([bits, bytes[1], bytes[2], bytes[3]]);
            }}
            value={bytes[0]}
          />
          <Byte
            hideUnsignedInt
            hideCharacter
            onChange={({ bits }) => {
              onByteChange([bytes[0], bits, bytes[2], bytes[3]]);
            }}
            value={bytes[1]}
          />
          <Byte
            hideUnsignedInt
            hideCharacter
            onChange={({ bits }) => {
              onByteChange([bytes[0], bytes[1], bits, bytes[3]]);
            }}
            value={bytes[2]}
          />
          <Byte
            hideUnsignedInt
            hideCharacter
            onChange={({ bits }) => {
              onByteChange([bytes[0], bytes[1], bytes[2], bits]);
            }}
            value={bytes[3]}
          />
        </Stack>
        <Input
          error={!isUnsignedInputValid}
          onChange={(event) => {
            const textValue = event.target.value.slice(0, MAX_VALUE_LENGTH);
            const isUnsignedInteger = /[1-9]*[0-9]/.test(textValue);
            const unsignedDecimal = Number.parseInt(textValue, 10);

            setUnsignedNumberInput(textValue);

            if (
              Number.isNaN(unsignedDecimal) ||
              !isUnsignedInteger ||
              unsignedDecimal < 0 ||
              unsignedDecimal > MAX_VALUE
            ) {
              setIsUnsignedInputValid(false);
              return;
            }

            const bits = unsignedDecimalToBits(unsignedDecimal, 32);
            onByteChange([
              bits.slice(0, 8),
              bits.slice(8, 16),
              bits.slice(16, 24),
              bits.slice(24, 32),
            ]);
          }}
          value={unsignedNumberInput}
          sx={{
            width: MAX_VALUE_LENGTH * 10,
            color: theme.palette.warning.main,
          }}
          inputProps={{
            style: {
              textAlign: 'center',
            },
          }}
        />
      </Stack>
    </>
  );
}

function Learnable3() {
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

export function ConventionsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={[
          'An encoding is a standard for mapping bits to information',
          'What are some widely used encodings?',
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
