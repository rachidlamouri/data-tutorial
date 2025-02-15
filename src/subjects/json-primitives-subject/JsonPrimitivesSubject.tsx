import { Stack, Typography, TextField, useTheme } from '@mui/material';
import { useDebounce } from '@uidotdev/usehooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import {
  byteToCharacter,
  characterToByte,
  signedDecimalToByte,
  unsignedDecimalToByte,
} from '../../memory/bitUtils';
import { OnByteChangeEvent, Byte, ByteHeader } from '../../memory/Byte';
import { InfoText } from '../../typography/InfoText';
import { Subject } from '../../layout/subject/Subject';
import { ReadOnlyMemoryCell } from '../../memory/MemoryCell';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useTrackable } from '../../learnable-provider/useTrackable';

type ByteWrapperProps = {
  index: number;
  character: string;
  onCharacterChange: (index: number, character: string) => void;
};

function ByteWrapper({
  index,
  character,
  onCharacterChange,
}: ByteWrapperProps) {
  const onByteChange = useCallback(
    (event: OnByteChangeEvent) => {
      onCharacterChange(index, event.character);
    },
    [index, onCharacterChange],
  );

  const value = useMemo(() => {
    return characterToByte(character);
  }, [character]);

  return (
    <Byte
      readonly
      readonlyCharValue={character}
      hideUnsignedInt
      value={value}
      onChange={onByteChange}
    />
  );
}

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack, trackables } = useTrackable({
    keys: [
      'positive',
      'negative',
      'fraction',
      'leading-zero',
      'leading-decimal',
      'ending-decimal',
    ],
    onFinish: onLearn,
  });

  const theme = useTheme();
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const characters = useMemo(() => {
    return debouncedText.split('');
  }, [debouncedText]);

  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(debouncedText);
  } catch {
    // no op
  }

  const isNumber = (value: unknown): value is number =>
    typeof value === 'number';

  const isJson = parsed !== undefined;
  const isPositive = isNumber(parsed) && parsed > 0;
  const isNegative = isNumber(parsed) && parsed < 0;
  const hasFraction = isNumber(parsed) && parsed.toString().includes('.');
  const printableValue = isNumber(parsed) ? parsed : 0;

  useEffect(() => {
    if (isPositive) {
      onTrack('positive');
    }

    if (isNegative) {
      onTrack('negative');
    }

    if (hasFraction) {
      onTrack('fraction');
    }

    if (debouncedText.trim().startsWith('0')) {
      onTrack('leading-zero');
    }

    if (debouncedText.trim().startsWith('.')) {
      onTrack('leading-decimal');
    }

    if (debouncedText.trim().endsWith('.')) {
      onTrack('ending-decimal');
    }
  }, [debouncedText, hasFraction, isNegative, isPositive, onTrack]);

  const buffer = new ArrayBuffer(8);
  const view = new DataView(buffer);
  view.setFloat64(0, printableValue);
  const bytes = [...new Uint8Array(view.buffer)].map((value) => {
    return unsignedDecimalToByte(value);
  });

  const onCharacterChange = useCallback(
    (index: number, newCharacter: string) => {
      setText((previous) => {
        return previous
          .split('')
          .map((oldCharacter, nextIndex) => {
            if (nextIndex === index) {
              return newCharacter;
            }

            return oldCharacter;
          })
          .join('');
      });
    },
    [setText],
  );

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Let's start with <InfoText>numbers</InfoText>
        </Typography>
        <Typography>Numbers can:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.positive} />
          <Typography>be a positive integer</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.negative} />
          <Typography>be a negative integer</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.fraction} />
          <Typography>include decimals</Typography>
        </Stack>
      </NestedInfo>
      <BulletPoints>
        <Typography>Numbers must not:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables['leading-zero']} />
          <Typography>
            start with a <InfoText>0</InfoText> unless it precedes a decimal
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables['leading-decimal']} />
          <Typography>start with a decimal</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables['ending-decimal']} />
          <Typography>end in a decimal</Typography>
        </Stack>
      </NestedInfo>
      <NestedInfo>
        <Stack gap={2} direction="row">
          <Stack gap={1}>
            <TextField
              onChange={(event) => {
                const eventValue = event.target.value;
                setText(eventValue);
              }}
              value={text}
              placeholder="type here"
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
              <ByteHeader hideUnsignedInt />
              {useMemo(() => {
                return (
                  characters.length > 0 && (
                    <>
                      {characters.map((character, index) => {
                        return (
                          <ByteWrapper
                            index={index}
                            character={character}
                            key={`${index}${character}`}
                            onCharacterChange={onCharacterChange}
                          />
                        );
                      })}
                    </>
                  )
                );
              }, [characters, onCharacterChange])}
            </Stack>
          </Stack>
          <Stack>
            <ReadOnlyMemoryCell
              label={['is JSON?', 'is JSON?']}
              value={isJson}
            />
            <ReadOnlyMemoryCell
              label={['is number?', 'is number?']}
              value={isNumber(parsed)}
            />
            <ReadOnlyMemoryCell
              label={['is positive?', 'is positive?']}
              value={isPositive}
            />
            <ReadOnlyMemoryCell
              label={['is negative?', 'is negative?']}
              value={isNegative}
            />
            <ReadOnlyMemoryCell
              label={['has fraction?', 'has fraction?']}
              value={hasFraction}
            />
          </Stack>
          <Stack
            sx={{
              border: 0.5,
              borderColor: theme.palette.action.disabled,
              borderRadius: 5,
              padding: 2,
            }}
            gap={1}
          >
            {bytes.map((byte, index) => {
              return (
                <Byte
                  key={index}
                  hideUnsignedInt
                  hideCharacter
                  readonly
                  value={byte}
                />
              );
            })}
          </Stack>
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();
  const { onTrack, trackables } = useTrackable({
    keys: ['text', 'escaped-quote'],
    onFinish: onLearn,
  });

  const theme = useTheme();
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const characters = useMemo(() => {
    return debouncedText.split('');
  }, [debouncedText]);

  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(debouncedText);
  } catch {
    // no op
  }

  const isText = (value: unknown): value is string => typeof value === 'string';

  const isJson = parsed !== undefined;
  const bytes = isText(parsed) ? parsed.split('').map(characterToByte) : [];

  useEffect(() => {
    if (isText(parsed)) {
      onTrack('text');
    }

    if (isText(parsed) && parsed.includes('"')) {
      onTrack('escaped-quote');
    }
  }, [onTrack, parsed]);

  const onCharacterChange = useCallback(
    (index: number, newCharacter: string) => {
      setText((previous) => {
        return previous
          .split('')
          .map((oldCharacter, nextIndex) => {
            if (nextIndex === index) {
              return newCharacter;
            }

            return oldCharacter;
          })
          .join('');
      });
    },
    [setText],
  );

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Next up is <InfoText>text</InfoText>
        </Typography>
        <Typography>Text must:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.text} />
          <Typography>
            Start and end with double quotes ( <InfoText>"</InfoText>like this
            <InfoText>"</InfoText> )
          </Typography>
        </Stack>
      </NestedInfo>
      <BulletPoints>
        <Typography>Text can:</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables['escaped-quote']} />
          <Typography>
            include a double quote ( <InfoText>"</InfoText> ) if it is preceded
            by a backslash ( <InfoText>\</InfoText> )
          </Typography>
        </Stack>
      </NestedInfo>
      <NestedInfo>
        <Stack gap={2} direction="row">
          <Stack gap={1}>
            <TextField
              onChange={(event) => {
                const eventValue = event.target.value;
                setText(eventValue);
              }}
              value={text}
              placeholder="type here"
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
              <ByteHeader hideUnsignedInt />
              {useMemo(() => {
                return (
                  characters.length > 0 && (
                    <>
                      {characters.map((character, index) => {
                        return (
                          <ByteWrapper
                            index={index}
                            character={character}
                            key={`${index}${character}`}
                            onCharacterChange={onCharacterChange}
                          />
                        );
                      })}
                    </>
                  )
                );
              }, [characters, onCharacterChange])}
            </Stack>
          </Stack>
          <Stack>
            <ReadOnlyMemoryCell
              label={['is JSON?', 'is JSON?']}
              value={isJson}
            />
            <ReadOnlyMemoryCell
              label={['is text?', 'is text?']}
              value={isText(parsed)}
            />
          </Stack>
          <Stack
            gap={1}
            sx={{
              border: 0.5,
              borderColor: theme.palette.action.disabled,
              borderRadius: 5,
              padding: 2,
            }}
            height="fit-content"
          >
            <ByteHeader hideUnsignedInt />
            {bytes.map((byte, index) => {
              return (
                <Byte
                  key={index}
                  hideUnsignedInt
                  readonly
                  value={byte}
                  readonlyCharValue={byteToCharacter(byte)}
                />
              );
            })}
          </Stack>
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable2() {
  const { onLearn } = useLearnableContext();
  const { onTrack, trackables } = useTrackable({
    keys: ['true', 'false'],
    onFinish: onLearn,
  });

  const theme = useTheme();
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const characters = useMemo(() => {
    return debouncedText.split('');
  }, [debouncedText]);

  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(debouncedText);
  } catch {
    // no op
  }

  const isBoolean = (value: unknown): value is boolean =>
    typeof value === 'boolean';

  const isJson = parsed !== undefined;
  const isTrue = isBoolean(parsed) && parsed;
  const isFalse = isBoolean(parsed) && !parsed;

  useEffect(() => {
    if (isTrue) {
      onTrack('true');
    }

    if (isFalse) {
      onTrack('false');
    }
  }, [isFalse, isTrue, onTrack]);

  const onCharacterChange = useCallback(
    (index: number, newCharacter: string) => {
      setText((previous) => {
        return previous
          .split('')
          .map((oldCharacter, nextIndex) => {
            if (nextIndex === index) {
              return newCharacter;
            }

            return oldCharacter;
          })
          .join('');
      });
    },
    [setText],
  );

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          <InfoText>Booleans</InfoText> are super simple:
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.true} />
          <Typography>
            type <InfoText>true</InfoText> (no double quotes)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.false} />
          <Typography>
            type <InfoText>false</InfoText> (no double quotes)
          </Typography>
        </Stack>
      </NestedInfo>
      <NestedInfo>
        <Stack gap={2} direction="row">
          <Stack gap={1}>
            <Stack gap={1}>
              <TextField
                onChange={(event) => {
                  const eventValue = event.target.value;
                  setText(eventValue);
                }}
                value={text}
                placeholder="type here"
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
                <ByteHeader hideUnsignedInt />
                {useMemo(() => {
                  return (
                    characters.length > 0 && (
                      <>
                        {characters.map((character, index) => {
                          return (
                            <ByteWrapper
                              index={index}
                              character={character}
                              key={`${index}${character}`}
                              onCharacterChange={onCharacterChange}
                            />
                          );
                        })}
                      </>
                    )
                  );
                }, [characters, onCharacterChange])}
              </Stack>
            </Stack>
          </Stack>{' '}
          <Stack>
            <ReadOnlyMemoryCell
              label={['is JSON?', 'is JSON?']}
              value={isJson}
            />
            <ReadOnlyMemoryCell
              label={['is boolean?', 'is boolean?']}
              value={isBoolean(parsed)}
            />
            <ReadOnlyMemoryCell
              label={['is true?', 'is true?']}
              value={isTrue}
            />
            <ReadOnlyMemoryCell
              label={['is false?', 'is false?']}
              value={isFalse}
            />
          </Stack>
          <Stack>
            <ByteHeader readonlyCharValue="Value" hideUnsignedInt />
            <Byte
              hideUnsignedInt
              readonlyCharValue={isBoolean(parsed) ? parsed.toString() : ''}
              readonly
              value={unsignedDecimalToByte(isTrue ? 1 : 0)}
            />
          </Stack>
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable3() {
  const { onLearn } = useLearnableContext();
  const { onTrack, trackables } = useTrackable({
    keys: ['null'],
    onFinish: onLearn,
  });

  const theme = useTheme();
  const [text, setText] = useState('');
  const debouncedText = useDebounce(text, 500);

  const characters = useMemo(() => {
    return debouncedText.split('');
  }, [debouncedText]);

  let parsed: unknown = undefined;
  try {
    parsed = JSON.parse(debouncedText);
  } catch {
    // no op
  }

  const isNull = (value: unknown): value is null =>
    typeof value === 'object' && value === null;

  const isJson = parsed !== undefined;

  useEffect(() => {
    if (isNull(parsed)) {
      onTrack('null');
    }
  }, [onTrack, parsed]);

  const onCharacterChange = useCallback(
    (index: number, newCharacter: string) => {
      setText((previous) => {
        return previous
          .split('')
          .map((oldCharacter, nextIndex) => {
            if (nextIndex === index) {
              return newCharacter;
            }

            return oldCharacter;
          })
          .join('');
      });
    },
    [setText],
  );

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          <InfoText>Null</InfoText> is even simpler:
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <ReadOnlyMemoryCell value={trackables.null} />
          <Typography>
            just type <InfoText>null</InfoText> (lowercase no double quotes)
          </Typography>
        </Stack>
      </NestedInfo>
      <NestedInfo>
        <Stack gap={2} direction="row">
          <Stack gap={1}>
            <Stack gap={1}>
              <TextField
                onChange={(event) => {
                  const eventValue = event.target.value;
                  setText(eventValue);
                }}
                value={text}
                placeholder="type here"
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
                <ByteHeader hideUnsignedInt />
                {useMemo(() => {
                  return (
                    characters.length > 0 && (
                      <>
                        {characters.map((character, index) => {
                          return (
                            <ByteWrapper
                              index={index}
                              character={character}
                              key={`${index}${character}`}
                              onCharacterChange={onCharacterChange}
                            />
                          );
                        })}
                      </>
                    )
                  );
                }, [characters, onCharacterChange])}
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <ReadOnlyMemoryCell
              label={['is JSON?', 'is JSON?']}
              value={isJson}
            />
            <ReadOnlyMemoryCell
              label={['is null?', 'is null?']}
              value={isNull(parsed)}
            />
          </Stack>
          <Stack>
            <ByteHeader readonlyCharValue="Value" />
            <Byte
              showLastBorder
              readonly
              value={signedDecimalToByte(140)}
              readonlyUIntValue={`${140}`}
              readonlyCharValue={isNull(parsed) ? 'NULL' : ''}
            />
          </Stack>
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

export function JsonPrimitivesSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={['How can we encode basic data types with JSON?']}
      />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
    </Subject>
  );
}
