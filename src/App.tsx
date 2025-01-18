import {
  AppBar,
  Box,
  Breadcrumbs,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  Circle as CircleIcon,
  SvgIconComponent,
  ElectricBolt as ElectricBoltIcon,
  Album as AlbumIcon,
  HorizontalRule as HorizontalRuleIcon,
  ExploreOutlined as ExploreOutlinedIcon,
  Square as SquareIcon,
  ChangeHistory as TriangleIcon,
  RectangleOutlined as RectangleIcon,
  Construction as ConstructionIcon,
  Forest as ForestIcon,
  CameraAltOutlined as CameraIcon,
  FlipCameraAndroid as AnalogyIcon,
  Hub as HubIcon,
} from '@mui/icons-material';
import { Learnable } from './layout/Learnable';

type MemoryCellProps = {
  initialValue?: boolean;
  IconComponent?: SvgIconComponent;
  onChange?: (value: boolean) => void;
  value?: boolean;
};

function WireMemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
    >
      <HorizontalRuleIcon />
      <ElectricBoltIcon
        color={isEnabled ? 'warning' : 'action'}
        sx={{
          zIndex: 10,
          fontSize: 12,
          position: 'absolute',
        }}
      />
    </IconButton>
  );
}

function CDMemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
    >
      <AlbumIcon />
      <CircleIcon
        color={isEnabled ? 'warning' : 'action'}
        sx={{
          zIndex: 10,
          fontSize: 4,
          position: 'absolute',
          left: '31%',
        }}
      />
    </IconButton>
  );
}

function MagnetMemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
    >
      <SquareIcon />
      <ExploreOutlinedIcon
        color={isEnabled ? 'warning' : 'action'}
        sx={{
          zIndex: 10,
          fontSize: 8,
          position: 'absolute',
          left: '50%',
          top: '50%',
        }}
      />
    </IconButton>
  );
}

function SSDMemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
    >
      <SquareIcon />
      <CircleIcon
        color={isEnabled ? 'warning' : 'action'}
        sx={{
          zIndex: 10,
          fontSize: 4,
          position: 'absolute',
          left: '55%',
          top: '55%',
        }}
      />
    </IconButton>
  );
}

function MemoryCell({
  IconComponent = CircleIcon,
  onChange,
  initialValue,
  value,
}: MemoryCellProps) {
  const [isInternallyEnabled, setIsInternallyEnabled] = useState(
    initialValue ?? false,
  );

  const isEnabled = value !== undefined ? value : isInternallyEnabled;

  return (
    <IconButton
      size="small"
      onClick={() => {
        const newValue = !isEnabled;

        setIsInternallyEnabled(newValue);
        onChange?.(newValue);
      }}
    >
      <IconComponent color={isEnabled ? 'warning' : 'action'} />
    </IconButton>
  );
}

function ShapeMemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  const IconComponent = isEnabled ? TriangleIcon : RectangleIcon;

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
      sx={{
        width: 10,
        height: 10,
      }}
    >
      <IconComponent color={isEnabled ? 'warning' : 'action'} />
    </IconButton>
  );
}

function J7MemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
      sx={{
        width: 10,
        height: 10,
      }}
    >
      <Typography color={isEnabled ? 'warning' : 'action'}>
        {isEnabled ? 'J' : '7'}
      </Typography>
    </IconButton>
  );
}

function SymbolMemoryCell() {
  const [isEnabled, setIsEnabled] = useState(false);

  const IconComponent = isEnabled ? ForestIcon : ConstructionIcon;

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsEnabled(!isEnabled);
      }}
      sx={{
        width: 10,
        height: 10,
      }}
    >
      <IconComponent color={isEnabled ? 'warning' : 'action'} />
    </IconButton>
  );
}

function BinaryDigitMemoryCell({ value }: { value?: boolean }) {
  const [isInternallyEnabled, setIsInternallyEnabled] = useState(false);

  const isEnabled = value !== undefined ? value : isInternallyEnabled;

  return (
    <IconButton
      size="large"
      onClick={() => {
        setIsInternallyEnabled(!isEnabled);
      }}
      sx={{
        width: 10,
        height: 10,
      }}
    >
      <Typography color={isEnabled ? 'warning' : 'action'}>
        {isEnabled ? 1 : 0}
      </Typography>
    </IconButton>
  );
}

function CoupledMemory() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <>
      <MemoryCell
        onChange={(value) => {
          setIsEnabled(value);
        }}
      />
      <BinaryDigitMemoryCell value={isEnabled} />
    </>
  );
}

function DataExampleTable() {
  const [sequence, setSequence] = useState([false, true, false, false]);

  const buildOnValueChange = useCallback(
    (index: number) => {
      return (newValue: boolean) => {
        setSequence((previousSequence) => {
          const newSequence = previousSequence.slice();
          newSequence[index] = newValue;
          return newSequence;
        });
      };
    },
    [setSequence],
  );

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <pre>XK7G4</pre>
          </TableCell>
          <TableCell>
            <Typography>A sequence of characters</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <CircleIcon />
            <SquareIcon />
            <RectangleIcon />
          </TableCell>
          <TableCell>
            <Typography>A sequence of shapes</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <MemoryCell value={sequence[0]} onChange={buildOnValueChange(0)} />
            <MemoryCell
              value={sequence[1]}
              onChange={buildOnValueChange(1)}
              initialValue={true}
            />
            <MemoryCell value={sequence[2]} onChange={buildOnValueChange(2)} />
            <MemoryCell value={sequence[3]} onChange={buildOnValueChange(3)} />
          </TableCell>
          <TableCell>
            <Typography>A sequence of bits</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Stack>
              <Stack direction="row">
                <MemoryCell
                  value={sequence[0]}
                  onChange={buildOnValueChange(0)}
                />
                <MemoryCell
                  value={sequence[1]}
                  onChange={buildOnValueChange(1)}
                  initialValue={true}
                />
              </Stack>
              <Stack direction="row">
                <MemoryCell
                  value={sequence[2]}
                  onChange={buildOnValueChange(2)}
                />
                <MemoryCell
                  value={sequence[3]}
                  onChange={buildOnValueChange(3)}
                />
              </Stack>
            </Stack>
          </TableCell>
          <TableCell>
            <Typography>
              The same sequence of bits displayed differently
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Breadcrumbs sx={{ flexGrow: 1 }}>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Data Tutorial
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              SELECTED
            </Typography>
          </Breadcrumbs>
        </Toolbar>
      </AppBar>
      <Stack direction="row">
        <Drawer
          variant="permanent"
          sx={{
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons={false}
            orientation="vertical"
            sx={{
              position: 'sticky',
              alignItems: 'start',
            }}
          >
            <Tab label="What is data?" />
            <Tab label="Combinations" />
            <Tab label="Computer" />
            <Tab label="Item Four" />
            <Tab label="Item Five" />
            <Tab label="Item Six" />
            <Tab label="Item Seven" />
          </Tabs>
        </Drawer>
        <Container
          sx={{
            maxHeight: '100%',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <List>
            <Learnable>
              <Stack direction="row" alignItems="center" gap={1}>
                <CameraIcon sx={{ fontSize: 80 }} />
                <Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                    <Typography>What is data?</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                    <Typography>What is data made of?</Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleIcon sx={{ fontSize: 10 }} />
                    <Typography>What can we do with data?</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Learnable>
            <Learnable>
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
            </Learnable>
            <Learnable>
              <Typography>
                Memory Cell: Something that can exist in one of two ways
              </Typography>
              <List>
                <ListItem>
                  <Stack direction="row" alignItems="center">
                    <MemoryCell IconComponent={CircleIcon} />
                    <Typography variant="caption">
                      (this circle is interactive!)
                    </Typography>
                  </Stack>
                </ListItem>
              </List>
            </Learnable>
            <Learnable>
              <Typography>Regardless of physical medium</Typography>
              <List>
                <ListItem>
                  <WireMemoryCell />
                  <Typography>Electricity in a wire</Typography>
                </ListItem>
                <ListItem>
                  <CDMemoryCell />
                  <Typography>
                    Laser light reflecting off of a pit burned into a cd or dvd
                  </Typography>
                </ListItem>
                <ListItem>
                  <MagnetMemoryCell />
                  <Typography>
                    The north/south orientation of a magnet in a hard drive
                  </Typography>
                </ListItem>
                <ListItem>
                  <SSDMemoryCell />
                  <Typography>
                    Electrons trapped in a transistor within a solid state drive
                  </Typography>
                </ListItem>
              </List>
            </Learnable>
            <Learnable>
              <Typography>Regardless of abstract representation</Typography>
              <List>
                <ListItem>
                  <ShapeMemoryCell />
                  <Typography>One of two shapes</Typography>
                </ListItem>
                <ListItem>
                  <J7MemoryCell />
                  <Typography>One of two characters</Typography>
                </ListItem>
                <ListItem>
                  <SymbolMemoryCell />
                  <Typography>One of two arbitrary symbols</Typography>
                </ListItem>
                <ListItem>
                  <BinaryDigitMemoryCell />
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
            </Learnable>
            <Learnable>
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
                  <CoupledMemory />
                </ListItem>
              </List>
            </Learnable>
            <Learnable>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Data
                </Typography>{' '}
                is a sequence of things. The sequence doesn't have to mean
                anything
              </Typography>
              <DataExampleTable />
            </Learnable>
            <Learnable>
              <Typography>
                <Typography component="span" fontWeight="bold">
                  Information
                </Typography>{' '}
                is data with meaning
              </Typography>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <pre>RACHID</pre>
                    </TableCell>
                    <TableCell>
                      <Typography>
                        A name represented by a sequence of characters
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <RectangleIcon />
                      <RectangleIcon />
                      <CircleIcon />
                      <RectangleIcon />
                      <SquareIcon />
                    </TableCell>
                    <TableCell>
                      <Typography>
                        A secret code represented by a sequence of shapes
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <MemoryCell />
                      <MemoryCell />
                      <MemoryCell initialValue={true} />
                      <MemoryCell />
                    </TableCell>
                    <TableCell>
                      <Typography>
                        Bits can be used to represent anything. You can choose
                        what this data represents (more on this in the next
                        subject)
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Learnable>
            <Learnable>
              <Typography>
                Computer memory is data formed from billions of physical memory
                cells (bits). We can take any group of bits and assign meaning
                to it.
              </Typography>
              <Stack>
                <Stack direction="row">
                  <MemoryCell />
                  <MemoryCell />
                  <MemoryCell initialValue={true} />
                  <MemoryCell initialValue={true} />
                </Stack>
                <Stack direction="row">
                  <MemoryCell />
                  <MemoryCell initialValue={true} />
                  <MemoryCell />
                  <MemoryCell />
                </Stack>
                <Stack direction="row">
                  <MemoryCell initialValue={true} />
                  <MemoryCell />
                  <MemoryCell initialValue={true} />
                  <MemoryCell />
                </Stack>
                <Stack direction="row">
                  <MemoryCell />
                  <MemoryCell />
                  <MemoryCell initialValue={true} />
                  <MemoryCell />
                </Stack>
              </Stack>
            </Learnable>
            <ListItem>
              <Button
                startIcon={<TriangleIcon />}
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                GIMME CANDY
              </Button>
            </ListItem>
          </List>
        </Container>
      </Stack>
    </Box>
  );
}

export default App;
