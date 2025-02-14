import {
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import { BigPicture } from '../../layout/BigPicture';
import { Subject } from '../../layout/subject/Subject';
import { Register } from '../../memory/Register';
import { BulletPoints } from '../../layout/BulletPoints';
import { useLearnableContext } from '../../learnable-provider/LearnableProvider';
import { useEffect, useState } from 'react';
import { Byte } from '../../memory/Byte';
import { Underline } from '../../typography/Underline';
import { InfoText } from '../../typography/InfoText';
import { NestedInfo } from '../../layout/learnable/NestedInfo';
import { useTrackable } from '../../learnable-provider/useTrackable';

function Learnable0() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: ['outdoors', 'candy', 'gender', 'color'],
    onFinish: onLearn,
  });

  return (
    <>
      <BulletPoints>
        <Typography>
          A single bit can only represent a tiny piece of information
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Do you prefer rocks or plants?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  onChange={() => {
                    onTrack('outdoors');
                  }}
                  labels={{
                    0: 'rocks',
                    1: 'plants',
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>How many pieces of candy do you want?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  onChange={() => {
                    onTrack('candy');
                  }}
                  labels={{
                    0: '4',
                    1: '1',
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>What is your gender?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  width={100}
                  onChange={() => {
                    onTrack('gender');
                  }}
                  labels={{
                    0: 'man',
                    1: 'non-binary',
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>What is your favorite color?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  onChange={() => {
                    onTrack('color');
                  }}
                  labels={{
                    0: 'gray',
                    1: 'poop',
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </NestedInfo>
    </>
  );
}

function Learnable1() {
  const { onLearn } = useLearnableContext();
  const { onTrack } = useTrackable({
    keys: ['food', 'candy', 'gender', 'color'],
    onFinish: onLearn,
  });

  return (
    <>
      <BulletPoints>
        <Typography>
          Instead of looking at just one bit, lets look at two bits together
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>What do you want to eat?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  onChange={() => {
                    onTrack('food');
                  }}
                  labels={{
                    0: 'burger',
                    1: 'spaget',
                    2: 'pepper',
                    3: 'feesh',
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>How many pieces of candy do you want?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  onChange={() => {
                    onTrack('candy');
                  }}
                  labels={{
                    0: '3',
                    1: '6',
                    2: '2',
                    3: '4',
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>What is your gender?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  width={100}
                  onChange={() => {
                    onTrack('gender');
                  }}
                  labels={{
                    0: 'non-bin-ary',
                    1: 'man',
                    2: 'woman',
                    3: 'indescribable',
                  }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>What is your favorite color?</Typography>
              </TableCell>
              <TableCell>
                <Register
                  onChange={() => {
                    onTrack('color');
                  }}
                  labels={{
                    0: 'red',
                    1: 'orange',
                    2: 'yellow',
                    3: 'gray',
                  }}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </NestedInfo>
    </>
  );
}

function Learnable2() {
  const [interactCount, setInteractCount] = useState(0);
  const { onLearn } = useLearnableContext();

  useEffect(() => {
    if (interactCount >= 4) {
      onLearn();
    }
  }, [interactCount, onLearn]);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>Three bits has even moooooore combinations</Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          width={150}
          onChange={() => {
            setInteractCount((previous) => previous + 1);
          }}
          labels={{
            0: 'hamburg',
            1: 'seven',
            2: 'twenty two',
            3: 'blue footed booby',
            4: 'Mr Shnuggles',
            5: 'Pixel',
            6: 'Monkey D. Fluffy',
            7: 'Noel',
          }}
        />
      </NestedInfo>
    </Stack>
  );
}

function Learnable3() {
  const [interactCount, setInteractCount] = useState(0);
  const { onLearn } = useLearnableContext();

  useEffect(() => {
    if (interactCount >= 4) {
      onLearn();
    }
  }, [interactCount, onLearn]);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>Every bit doubles the number of possibilites! </Typography>
        <Typography>
          Some smarty pants people were like "8 bits is a nice number. Let's
          call it a <Underline>byte</Underline>
          !"
        </Typography>
        <Typography>
          A <Underline>byte</Underline> has <InfoText>256</InfoText> different
          combinations!
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Byte
          hideUnsignedInt
          hideCharacter
          onChange={() => {
            setInteractCount((previous) => previous + 1);
          }}
        />
      </NestedInfo>
    </Stack>
  );
}

function Learnable4() {
  const [interactCount, setInteractCount] = useState(0);
  const { onLearn } = useLearnableContext();

  useEffect(() => {
    if (interactCount >= 2) {
      onLearn();
    }
  }, [interactCount, onLearn]);

  return (
    <Stack gap={2}>
      <BulletPoints>
        <Typography>
          Four bits is called a <Underline>nibble</Underline> lol
        </Typography>
      </BulletPoints>
      <NestedInfo>
        <Register
          onChange={() => {
            setInteractCount((previous) => previous + 1);
          }}
          size={4}
        />
      </NestedInfo>
    </Stack>
  );
}

export function CombinationsSubject() {
  return (
    <Subject offset={1}>
      <BigPicture
        bulletPoints={['How is information represented with bits?']}
      />
      <Learnable0 />
      <Learnable1 />
      <Learnable2 />
      <Learnable3 />
      <Learnable4 />
    </Subject>
  );
}
