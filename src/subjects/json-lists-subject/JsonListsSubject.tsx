import { Button, Stack, TextField, Typography } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Subject } from '../../layout/subject/Subject';
import { InfoText } from '../../typography/InfoText';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { ReadOnlyMemoryCell } from '../../memory/MemoryCell';
import { useState } from 'react';
import { ByteHeader } from '../../memory/Byte';

function Learnable0() {
  const [text, setText] = useState('');

  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(text);
  } catch {
    // no op
  }

  const isList = (value: unknown): value is unknown[] => Array.isArray(value);

  const isJson = parsed !== undefined;
  const length = isList(parsed) ? parsed.length : '';
  const hasNumber =
    isList(parsed) && parsed.some((value) => typeof value === 'number');
  const hasText =
    isList(parsed) && parsed.some((value) => typeof value === 'string');
  const hasBoolean =
    isList(parsed) && parsed.some((value) => typeof value === 'boolean');
  const hasNull =
    isList(parsed) &&
    parsed.some((value) => typeof value === 'object' && value === null);
  const hasList = isList(parsed) && parsed.some(isList);

  return (
    <>
      <BulletPoints>
        <Typography>
          A JSON <InfoText>list</InfoText> lets us define a series of JSON
          values
        </Typography>
        <Typography>A list must:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell />
          <Typography>
            start with a left square bracket ( <InfoText>[</InfoText> ) and end
            with a right square bracket ( <InfoText>]</InfoText> )
          </Typography>
        </Stack>
      </NestedInfo>
      <BulletPoints>
        <Typography>A list can:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell />
          <Typography>contain zero values (be empty)</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell />
          <Typography>
            contain one JSON value (ie. <InfoText>numbers</InfoText>,{' '}
            <InfoText>text</InfoText> ...etc)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell />
          <Typography>
            contain multiple JSON values separated by commas
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell />
          <Typography>
            contain other <InfoText>lists</InfoText>!
          </Typography>
        </Stack>
        <Stack direction="row" gap={2}>
          <Stack gap={1}>
            <TextField
              multiline
              minRows={5}
              onChange={(event) => {
                setText(event.target.value);
              }}
              value={text}
            />
            <Button
              sx={{ width: 'fit-content' }}
              onClick={() => {
                try {
                  const formattedText = JSON.stringify(parsed, null, 4);
                  console.log(text, formattedText);
                  setText(formattedText);
                } catch {
                  // no op
                }
              }}
            >
              Format
            </Button>
            <ByteHeader hideCharacter hideUnsignedInt />
          </Stack>
          <Stack>
            <ReadOnlyMemoryCell
              label={['is JSON?', 'is JSON?']}
              value={isJson}
            />
            <ReadOnlyMemoryCell
              label={['is list?', 'is list?']}
              value={isList(parsed)}
            />
            <Typography>Length: {length}</Typography>
            <ReadOnlyMemoryCell
              label={['has number?', 'has number?']}
              value={hasNumber}
            />
          </Stack>
          <Stack>
            <ReadOnlyMemoryCell
              label={['has text?', 'has text?']}
              value={hasText}
            />
            <ReadOnlyMemoryCell
              label={['has boolean?', 'has boolean?']}
              value={hasBoolean}
            />
            <ReadOnlyMemoryCell
              label={['has null?', 'has null?']}
              value={hasNull}
            />
            <ReadOnlyMemoryCell
              label={['has list?', 'has list?']}
              value={hasList}
            />
          </Stack>
        </Stack>
      </NestedInfo>
    </>
  );
}

export function JsonListsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={['How can we specify more than one value with JSON?']}
      />
      <Learnable0 />
    </Subject>
  );
}
