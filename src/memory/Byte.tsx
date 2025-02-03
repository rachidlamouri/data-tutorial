import { ReactNode, useMemo, useState } from 'react';
import { Register } from './Register';
import { Input, Stack, useTheme } from '@mui/material';
import { MemoryCell } from './MemoryCell';
import {
  bitsToUnsignedDecimal,
  byteToCharacter,
  byteToSignedDecimal,
  characterToByte,
  signedDecimalToByte,
  unsignedDecimalToByte,
  unsignedDecimalToCharacter,
} from './bitUtils';

type OldByteProps = {
  onChange?: (value: number, bits: boolean[]) => void;
  label?: ReactNode;
  value?: number;
  initialValue?: number;
  disabled?: boolean;
};

export function OldByte(props: OldByteProps) {
  return <Register showBorder {...props} size={8} />;
}

type OnByteChangeHandlerEvent = {
  bits: boolean[];
  unsignedDecimal: number;
  character: string;
};

type OnByteChangeHandler = (event: OnByteChangeHandlerEvent) => void;

type EncodedByteProps = {
  hideBits?: boolean;
  hideUnsignedInt?: boolean;
  showSignedInt?: boolean;
  hideCharacter?: boolean;
  initialUIntValue?: number;
  readonlyUIntValue?: string;
  readonlySIntValue?: string;
  readonlyCharValue?: string;
  onChange?: OnByteChangeHandler;
  value?: boolean[];
};

export function Byte({
  hideBits = false,
  hideUnsignedInt = false,
  showSignedInt = false,
  hideCharacter = false,
  initialUIntValue,
  readonlyUIntValue,
  readonlySIntValue,
  readonlyCharValue,
  onChange,
  value,
}: EncodedByteProps) {
  const theme = useTheme();

  const init = useMemo(() => {
    const unsignedDecimal =
      initialUIntValue !== undefined ? initialUIntValue : 0;

    const bits = unsignedDecimalToByte(unsignedDecimal);

    return {
      bits,
      unsignedDecimal,
      signedDecimal: byteToSignedDecimal(bits),
      character: unsignedDecimalToCharacter(unsignedDecimal),
    };
  }, [initialUIntValue]);

  const [bits, setBits] = useState(init.bits);
  const renderedBits = value !== undefined ? value : bits;

  const [unsignedNumberInput, setUnsignedNumberInput] = useState(
    init.unsignedDecimal.toString(),
  );
  const [isUnsignedInputValid, setIsUnsignedInputValid] = useState(true);

  const [signedNumberInput, setSignedNumberInput] = useState(
    init.signedDecimal.toString(),
  );
  const [isSignedInputValid, setIsSignedInputValid] = useState(true);

  const [character, setCharacter] = useState(init.character);
  const renderedCharacter =
    value !== undefined ? byteToCharacter(value) : character;

  const onBitsChange = (newBits: boolean[]) => {
    const unsignedDecimal = bitsToUnsignedDecimal(newBits);
    const signedDecimal = byteToSignedDecimal(newBits);
    const character = unsignedDecimalToCharacter(unsignedDecimal);

    setBits(newBits);
    setUnsignedNumberInput(unsignedDecimal.toString());
    setIsUnsignedInputValid(true);
    setSignedNumberInput(signedDecimal.toString());
    setIsSignedInputValid(true);
    setCharacter(character);

    onChange?.({
      bits: newBits,
      unsignedDecimal,
      character,
    });
  };

  return (
    <Stack direction="row" gap={3}>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          opacity: hideBits ? 0 : 1,
          border: 0.5,
          borderColor: theme.palette.action.disabled,
          borderRadius: 50,
        }}
      >
        {renderedBits.map((renderedBit, renderedBitIndex) => {
          return (
            <MemoryCell
              key={renderedBitIndex}
              value={renderedBit}
              onChange={(newBit) => {
                const newBits = renderedBits.map((oldBit, oldBitIndex) => {
                  if (oldBitIndex === renderedBitIndex) {
                    return newBit;
                  }

                  return oldBit;
                });

                onBitsChange(newBits);
              }}
            />
          );
        })}
      </Stack>
      {!hideUnsignedInt && (
        <Input
          disabled={readonlyUIntValue !== undefined}
          error={!isUnsignedInputValid}
          onChange={(event) => {
            const textValue = event.target.value.slice(0, 3);
            const isUnsignedInteger = /[1-9]*[0-9]/.test(textValue);
            const unsignedDecimal = Number.parseInt(textValue, 10);

            setUnsignedNumberInput(textValue);

            if (
              Number.isNaN(unsignedDecimal) ||
              !isUnsignedInteger ||
              unsignedDecimal < 0 ||
              unsignedDecimal > 255
            ) {
              setIsUnsignedInputValid(false);
              return;
            }

            onBitsChange(unsignedDecimalToByte(unsignedDecimal));
          }}
          value={readonlyUIntValue ?? unsignedNumberInput}
          sx={{
            width: 40,
            color: theme.palette.warning.main,
          }}
          inputProps={{
            style: {
              textAlign: readonlyUIntValue === undefined ? 'right' : 'center',
            },
          }}
        />
      )}
      {showSignedInt && (
        <Input
          disabled={readonlySIntValue !== undefined}
          error={!isSignedInputValid}
          onChange={(event) => {
            const textValue = event.target.value.slice(0, 3);
            const isSignedInteger = /-?[1-9]*[0-9]/.test(textValue);
            const signedDecimal = Number.parseInt(textValue, 10);

            setSignedNumberInput(textValue);

            if (
              Number.isNaN(signedDecimal) ||
              !isSignedInteger ||
              signedDecimal < -128 ||
              signedDecimal > 127
            ) {
              setIsSignedInputValid(false);
              return;
            }

            onBitsChange(signedDecimalToByte(signedDecimal));
          }}
          value={readonlySIntValue ?? signedNumberInput}
          sx={{
            width: 40,
            color: theme.palette.warning.main,
          }}
          inputProps={{
            style: {
              textAlign: readonlySIntValue === undefined ? 'right' : 'center',
            },
          }}
        />
      )}
      {!hideCharacter && (
        <Input
          disabled={readonlyCharValue !== undefined}
          onChange={(event) => {
            const eventValue = event.target.value;
            const characters = eventValue.split('');

            const nextCharacter = characters[characters.length - 1];
            if (nextCharacter === undefined) {
              return;
            }

            onBitsChange(characterToByte(nextCharacter));
          }}
          value={readonlyCharValue ?? renderedCharacter}
          sx={{
            width: 40,
          }}
          inputProps={{
            style: { textAlign: 'center' },
          }}
        />
      )}
    </Stack>
  );
}

type ByteHeaderProps = {
  readonlyUIntValue?: string;
  hideUnsignedInt?: boolean;
  showSignedInt?: boolean;
  hideCharacter?: boolean;
};

export function ByteHeader({
  readonlyUIntValue = 'UInt',
  hideUnsignedInt,
  showSignedInt,
  hideCharacter,
}: ByteHeaderProps) {
  return (
    <Byte
      hideBits
      hideUnsignedInt={hideUnsignedInt}
      showSignedInt={showSignedInt}
      hideCharacter={hideCharacter}
      readonlyUIntValue={readonlyUIntValue}
      readonlySIntValue="SInt"
      readonlyCharValue="Char"
    />
  );
}
