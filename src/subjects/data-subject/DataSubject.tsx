import { List, ListItem, Stack, Typography } from '@mui/material';
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
} from '@mui/icons-material';
import { MemoryCell } from '../../memory/MemoryCell';
import { Subject } from '../../layout/subject/Subject';
import { BigPicture } from '../../layout/BigPicture';
import { DataExampleTable } from './DataExampleTable';
import { InformationExampleTable } from './InformationExampleTable';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { BulletPoints } from '../../layout/BulletPoints';

function Analogy() {
  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <AnalogyIcon sx={{ fontSize: 80 }} />
      <Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <HubIcon />
          <Typography>
            <Typography component="span" fontWeight="bold" noWrap>
              Data
            </Typography>
            : atoms and molecules
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <ForestIcon />
          <Typography>
            <Typography component="span" fontWeight="bold" noWrap>
              Information
            </Typography>
            : identifiable things (like trees)
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1}>
          <CircleIcon />
          <Typography>
            <Typography component="span" fontWeight="bold" noWrap>
              Memory Cell
            </Typography>
            : subatomic particle
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

function Learnable0() {
  const { updateVisiblity: onVisibleChange, updateLearned: onLearnChange } =
    useLearnableContext();

  return (
    <>
      <Typography>
        A{' '}
        <Typography component="span" fontWeight="bold" noWrap>
          memory cell{' '}
        </Typography>
        is something that can exist in one of two ways
      </Typography>
      <List>
        <ListItem>
          <Stack direction="row" alignItems="center">
            <MemoryCell
              IconComponent={CircleIcon}
              onChange={() => {
                onVisibleChange(true);
                onLearnChange(true);
              }}
            />
            <Typography variant="caption">
              (this circle is interactive!)
            </Typography>
          </Stack>
        </ListItem>
      </List>
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
      <Typography>Regardless of physical medium</Typography>
      <List>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
        </ListItem>
      </List>
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
      <Typography>Regardless of abstract representation</Typography>
      <List>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
                <Typography color={color}>{isEnabled ? 'J' : '7'}</Typography>
              );
            }}
          </MemoryCell>
          <Typography>One of two characters</Typography>
        </ListItem>
        <ListItem>
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
        </ListItem>
        <ListItem>
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
                <Typography color={color}>{isEnabled ? '1' : '0'}</Typography>
              );
            }}
          </MemoryCell>
          <Typography noWrap>
            A zero or one: a{' '}
            <Typography component="span" fontWeight="bold">
              bi
            </Typography>
            nary digi
            <Typography component="span" fontWeight="bold">
              t
            </Typography>{' '}
            (a{' '}
            <Typography component="span" fontWeight="bold">
              bit
            </Typography>
            )
          </Typography>
        </ListItem>
      </List>
    </>
  );
}

function Learnable3() {
  const { onLearn } = useLearnableContext();
  const [controlledValue, setControlledValue] = useState(false);

  return (
    <>
      <Typography>
        The term "
        <Typography component="span" fontWeight="bold">
          bit
        </Typography>
        " can be used interchangeably with "memory cell"{' '}
        <Typography component="span" fontWeight="bold">
          without
        </Typography>{' '}
        carrying the connotation of boring binary math
      </Typography>
      <List>
        <ListItem>
          <MemoryCell
            onChange={(value) => {
              setControlledValue(value);
              onLearn();
            }}
          />
          <MemoryCell value={controlledValue}>
            {({ color, isEnabled }) => {
              return (
                <Typography color={color}>{isEnabled ? '1' : '0'}</Typography>
              );
            }}
          </MemoryCell>
        </ListItem>
      </List>
    </>
  );
}

function Learnable4() {
  return (
    <>
      <Typography>
        <Typography component="span" fontWeight="bold">
          Data
        </Typography>{' '}
        is a sequence of things. The sequence doesn't have to mean anything
      </Typography>
      <DataExampleTable />
    </>
  );
}

function Learnable5() {
  return (
    <>
      <Typography>
        <Typography component="span" fontWeight="bold">
          Information
        </Typography>{' '}
        is data with meaning
      </Typography>
      <InformationExampleTable />
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
      <Stack>
        <Stack direction="row">
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
        </Stack>
        <Stack direction="row">
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} />
        </Stack>
        <Stack direction="row">
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
        </Stack>
        <Stack direction="row">
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} />
          <MemoryCell onChange={onMemoryInteract} initialValue={true} />
          <MemoryCell onChange={onMemoryInteract} />
        </Stack>
      </Stack>
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
