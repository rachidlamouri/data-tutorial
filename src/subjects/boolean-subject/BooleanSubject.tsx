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
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: ['true', 'false'],
    onFinish: onLearn,
  });

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
        <MemoryCell
          label={['false', 'true']}
          onChange={(value) => {
            if (value) {
              onTrack('true');
            } else {
              onTrack('false');
            }
          }}
        />
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: ['true', 'false'],
    onFinish: onLearn,
  });

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

            if (event.unsignedDecimal === 0) {
              onTrack('false');
            } else {
              onTrack('true');
            }
          }}
        />
      </NestedInfo>
    </Stack>
  );
}

function Learnable2() {
  const compute = (isPixelGood: boolean, isNoelGood: boolean) => {
    const isPixelGoodAndIsNoelGood = isPixelGood && isNoelGood;
    const isPixelGoodOrIsNoelGood = isPixelGood || isNoelGood;
    const notIsPixelGood = !isPixelGood;
    const notIsNoelGood = !isNoelGood;
    const isPixelGoodXorIsNoelGood =
      (isPixelGood && !isNoelGood) || (!isPixelGood && isNoelGood);

    return {
      isPixelGood,
      isNoelGood,
      isPixelGoodAndIsNoelGood,
      isPixelGoodOrIsNoelGood,
      notIsPixelGood,
      notIsNoelGood,
      isPixelGoodXorIsNoelGood,
    };
  };

  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: [
      'pt',
      'pf',
      'nt',
      'nf',
      'at',
      'af',
      'ot',
      'of',
      '!pt',
      '!pf',
      '!nt',
      '!nf',
      'xt',
      'xf',
    ],
    onFinish: onLearn,
  });

  const [
    {
      isPixelGood,
      isNoelGood,
      isPixelGoodAndIsNoelGood,
      isPixelGoodOrIsNoelGood,
      notIsPixelGood,
      notIsNoelGood,
      isPixelGoodXorIsNoelGood,
    },
    setState,
  ] = useState(compute(true, true));

  const onChange = (pixel: boolean, noel: boolean) => {
    const next = compute(pixel, noel);
    setState(next);

    if (isPixelGood !== next.isPixelGood) {
      onTrack(next.isPixelGood ? 'pt' : 'pf');
    }

    if (isNoelGood !== next.isNoelGood) {
      onTrack(next.isNoelGood ? 'nt' : 'nf');
    }

    if (isPixelGoodAndIsNoelGood !== next.isPixelGoodAndIsNoelGood) {
      onTrack(next.isPixelGoodAndIsNoelGood ? 'at' : 'af');
    }

    if (isPixelGoodOrIsNoelGood !== next.isPixelGoodOrIsNoelGood) {
      onTrack(next.isPixelGoodOrIsNoelGood ? 'ot' : 'of');
    }

    if (notIsPixelGood !== next.notIsPixelGood) {
      onTrack(next.notIsPixelGood ? '!pt' : '!pf');
    }

    if (notIsNoelGood !== next.notIsNoelGood) {
      onTrack(next.notIsNoelGood ? '!nt' : '!nf');
    }

    if (isPixelGoodXorIsNoelGood !== next.isPixelGoodXorIsNoelGood) {
      onTrack(next.isPixelGoodXorIsNoelGood ? 'xt' : 'xf');
    }
  };

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
                  onChange={(value) => {
                    onChange(value, isNoelGood);
                  }}
                  value={isPixelGood}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Noel is a good doggy</TableCell>
              <TableCell>
                <MemoryCell
                  label={['false', 'true']}
                  onChange={(value) => {
                    onChange(isPixelGood, value);
                  }}
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
