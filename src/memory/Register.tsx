import { ReactNode, useCallback, useMemo, useState } from 'react';
import { MemoryCell, MemoryCellProps, ReadOnlyMemoryCell } from './MemoryCell';
import { Stack, Typography, useTheme } from '@mui/material';

type RegisterProps = {
  isSigned?: boolean;
  onChange?: (value: number, bits: boolean[]) => void;
  labels?: Record<number, string>;
  size?: number;
  label?: ReactNode;
  showBorder?: boolean;
  value?: number;
  initialValue?: number;
  disabled?: boolean;
  hideCombinations?: boolean;
  width?: number;
};

type BitState = {
  index: number;
  value: boolean;
};

// eslint-disable-next-line react-refresh/only-export-components
export const computeDecimalValue = (bits: boolean[]) => {
  const bitText = bits.map((value) => (value ? '1' : '0')).join('');
  const decimalValue = Number.parseInt(bitText, 2);
  return decimalValue;
};

export function Register({
  onChange,
  labels = {},
  size,
  label,
  value: controlledValue,
  initialValue: controlledInitialValue,
  disabled,
  hideCombinations = false,
  width,
}: RegisterProps) {
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

  const showBorder = bitCount > 1;

  const template = useMemo(() => {
    return Array.from({ length: bitCount }).map((_, index) => index);
  }, [bitCount]);

  const initialValue = useMemo<BitState[]>(() => {
    if (controlledInitialValue !== undefined && size !== undefined) {
      return Number(controlledInitialValue)
        .toString(2)
        .padStart(size, '0')
        .split('')
        .map((character, index) => {
          return {
            index,
            value: character === '1',
          };
        });
    }

    return template.map((index) => ({
      index,
      value: false,
    }));
  }, [size, controlledInitialValue, template]);

  const [internalBitStates, setBitStates] = useState(initialValue);
  const bitStates =
    controlledValue !== undefined && size !== undefined
      ? Number(controlledValue)
          .toString(2)
          .padStart(size, '0')
          .split('')
          .map((character, index) => {
            return {
              index,
              value: character === '1',
            };
          })
      : internalBitStates;
  const bits = internalBitStates.map(({ value }) => value);
  const decimalValue = computeDecimalValue(bits);

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

      const newBits = newBitStates.map(({ value }) => value);
      setBitStates(newBitStates);
      onChange?.(computeDecimalValue(newBits), newBits);
    },
    [bitStates, onChange],
  );

  return (
    <Stack direction="row" alignItems="center" gap={1} width="fit-content">
      <Stack alignItems="center" sx={{ width }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            border: 0.5,
            borderColor: showBorder
              ? theme.palette.action.disabled
              : 'transparent',
            borderRadius: 50,
          }}
        >
          {template.map((index) => {
            const cellProps: MemoryCellProps = {
              disabled,
              onChange: (value) => {
                setBitState(index, value);
              },
              value: bitStates[index].value,
            };

            const Component = disabled ? ReadOnlyMemoryCell : MemoryCell;

            return <Component {...cellProps} key={index} />;
          })}
        </Stack>
        <Typography color="secondary">
          {!hideLabels &&
            !hideCombinations &&
            labels !== undefined &&
            labels[decimalValue]}
        </Typography>
        {label !== undefined && typeof label === 'string' ? (
          <Typography color="secondary">{label}</Typography>
        ) : (
          label
        )}
      </Stack>
      {!hideLabels && !hideCombinations && (
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
                      ? theme.palette.secondary.main
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
      <Typography color="secondary">
        {!hideLabels &&
          hideCombinations &&
          labels !== undefined &&
          labels[decimalValue]}
      </Typography>
    </Stack>
  );
}
