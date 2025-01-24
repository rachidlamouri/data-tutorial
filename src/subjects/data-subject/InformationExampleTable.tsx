import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  useTheme,
} from '@mui/material';
import { MemoryCell } from '../../memory/MemoryCell';
import {
  RectangleOutlined,
  CircleOutlined,
  SquareOutlined,
} from '@mui/icons-material';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';

export function InformationExampleTable() {
  const theme = useTheme();
  const { onLearn } = useLearnableContext();

  const onMemoryInteract = () => {
    onLearn();
  };

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            <pre style={{ color: theme.palette.secondary.main }}>RACHID</pre>
          </TableCell>
          <TableCell>
            <Typography>
              A name represented by a sequence of characters
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RectangleOutlined color="secondary" />
            <RectangleOutlined color="secondary" />
            <CircleOutlined color="secondary" />
            <RectangleOutlined color="secondary" />
            <SquareOutlined color="secondary" />
          </TableCell>
          <TableCell>
            <Typography>
              A secret code represented by a sequence of shapes
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <MemoryCell onChange={onMemoryInteract} />
            <MemoryCell onChange={onMemoryInteract} />
            <MemoryCell onChange={onMemoryInteract} initialValue={true} />
            <MemoryCell onChange={onMemoryInteract} />
          </TableCell>
          <TableCell>
            <Typography>
              Bits can be used to represent anything. You can choose what this
              data represents (more on this in the next subject)
            </Typography>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
