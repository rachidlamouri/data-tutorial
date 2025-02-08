import { BigPicture } from '../../layout/BigPicture';
import { BulletPoints } from '../../layout/BulletPoints';
import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { Underline } from '../../typography/Underline';
import { InfoText } from '../../typography/InfoText';
import { MemoryCell, ReadOnlyMemoryCell } from '../../memory/MemoryCell';
import { Subject } from '../../layout/subject/Subject';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { unsignedDecimalToByte } from '../../memory/bitUtils';
import { Byte } from '../../memory/Byte';
import { useState } from 'react';

function Learnable0() {
  return (
    <>
      <BulletPoints>
        <Typography>
          A <Underline>boolean</Underline> is something that is either{' '}
          <InfoText>true</InfoText> or <InfoText>false</InfoText>
        </Typography>
        <Typography>This can be represented by a single memory cell</Typography>
      </BulletPoints>
      <NestedInfo>
        <MemoryCell label={['false', 'true']} />
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  const [value, setValue] = useState(unsignedDecimalToByte(0));

  const isTrue = value.some((bit) => bit);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          With gigabytes of memory available we can just use a whole byte
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Byte
          hideUnsignedInt
          value={value}
          readonlyCharValue={isTrue ? 'true' : 'false'}
          onChange={(event) => {
            setValue(event.bits);
          }}
        />
      </NestedInfo>
    </Stack>
  );
}

function Learnable2() {
  const [isPixelGood, setIsPixelGood] = useState(true);
  const [isNoelGood, setIsNoelGood] = useState(true);

  const isPixelGoodAndIsNoelGood = isPixelGood && isNoelGood;
  const isPixelGoodOrIsNoelGood = isPixelGood || isNoelGood;
  const notIsPixelGood = !isPixelGood;
  const notIsNoelGood = !isNoelGood;
  const isPixelGoodXorIsNoelGood =
    (isPixelGood && !isNoelGood) || (!isPixelGood && isNoelGood);

  return (
    <>
      <BulletPoints>
        <Typography>
          You can make more complex boolean statements with the operators{' '}
          <InfoText>AND</InfoText>, <InfoText>OR</InfoText>, and{' '}
          <InfoText>NOT</InfoText>
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Pixel is a good doggy</TableCell>
              <TableCell>
                <MemoryCell
                  label={['false', 'true']}
                  onChange={setIsPixelGood}
                  value={isPixelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Noel is a good doggy</TableCell>
              <TableCell>
                <MemoryCell
                  label={['false', 'true']}
                  onChange={setIsNoelGood}
                  value={isNoelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Pixel is a good doggy <InfoText>AND</InfoText> Noel is a good
                doggy
              </TableCell>
              <TableCell>
                <ReadOnlyMemoryCell
                  label={['false', 'true']}
                  value={isPixelGoodAndIsNoelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Pixel is a good doggy <InfoText>OR</InfoText> Noel is a good
                doggy
              </TableCell>
              <TableCell>
                <ReadOnlyMemoryCell
                  label={['false', 'true']}
                  value={isPixelGoodOrIsNoelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InfoText>NOT</InfoText> Pixel is a good doggy
              </TableCell>
              <TableCell>
                <ReadOnlyMemoryCell
                  label={['false', 'true']}
                  value={notIsPixelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <InfoText>NOT</InfoText> Noel is a good doggy
              </TableCell>
              <TableCell>
                <ReadOnlyMemoryCell
                  label={['false', 'true']}
                  value={notIsNoelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                Pixel is a good doggy <InfoText>AND</InfoText>{' '}
                <InfoText>NOT</InfoText> Noel is a good doggy
                <br />
                <InfoText>OR</InfoText>
                <br />
                <InfoText>NOT</InfoText> Pixel is a good doggy{' '}
                <InfoText>AND</InfoText> Noel is a good doggy{' '}
              </TableCell>
              <TableCell>
                <ReadOnlyMemoryCell
                  label={['false', 'true']}
                  value={isPixelGoodXorIsNoelGood}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </NestedInfo>
    </>
  );
}

export function BooleanSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={['What is a boolean?', 'What can you do with booleans?']}
      />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
    </Subject>
  );
}
