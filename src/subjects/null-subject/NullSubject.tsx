import { Stack, Typography, useTheme } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { Subject } from '../../layout/subject/Subject';
import { Underline } from '../../typography/Underline';
import { FlipCameraAndroid } from '@mui/icons-material';
import { BulletPoints } from '../../layout/BulletPoints';
import { useState } from 'react';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { bitsToUnsignedDecimal } from '../../memory/bitUtils';
import {
  ByteHeader,
  Byte,
  ByteTrackable,
  OnByteChangeHandler,
  OnByteChangeEvent,
} from '../../memory/Byte';
import { Register } from '../../memory/Register';
import { InfoText } from '../../typography/InfoText';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Analogy() {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <FlipCameraAndroid sx={{ fontSize: 80 }} />
      <BulletPoints>
        <Typography>
          <Underline>null</Underline> is a place, not a combination of bits
        </Typography>
      </BulletPoints>
    </Stack>
  );
}

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1, 2, 3, ByteTrackable.Bit, ByteTrackable.UInt],
    onFinish: onLearn,
  });

  const onByteChange: OnByteChangeHandler = ({ trackable }) => {
    if (trackable === ByteTrackable.Bit || trackable === ByteTrackable.UInt) {
      onTrack(trackable);
    }
  };

  const theme = useTheme();
  const [address, setAddress] = useState(0);
  const [values, setValues] = useState([7, 30, 19, 4]);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>Memory is addressable</Typography>
        <Typography>Use the two bits below to select an address</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack gap={1}>
          <Register
            borderColor={theme.palette.secondary.main}
            value={address}
            onChange={(value) => {
              setAddress(value);

              if (value === 0 || value === 1 || value === 2 || value === 3) {
                onTrack(value);
              }
            }}
            labels={{
              '0': '0',
              '1': '1',
              '2': '2',
              '3': '3',
            }}
            hideCombinations
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
            <ByteHeader readonlyCharValue="Value" />
            <Byte
              readonlyCharValue={`${values[0]}`}
              onChange={(event) => {
                onByteChange(event);
                setValues([
                  event.unsignedDecimal,
                  values[1],
                  values[2],
                  values[3],
                ]);
              }}
              emphasize={address === 0}
              initialUIntValue={values[0]}
            />
            <Byte
              readonlyCharValue={`${values[1]}`}
              emphasize={address === 1}
              initialUIntValue={values[1]}
              onChange={(event) => {
                onByteChange(event);
                setValues([
                  values[0],
                  event.unsignedDecimal,
                  values[2],
                  values[3],
                ]);
              }}
            />
            <Byte
              readonlyCharValue={`${values[2]}`}
              emphasize={address === 2}
              initialUIntValue={values[2]}
              onChange={(event) => {
                onByteChange(event);
                setValues([
                  values[0],
                  values[1],
                  event.unsignedDecimal,
                  values[3],
                ]);
              }}
            />
            <Byte
              readonlyCharValue={`${values[3]}`}
              emphasize={address === 3}
              initialUIntValue={values[3]}
              onChange={(event) => {
                onByteChange(event);
                setValues([
                  values[0],
                  values[1],
                  values[2],
                  event.unsignedDecimal,
                ]);
              }}
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
    keys: [0, 1, 2, 3, ByteTrackable.Bit, ByteTrackable.UInt],
    onFinish: onLearn,
  });

  const onByteChange: OnByteChangeHandler = ({ trackable }) => {
    if (trackable === ByteTrackable.Bit || trackable === ByteTrackable.UInt) {
      onTrack(trackable);
    }
  };

  const theme = useTheme();
  const [values, setValues] = useState([129, 20, 34, 5]);
  const [address, setAddress] = useState(1);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>Computer memory exists in one giant group</Typography>
        <Typography>So the address bits would be in the same group</Typography>
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
          <ByteHeader readonlyCharValue="Value" />
          <Byte
            readonlyCharValue={`${address}`}
            showLastBorder
            onChange={(event) => {
              const newIndex = bitsToUnsignedDecimal(event.bits.slice(6));
              setAddress(newIndex);
              if (
                newIndex === 0 ||
                newIndex === 1 ||
                newIndex === 2 ||
                newIndex === 3
              ) {
                onTrack(newIndex);
              }

              setValues([
                event.unsignedDecimal,
                values[1],
                values[2],
                values[3],
              ]);
            }}
            emphasize={address === 0}
            initialUIntValue={values[0]}
          />
          <Byte
            readonlyCharValue={`${values[1]}`}
            emphasize={address === 1}
            initialUIntValue={values[1]}
            onChange={(event) => {
              onByteChange(event);

              setValues([
                values[0],
                event.unsignedDecimal,
                values[2],
                values[3],
              ]);
            }}
          />
          <Byte
            readonlyCharValue={`${values[2]}`}
            emphasize={address === 2}
            initialUIntValue={values[2]}
            onChange={(event) => {
              onByteChange(event);

              setValues([
                values[0],
                values[1],
                event.unsignedDecimal,
                values[3],
              ]);
            }}
          />
          <Byte
            readonlyCharValue={`${values[3]}`}
            emphasize={address === 3}
            initialUIntValue={values[3]}
            onChange={(event) => {
              onByteChange(event);

              setValues([
                values[0],
                values[1],
                values[2],
                event.unsignedDecimal,
              ]);
            }}
          />
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable2() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1, 2, 3, 'ref'],
    onFinish: onLearn,
  });

  const theme = useTheme();
  const [values, setValues] = useState([102, 103, 104, 105]);
  const [address, setAddress] = useState(2);

  const onByteChange = ({ trackable }: OnByteChangeEvent, index: number) => {
    if (
      (trackable === ByteTrackable.Bit || trackable === ByteTrackable.UInt) &&
      index === address
    ) {
      onTrack('ref');
    }
  };

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          We can change the interpretation (value) of the address picker byte
        </Typography>
        <Typography>
          It is now the value of the address it references
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
          <ByteHeader readonlyCharValue="Value" />
          <Byte
            readonlyCharValue={`${values[address]}`}
            showLastBorder
            onChange={(event) => {
              const newIndex = bitsToUnsignedDecimal(event.bits.slice(6));
              setAddress(newIndex);
              if (
                newIndex === 0 ||
                newIndex === 1 ||
                newIndex === 2 ||
                newIndex === 3
              ) {
                onTrack(newIndex);
              }

              setValues([
                event.unsignedDecimal,
                values[1],
                values[2],
                values[3],
              ]);
            }}
            emphasize={address === 0}
            initialUIntValue={values[0]}
          />
          <Byte
            readonlyCharValue={`${values[1]}`}
            emphasize={address === 1}
            initialUIntValue={values[1]}
            onChange={(event) => {
              onByteChange(event, 1);
              setValues([
                values[0],
                event.unsignedDecimal,
                values[2],
                values[3],
              ]);
            }}
          />
          <Byte
            readonlyCharValue={`${values[2]}`}
            emphasize={address === 2}
            initialUIntValue={values[2]}
            onChange={(event) => {
              onByteChange(event, 2);
              setValues([
                values[0],
                values[1],
                event.unsignedDecimal,
                values[3],
              ]);
            }}
          />
          <Byte
            readonlyCharValue={`${values[3]}`}
            emphasize={address === 3}
            initialUIntValue={values[3]}
            onChange={(event) => {
              onByteChange(event, 3);
              setValues([
                values[0],
                values[1],
                values[2],
                event.unsignedDecimal,
              ]);
            }}
          />
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable3() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1, 2, 3, 'null', 'ref'],
    onFinish: onLearn,
  });

  const onByteChange = (index: number) => {
    if (address !== index) {
      return;
    }

    if (index === 1) {
      onTrack('null');
    }

    if (index === 2 || index === 3) {
      onTrack('ref');
    }
  };

  const theme = useTheme();
  const [values, setValues] = useState([129, 20, 200, 5]);
  const [address, setAddress] = useState(1);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Lastly we can change the interpretation of a different byte
        </Typography>
        <Typography>
          The second byte now means "null" regardless of the combination
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
          <ByteHeader readonlyCharValue="Value" />
          <Byte
            readonlyCharValue={`${address === 1 ? 'NULL' : values[address]}`}
            showLastBorder
            onChange={(event) => {
              const newIndex = bitsToUnsignedDecimal(event.bits.slice(6));
              setAddress(newIndex);
              if (
                newIndex === 0 ||
                newIndex === 1 ||
                newIndex === 2 ||
                newIndex === 3
              ) {
                onTrack(newIndex);
              }

              setValues([
                event.unsignedDecimal,
                values[1],
                values[2],
                values[3],
              ]);
            }}
            emphasize={address === 0}
            initialUIntValue={values[0]}
          />
          <Byte
            readonlyCharValue="NULL"
            emphasize={address === 1}
            initialUIntValue={values[1]}
            onChange={(event) => {
              onByteChange(1);
              setValues([
                values[0],
                event.unsignedDecimal,
                values[2],
                values[3],
              ]);
            }}
          />
          <Byte
            readonlyCharValue={`${values[2]}`}
            emphasize={address === 2}
            initialUIntValue={values[2]}
            onChange={(event) => {
              onByteChange(2);
              setValues([
                values[0],
                values[1],
                event.unsignedDecimal,
                values[3],
              ]);
            }}
          />
          <Byte
            readonlyCharValue={`${values[3]}`}
            emphasize={address === 3}
            initialUIntValue={values[3]}
            onChange={(event) => {
              onByteChange(3);
              setValues([
                values[0],
                values[1],
                values[2],
                event.unsignedDecimal,
              ]);
            }}
          />
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable4() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [0, 1, 2, 3],
    onFinish: onLearn,
  });

  const theme = useTheme();
  const [values, setValues] = useState([69, 250, 0, 0]);
  const labels = [`${values[0]}`, 'NULL', '0', 'false'];
  const [address, setAddress] = useState(1);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          <Underline>null</Underline> is data that means "no data"
        </Typography>
        <Typography>
          If you dig a hole for a tree what's the name of the tree in the hole?
          (there isn't one)
        </Typography>
        <Typography>
          <Underline>null</Underline> is different than <InfoText>0</InfoText>,{' '}
          <InfoText>false</InfoText>, or <InfoText>empty text</InfoText>
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
          <ByteHeader readonlyCharValue="Value" />
          <Byte
            readonlyCharValue={`${labels[address]}`}
            showLastBorder
            onChange={(event) => {
              const newIndex = bitsToUnsignedDecimal(event.bits.slice(6));
              setAddress(newIndex);
              if (
                newIndex === 0 ||
                newIndex === 1 ||
                newIndex === 2 ||
                newIndex === 3
              ) {
                onTrack(newIndex);
              }

              setValues([
                event.unsignedDecimal,
                values[1],
                values[2],
                values[3],
              ]);
            }}
            emphasize={address === 0}
            initialUIntValue={values[0]}
          />
          <Byte
            readonlyCharValue={`${labels[1]}`}
            emphasize={address === 1}
            initialUIntValue={values[1]}
          />
          <Byte
            readonlyCharValue={`${labels[2]}`}
            readonly
            emphasize={address === 2}
            readonlyUIntValue={`${values[2]}`}
            initialUIntValue={values[2]}
          />
          <Byte
            readonlyCharValue={`${labels[3]}`}
            readonly
            emphasize={address === 3}
            readonlyUIntValue={`${values[3]}`}
            initialUIntValue={values[3]}
          />
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

export function NullSubject() {
  return (
    <Subject offset={2}>
      <BigPicture
        bulletPoints={['What is null?', 'What is a memory address?']}
      />
      <Analogy />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
      <Learnable4 />
    </Subject>
  );
}
