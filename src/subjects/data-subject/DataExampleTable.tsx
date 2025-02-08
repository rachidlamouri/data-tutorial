import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Stack,
  useTheme,
} from '@mui/material';
import { useState, useCallback, useEffect } from 'react';
import { MemoryCell } from '../../memory/MemoryCell';
import {
  CircleOutlined,
  SquareOutlined,
  RectangleOutlined,
} from '@mui/icons-material';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
export function DataExampleTable() {
  const theme = useTheme();
  const [interactCount1, setInteractCount1] = useState(0);
  const [interactCount2, setInteractCount2] = useState(0);
  const { onLearn } = useLearnableContext();

  useEffect(() => {
    if (
      interactCount1 >= 1 &&
      interactCount2 >= 1 &&
      interactCount1 + interactCount2 >= 3
    ) {
      onLearn();
    }
  }, [interactCount1, interactCount2, onLearn]);

  const [sequence, setSequence] = useState([false, true, false, false]);

  const buildOnValueChange = useCallback(
    (isFirstGroup: boolean, index: number) => {
      return (newValue: boolean) => {
        if (isFirstGroup) {
          setInteractCount1((prev) => prev + 1);
        } else {
          setInteractCount2((prev) => prev + 1);
        }

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
            <pre style={{ color: theme.palette.secondary.main }}>XK7G4</pre>
          </TableCell>
          <TableCell>
            <Typography>A sequence of characters</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <CircleOutlined color="secondary" />
            <SquareOutlined color="secondary" />
            <RectangleOutlined color="secondary" />
          </TableCell>
          <TableCell>
            <Typography>A sequence of shapes</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <Stack direction="row">
              <MemoryCell
                value={sequence[0]}
                onChange={buildOnValueChange(true, 0)}
              />
              <MemoryCell
                value={sequence[1]}
                onChange={buildOnValueChange(true, 1)}
                initialValue={true}
              />
              <MemoryCell
                value={sequence[2]}
                onChange={buildOnValueChange(true, 2)}
              />
              <MemoryCell
                value={sequence[3]}
                onChange={buildOnValueChange(true, 3)}
              />
            </Stack>
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
                  onChange={buildOnValueChange(false, 0)}
                />
                <MemoryCell
                  value={sequence[1]}
                  onChange={buildOnValueChange(false, 1)}
                  initialValue={true}
                />
              </Stack>
              <Stack direction="row">
                <MemoryCell
                  value={sequence[2]}
                  onChange={buildOnValueChange(false, 2)}
                />
                <MemoryCell
                  value={sequence[3]}
                  onChange={buildOnValueChange(false, 3)}
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
