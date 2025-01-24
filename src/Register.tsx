import { useCallback, useMemo, useState } from 'react';
import { MemoryCell, ReadOnlyMemoryCell } from './MemoryCell';
import { Stack, useTheme } from '@mui/material';

type RegisterProps = {
  onChange?: (value: number) => void;
  labels?: Record<number, string>;
  size?: number;
};

type BitState = {
  index: number;
  value: boolean;
};

const computeDecimalValue = (states: BitState[]) => {
  const bitText = states.map(({ value }) => (value ? '1' : '0')).join('');
  const decimalValue = Number.parseInt(bitText, 2);
  return decimalValue;
};

export function Register({ onChange, labels = {}, size }: RegisterProps) {
  const theme = useTheme();
  const hideLabels = size !== undefined;

  const possibleValues = useMemo(() => {
    if (hideLabels) {
      return [];
    }

    return Object.keys(labels).map((value) => Number.parseInt(value, 10));
  }, [hideLabels, labels]);

  const bitCount = useMemo(() => {
    return hideLabels ? size : Math.log2(possibleValues.length);
  }, [hideLabels, size, possibleValues]);

  const template = useMemo(() => {
    return Array.from({ length: bitCount }).map((_, index) => index);
  }, [bitCount]);

  const initialValue = useMemo<BitState[]>(() => {
    return template.map((index) => ({
      index,
      value: false,
    }));
  }, [template]);

  const [bitStates, setBitStates] = useState(initialValue);
  const decimalValue = computeDecimalValue(bitStates);

  const setBitState = useCallback(
    (index: number, value: boolean) => {
      const newBitStates = bitStates.map((previous, nextIndex) => {
        if (nextIndex === index) {
          return {
            index,
            value,
          };
        }

        return previous;
      });

      setBitStates(newBitStates);
      onChange?.(computeDecimalValue(newBitStates));
    },
    [bitStates, onChange],
  );

  return (
    <Stack direction="row" alignItems="center" gap={1}>
      <Stack alignItems="center">
        <Stack direction="row" alignItems="center">
          {template.map((index) => {
            return (
              <MemoryCell
                onChange={(value) => {
                  setBitState(index, value);
                }}
                value={bitStates[index].value}
                key={index}
              />
            );
          })}
        </Stack>
        {!hideLabels && labels !== undefined && labels[decimalValue]}
      </Stack>
      {!hideLabels && (
        <Stack>
          {possibleValues.map((nextDecimalValue, index) => {
            const bitList = nextDecimalValue
              .toString(2)
              .padStart(bitCount, '0')
              .split('');

            return (
              <Stack
                key={index}
                direction="row"
                sx={{
                  border: 1,
                  borderRadius: 100,
                  borderColor:
                    nextDecimalValue === decimalValue
                      ? theme.palette.primary.main
                      : 'transparent',
                }}
              >
                {bitList.map((bitValue, subindex) => {
                  return (
                    <ReadOnlyMemoryCell
                      key={subindex}
                      value={bitValue === '1'}
                    />
                  );
                })}
              </Stack>
            );
          })}
        </Stack>
      )}
    </Stack>
  );
}
