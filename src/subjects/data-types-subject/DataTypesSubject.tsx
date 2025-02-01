import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Input, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Byte } from '../../memory/Byte';
import { Subject } from '../../layout/subject/Subject';

function Learnable0() {
  const [firstValue, setFirstValue] = useState(5);
  const [secondValue, setSecondValue] = useState('5'.charCodeAt(0));

  const formatLabel = (value: number) => {
    return (
      <Stack>
        <Typography>
          Character Interpretation:{' '}
          <Typography color="secondary" component="span">
            {String.fromCharCode(value)}
          </Typography>
        </Typography>
        <Typography>
          Integer Interpretation:{' '}
          <Typography color="secondary" component="span">
            {value}
          </Typography>
        </Typography>
      </Stack>
    );
  };

  return (
    <>
      <BulletPoints>
        <Typography>
          Notice that the bits for a numeric character are different than the
          bits for a number
        </Typography>
      </BulletPoints>
      <Stack alignItems="center" gap={1}>
        <Input
          onChange={(event) => {
            const eventValue = event.target.value;
            const characters = eventValue.split('');

            const nextCharacter = characters[characters.length - 1];
            if (
              !['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(
                nextCharacter,
              )
            ) {
              return;
            }

            setFirstValue(Number.parseInt(nextCharacter));
            setSecondValue(nextCharacter.charCodeAt(0));
          }}
          value={firstValue}
          sx={{
            width: 30,
          }}
          inputProps={{
            style: { textAlign: 'center' },
          }}
        />
        <Stack direction="row" gap={1}>
          <Byte disabled value={secondValue} label={formatLabel(secondValue)} />
          <Byte disabled value={firstValue} label={formatLabel(firstValue)} />
        </Stack>
      </Stack>
    </>
  );
}

function Learnable1() {
  return (
    <>
      <BulletPoints>
        <Typography>You can do math with numbers</Typography>
      </BulletPoints>
    </>
  );
}

function Learnable2() {
  return (
    <>
      <BulletPoints>
        <Typography>
          You can teeeeechnically do math with characters (but we shouldn't)
        </Typography>
      </BulletPoints>
    </>
  );
}

function Learnable3() {
  return (
    <>
      <BulletPoints>
        <Typography>
          Notice that storing a number as characters can require more bits than
          interpreting it as a number
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
    </Subject>
  );
}
