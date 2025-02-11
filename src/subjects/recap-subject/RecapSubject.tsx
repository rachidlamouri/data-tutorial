import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import { Subject } from '../../layout/subject/Subject';
import { Byte, ByteHeader, OnByteChangeEvent } from '../../memory/Byte';
import { MemoryCell } from '../../memory/MemoryCell';
import {
  CircleOutlined,
  SquareOutlined,
  RectangleOutlined,
  Forest,
} from '@mui/icons-material';
import { Register } from '../../memory/Register';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { InfoText } from '../../typography/InfoText';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDebounce } from '@uidotdev/usehooks';
import { characterToByte } from '../../memory/bitUtils';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';

function Learnable0() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>Data, in the abstract, is a sequence of things</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row">
          <CircleOutlined color="secondary" />
          <SquareOutlined color="secondary" />
          <RectangleOutlined color="secondary" />
        </Stack>
      </NestedInfo>
    </Stack>
  );
}

function Learnable1() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          Data, physically, is a sequence of memory cells (bits)
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row">
          <MemoryCell />
          <MemoryCell />
        </Stack>
      </NestedInfo>
    </>
  );
}

function Learnable2() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>Information is data with meaning</Typography>
      </BulletPoints>
      <NestedInfo>
        <MemoryCell label={["I don't want candy", 'I do want candy']} />
      </NestedInfo>
    </>
  );
}

function Learnable3() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <Stack gap={1}>
      <BulletPoints>
        <Typography>
          Combinations of bits can represent different things
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          hideCombinations
          labels={{
            0: 'Hamburger',
            1: 'Cheemburger',
            2: 'Bergburger',
            3: 'Porkburger',
          }}
        />
      </NestedInfo>
    </Stack>
  );
}

function Learnable4() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          Changing the interpretation of bits changes its meaning
        </Typography>
        <Typography>This changes the information it represents</Typography>
      </BulletPoints>
      <ByteHeader />
      <Byte initialUIntValue={65} />
    </>
  );
}

function Learnable5() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          Communicating the correct data types is important when making an app
        </Typography>
        <Typography>Computers are dumb</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography color="secondary">How many trees?</Typography>
          <Stack direction="row">
            <Forest />
            <Forest />
            <Forest />
          </Stack>
          <MemoryCell label={['false', 'true']} />
        </Stack>
      </NestedInfo>
    </>
  );
}

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

function Learnable6() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  const theme = useTheme();
  const [text, setText] = useState('this is fine');
  const debouncedText = useDebounce(text, 500);

  const characters = useMemo(() => {
    return debouncedText.split('');
  }, [debouncedText]);

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
        <Typography>Working directly with bits sucks</Typography>
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
      </NestedInfo>
    </Stack>
  );
}

function Learnable7() {
  const { updateVisiblity } = useLearnableContext();
  useEffect(() => {
    updateVisiblity(true);
  }, [updateVisiblity]);

  return (
    <>
      <BulletPoints>
        <Typography>
          What if we could communicate information <InfoText>and</InfoText> data
          types with just <InfoText>text</InfoText>?
        </Typography>
        <Typography>
          What if computers could read that text and understand the information
          as well?
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <MemoryCell label={['Woah!', "jk don't care"]} />
      </NestedInfo>
    </>
  );
}

export function RecapSubject() {
  return (
    <Subject offset={1}>
      <BigPicture bulletPoints={["What's the point?"]} />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
      <Learnable4 />
      <Learnable5 />
      <Learnable6 />
      <Learnable7 />
    </Subject>
  );
}
