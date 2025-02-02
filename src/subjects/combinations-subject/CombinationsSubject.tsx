import {
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

function Learnable0() {
  const { onLearn, isVisible } = useLearnableContext();
  const [states, setStates] = useState({
    outdoors: false,
    candy: false,
    gender: false,
    color: false,
  });

  useEffect(() => {
    if (!isVisible && Object.values(states).every((value) => value)) {
      onLearn();
    }
  }, [states, onLearn, isVisible]);

  return (
    <>
      <BulletPoints>
        <Typography>
          A single bit can only represent a tiny piece of information
        </Typography>
      </BulletPoints>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Do you prefer rocks or plants?</Typography>
            </TableCell>
            <TableCell>
              <Register
                onChange={() => {
                  setStates((previous) => ({
                    ...previous,
                    outdoors: true,
                  }));
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
                  setStates((previous) => ({
                    ...previous,
                    candy: true,
                  }));
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
                onChange={() => {
                  setStates((previous) => ({
                    ...previous,
                    gender: true,
                  }));
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
                  setStates((previous) => ({
                    ...previous,
                    color: true,
                  }));
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
    </>
  );
}

function Learnable1() {
  const { onLearn, isVisible } = useLearnableContext();
  const [states, setStates] = useState({
    food: false,
    candy: false,
    gender: false,
    color: false,
  });

  useEffect(() => {
    if (!isVisible && Object.values(states).every((value) => value)) {
      onLearn();
    }
  }, [states, onLearn, isVisible]);

  return (
    <>
      <BulletPoints>
        <Typography>
          Instead of looking at just one bit, lets look at two bits together
        </Typography>
      </BulletPoints>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>What do you want to eat?</Typography>
            </TableCell>
            <TableCell>
              <Register
                onChange={() => {
                  setStates((previous) => ({
                    ...previous,
                    food: true,
                  }));
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
                  setStates((previous) => ({
                    ...previous,
                    candy: true,
                  }));
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
                onChange={() => {
                  setStates((previous) => ({
                    ...previous,
                    gender: true,
                  }));
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
                  setStates((previous) => ({
                    ...previous,
                    color: true,
                  }));
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
    <>
      <BulletPoints>
        <Typography>Three bits has even moooooore combinations</Typography>
      </BulletPoints>
      <Register
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
    </>
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
    <>
      <BulletPoints>
        <Typography>Every bit doubles the number of possibilites! </Typography>
        <Typography>
          Some smarty pants people were like "8 bits is a nice number. Let's
          call it a <Underline>byte</Underline>
          !"
        </Typography>
        <Typography>A byte has 256 different combinations!</Typography>
      </BulletPoints>
      <Byte
        onChange={() => {
          setInteractCount((previous) => previous + 1);
        }}
      />
    </>
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
    <>
      <BulletPoints>
        <Typography>
          Four bits is called a <Underline>nibble</Underline> lol
        </Typography>
      </BulletPoints>
      <Register
        onChange={() => {
          setInteractCount((previous) => previous + 1);
        }}
        size={4}
      />
    </>
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
