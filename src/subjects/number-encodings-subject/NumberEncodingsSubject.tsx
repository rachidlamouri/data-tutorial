import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Input, Stack, Typography, useTheme } from '@mui/material';
import { Byte, ByteHeader, ByteTrackable } from '../../memory/Byte';
import { useMemo, useState } from 'react';
import { Subject } from '../../layout/subject/Subject';
import {
  bitsToUnsignedDecimal,
  unsignedDecimalToBits,
  unsignedDecimalToByte,
} from '../../memory/bitUtils';
import { InfoOutlined } from '@mui/icons-material';
import { InfoText } from '../../typography/InfoText';
import { Underline } from '../../typography/Underline';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [ByteTrackable.Bit, ByteTrackable.UInt, 255],
    onFinish: onLearn,
  });

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
            You can interact with the memory cells <InfoText>and</InfoText>{' '}
            number field below
          </Typography>
        </Stack>
      </BulletPoints>
      <NestedInfo>
        <ByteHeader hideCharacter readonlyUIntValue="Int" />
        <Byte
          hideCharacter
          onChange={({ unsignedDecimal, trackable }) => {
            if (
              trackable === ByteTrackable.Bit ||
              trackable === ByteTrackable.UInt
            ) {
              onTrack(trackable);
            }

            if (unsignedDecimal === 255) {
              onTrack(unsignedDecimal);
            }
          }}
        />
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [
      ByteTrackable.Bit,
      ByteTrackable.UInt,
      ByteTrackable.SInt,
      0,
      127,
      -1,
    ],
    onFinish: onLearn,
  });

  return (
    <Stack gap={2}>
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
      <NestedInfo>
        <ByteHeader showSignedInt hideCharacter />
        <Byte
          showSignedInt
          hideCharacter
          initialUIntValue={128}
          onChange={({ signedDecimal, trackable }) => {
            if (
              trackable === ByteTrackable.Bit ||
              trackable === ByteTrackable.UInt ||
              trackable === ByteTrackable.SInt
            ) {
              onTrack(trackable);
            }

            if (
              signedDecimal === 0 ||
              signedDecimal === 127 ||
              signedDecimal === -1
            ) {
              onTrack(signedDecimal);
            }
          }}
        />
      </NestedInfo>
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
    </Stack>
  );
}

function Learnable2() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1, 2, 3, 'input'],
    onFinish: onLearn,
  });

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
    <Stack gap={2}>
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
      <NestedInfo>
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
                onTrack(0);
                onByteChange([bits, bytes[1], bytes[2], bytes[3]]);
              }}
              value={bytes[0]}
            />
            <Byte
              hideUnsignedInt
              hideCharacter
              onChange={({ bits }) => {
                onTrack(1);
                onByteChange([bytes[0], bits, bytes[2], bytes[3]]);
              }}
              value={bytes[1]}
            />
            <Byte
              hideUnsignedInt
              hideCharacter
              onChange={({ bits }) => {
                onTrack(2);
                onByteChange([bytes[0], bytes[1], bits, bytes[3]]);
              }}
              value={bytes[2]}
            />
            <Byte
              hideUnsignedInt
              hideCharacter
              onChange={({ bits }) => {
                onTrack(3);
                onByteChange([bytes[0], bytes[1], bytes[2], bits]);
              }}
              value={bytes[3]}
            />
          </Stack>
          <Input
            error={!isUnsignedInputValid}
            onChange={(event) => {
              onTrack('input');

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
      </NestedInfo>
    </Stack>
  );
}

export function NumberEncodingsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={['What are some standard number encodings?']} />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
    </Subject>
  );
}
