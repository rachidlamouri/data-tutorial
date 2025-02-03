import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Circle as CircleIcon,
  ElectricBolt as ElectricBoltIcon,
  Album as AlbumIcon,
  HorizontalRule as HorizontalRuleIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  Square as SquareIcon,
  Construction as ConstructionIcon,
  Forest as ForestIcon,
  FlipCameraAndroid as AnalogyIcon,
  Hub as HubIcon,
  CircleOutlined,
  SquareOutlined,
  InfoOutlined,
} from '@mui/icons-material';
import { MemoryCell } from '../../memory/MemoryCell';
import { Subject } from '../../layout/subject/Subject';
import { BigPicture } from '../../layout/BigPicture';
import { DataExampleTable } from './DataExampleTable';
import { InformationExampleTable } from './InformationExampleTable';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { BulletPoints } from '../../layout/BulletPoints';
import { Underline } from '../../typography/Underline';
import { Register } from '../../memory/Register';
import { NestedInfo } from '../../layout/learnable/NestedInfo';

function Analogy() {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <AnalogyIcon sx={{ fontSize: 80 }} />
      <Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <HubIcon color="info" fontSize="small" />
          <Typography>
            <Underline>Data</Underline>: atoms and molecules
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <ForestIcon color="info" fontSize="small" />
          <Typography>
            <Underline>Information</Underline>: identifiable things (like trees)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <CircleIcon color="info" fontSize="small" />
          <Typography>
            <Underline>Memory Cell</Underline>: subatomic particle
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Learnable0() {
  const { onLearn } = useLearnableContext();

  const [hasBeenOn, setHasBeenOn] = useState(false);
  const [hasBeenOff, setHasBeenOff] = useState(false);

  useEffect(() => {
    if (hasBeenOn && hasBeenOff) {
      onLearn();
    }
  }, [hasBeenOff, hasBeenOn, onLearn]);

  return (
    <>
      <BulletPoints>
        <Typography>
          A <Underline>memory cell</Underline>
          is something that can exist in one of two ways
        </Typography>
        <Stack direction="row" gap={1} alignItems="center">
          <InfoOutlined color="info" fontSize="small" />
          <Typography>The circle below is interactive!</Typography>
        </Stack>
      </BulletPoints>
      <NestedInfo>
        <MemoryCell
          IconComponent={CircleIcon}
          onChange={(value) => {
            if (value) {
              setHasBeenOn(true);
            } else {
              setHasBeenOff(true);
            }
          }}
        />
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();
  const [states, setStates] = useState({
    wire: false,
    cd: false,
    hd: false,
    ssd: false,
  });

  useEffect(() => {
    if (Object.values(states).every((value) => value)) {
      onLearn();
    }
  }, [states, onLearn]);

  return (
    <>
      <BulletPoints>
        <Typography>Regardless of physical medium</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            size="large"
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                wire: true,
              }));
            }}
          >
            {({ color }) => {
              return (
                <>
                  <HorizontalRuleIcon />
                  <ElectricBoltIcon
                    color={color}
                    sx={{
                      zIndex: 10,
                      fontSize: 12,
                      position: 'absolute',
                    }}
                  />
                </>
              );
            }}
          </MemoryCell>
          <Typography>Electricity in a wire</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                cd: true,
              }));
            }}
            size="large"
          >
            {({ color }) => {
              return (
                <>
                  <AlbumIcon />
                  <CircleIcon
                    color={color}
                    sx={{
                      zIndex: 10,
                      fontSize: 4,
                      position: 'absolute',
                      left: '31%',
                    }}
                  />
                </>
              );
            }}
          </MemoryCell>
          <Typography>
            Laser light reflecting off of a pit burned into a cd or dvd
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                hd: true,
              }));
            }}
            size="large"
          >
            {({ color }) => {
              return (
                <>
                  <SquareIcon />
                  <ExploreOutlinedIcon
                    color={color}
                    sx={{
                      zIndex: 10,
                      fontSize: 8,
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                    }}
                  />
                </>
              );
            }}
          </MemoryCell>
          <Typography>
            The north/south orientation of a magnet in a hard drive
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                ssd: true,
              }));
            }}
            size="large"
          >
            {({ color }) => {
              return (
                <>
                  <SquareIcon />
                  <CircleIcon
                    color={color}
                    sx={{
                      zIndex: 10,
                      fontSize: 4,
                      position: 'absolute',
                      left: '55%',
                      top: '55%',
                    }}
                  />
                </>
              );
            }}
          </MemoryCell>
          <Typography>
            Electrons trapped in a transistor within a solid state drive
          </Typography>
        </Stack>
      </NestedInfo>
    </>
  );
}

function Learnable2() {
  const { onLearn, isVisible } = useLearnableContext();
  const [states, setStates] = useState({
    shapes: false,
    characters: false,
    symbols: false,
    bit: false,
  });

  useEffect(() => {
    if (!isVisible && Object.values(states).every((value) => value)) {
      onLearn();
    }
  }, [states, onLearn, isVisible]);

  return (
    <>
      <BulletPoints>
        <Typography>Regardless of abstract representation</Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                shapes: true,
              }));
            }}
            size="large"
          >
            {({ color, isEnabled }) => {
              const IconComponent = isEnabled ? CircleOutlined : SquareOutlined;
              return <IconComponent color={color} />;
            }}
          </MemoryCell>
          <Typography>One of two shapes</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                characters: true,
              }));
            }}
            sx={{
              width: 48,
              height: 48,
            }}
          >
            {({ color, isEnabled }) => {
              return (
                <Typography color={isEnabled ? color : 'textDisabled'}>
                  {isEnabled ? 'J' : '7'}
                </Typography>
              );
            }}
          </MemoryCell>
          <Typography>One of two characters</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                symbols: true,
              }));
            }}
            size="large"
          >
            {({ color, isEnabled }) => {
              const IconComponent = isEnabled ? ForestIcon : ConstructionIcon;
              return <IconComponent color={color} />;
            }}
          </MemoryCell>
          <Typography>One of two arbitrary symbols</Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell
            onChange={() => {
              setStates((previous) => ({
                ...previous,
                bit: true,
              }));
            }}
            sx={{
              width: 48,
              height: 48,
            }}
          >
            {({ color, isEnabled }) => {
              return (
                <Typography color={isEnabled ? color : 'textDisabled'}>
                  {isEnabled ? '1' : '0'}
                </Typography>
              );
            }}
          </MemoryCell>
          <Typography noWrap>
            A zero or one: a <Underline>bi</Underline>
            nary digi
            <Underline>t</Underline> (a <Underline>bit</Underline>)
          </Typography>
        </Stack>
      </NestedInfo>
    </>
  );
}

function Learnable3() {
  const { onLearn } = useLearnableContext();

  return (
    <>
      <BulletPoints>
        <Typography>
          The term "<Underline>bit</Underline>" can be used interchangeably with
          "memory cell" <Underline>without</Underline> carrying the connotation
          of boring binary math
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          hideCombinations
          onChange={() => {
            onLearn();
          }}
          labels={{
            0: '0',
            1: '1',
          }}
        />
      </NestedInfo>
    </>
  );
}

function Learnable4() {
  return (
    <>
      <BulletPoints>
        <Typography>
          <Underline>Data</Underline> is a sequence of things. The sequence
          doesn't have to mean anything
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <DataExampleTable />
      </NestedInfo>
    </>
  );
}

function Learnable5() {
  return (
    <>
      <BulletPoints>
        <Typography>
          <Underline>Information</Underline> is data with meaning
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <InformationExampleTable />
      </NestedInfo>
    </>
  );
}

function Learnable6() {
  const { onLearn } = useLearnableContext();
  const onMemoryInteract = () => {
    onLearn();
  };

  return (
    <>
      <BulletPoints>
        <Typography>
          Computer memory is data formed from billions of physical memory cells
          (bits)
        </Typography>
        <Typography>
          We can take any group of bits and assign meaning to it (more on this
          later)
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Stack direction="row" alignItems="center">
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
        </Stack>
        <Stack direction="row" alignItems="center">
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
        </Stack>
      </NestedInfo>
    </>
  );
}

export function DataSubject() {
  return (
    <Subject offset={2}>
      <BigPicture
        bulletPoints={[
          'What is data?',
          'What is data made of?',
          'What can we do with data?',
        ]}
      />
      <Analogy />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
      <Learnable4 />
      <Learnable5 />
      <Learnable6 />
    </Subject>
  );
}
