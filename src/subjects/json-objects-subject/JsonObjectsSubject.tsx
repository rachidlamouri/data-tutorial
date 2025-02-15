import { Button, Stack, TextField, Typography } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Subject } from '../../layout/subject/Subject';
import { InfoText } from '../../typography/InfoText';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { ReadOnlyMemoryCell } from '../../memory/MemoryCell';
import { useEffect, useState } from 'react';
import { ByteHeader } from '../../memory/Byte';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack, trackables } = useTrackable({
    keys: ['object', 'empty', 'one', 'multiple', 'subobject'],
    onFinish: onLearn,
  });

  const [text, setText] = useState('');

  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(text);
  } catch {
    // no op
  }

  const isObject = (value: unknown): value is Record<string, unknown> =>
    typeof value === 'object' && value !== null;

  const isJson = parsed !== undefined;
  const objectValues = isObject(parsed) ? Object.values(parsed) : [];
  const keyCount = isObject(parsed) ? objectValues.length : '';
  const hasNumber =
    isObject(parsed) && objectValues.some((value) => typeof value === 'number');
  const hasText =
    isObject(parsed) && objectValues.some((value) => typeof value === 'string');
  const hasBoolean =
    isObject(parsed) &&
    objectValues.some((value) => typeof value === 'boolean');
  const hasNull =
    isObject(parsed) &&
    objectValues.some((value) => typeof value === 'object' && value === null);
  const hasList =
    isObject(parsed) && objectValues.some((value) => Array.isArray(value));
  const hasObject = isObject(parsed) && objectValues.some(isObject);

  useEffect(() => {
    const object = isObject(parsed) ? parsed : null;

    if (object) {
      onTrack('object');

      const values = Object.values(object);

      if (values.length === 0) {
        onTrack('empty');
      }

      if (values.length === 1) {
        onTrack('one');
      }

      if (values.length > 1) {
        onTrack('multiple');
      }

      if (values.some(isObject)) {
        onTrack('subobject');
      }
    }
  }, [onTrack, parsed]);

  return (
    <>
      <BulletPoints>
        <Typography>
          A JSON <InfoText>object</InfoText> lets us give readable names to
          different pieces of data via keys
        </Typography>
        <Typography>
          For example, a dog object could specify the keys "name", "weight",
          "is-good" ...etc
        </Typography>
        <Typography>
          Objects contain key / value pairs. So in the dog example the
          respective values would be text, a number, and a boolean
        </Typography>
        <Typography>All keys must be text</Typography>
        <Typography>An object must:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.object} />
          <Typography>
            start with a left curly bracket ( <InfoText>{'{'}</InfoText> ) and
            end with a right curly bracket ( <InfoText>{'}'}</InfoText> )
          </Typography>
        </Stack>
      </NestedInfo>
      <BulletPoints>
        <Typography>An object can:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.empty} />
          <Typography>
            contain zero key / value pairs (<InfoText>be empty</InfoText>)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.one} />
          <Typography>
            contain one <InfoText>text key</InfoText> followed by a colon ({' '}
            <InfoText>:</InfoText> ) followed by a{' '}
            <InfoText>JSON value</InfoText>. ie a key / value pair
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.multiple} />
          <Typography>
            contain multiple <InfoText>key / value pairs</InfoText> separated by
            commas
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.subobject} />
          <Typography>
            contain other <InfoText>objects</InfoText>!
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
              label={['is object?', 'is object?']}
              value={isObject(parsed)}
            />
            <Typography>Key count: {keyCount}</Typography>
            <ReadOnlyMemoryCell
              label={['has number value?', 'has number value?']}
              value={hasNumber}
            />
          </Stack>
          <Stack>
            <ReadOnlyMemoryCell
              label={['has text value?', 'has text value?']}
              value={hasText}
            />
            <ReadOnlyMemoryCell
              label={['has boolean value?', 'has boolean value?']}
              value={hasBoolean}
            />
            <ReadOnlyMemoryCell
              label={['has null value?', 'has null value?']}
              value={hasNull}
            />
            <ReadOnlyMemoryCell
              label={['has list value?', 'has list value?']}
              value={hasList}
            />
            <ReadOnlyMemoryCell
              label={['has object value?', 'has object value?']}
              value={hasObject}
            />
          </Stack>
        </Stack>
      </NestedInfo>
    </>
  );
}

export function JsonObjectsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={[
          'How can we specify more than one easily identifiable value with JSON?',
        ]}
      />
      <Learnable0 />
    </Subject>
  );
}
