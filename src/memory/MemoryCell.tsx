import {
  SvgIconComponent,
  Circle as CircleIcon,
  CircleOutlined,
} from '@mui/icons-material';
import { IconButton, IconButtonProps } from '@mui/material';
import React, { ReactNode, useState } from 'react';

type CellState = {
  color: React.ComponentProps<SvgIconComponent>['color'];
  isEnabled: boolean;
};

type ChildrenAccessor = (state: CellState) => ReactNode;

export type MemoryCellProps = {
  initialValue?: boolean;
  IconComponent?: SvgIconComponent;
  children?: ChildrenAccessor;
  onChange?: (value: boolean) => void;
  value?: boolean;
  size?: IconButtonProps['size'];
  sx?: IconButtonProps['sx'];
  label?: [string, string];
  disabled?: boolean;
};

export function MemoryCell({
  IconComponent = CircleIcon,
  onChange,
  initialValue,
  value,
  size,
  children,
  sx,
  label,
  disabled,
}: MemoryCellProps) {
  const [isInternallyEnabled, setIsInternallyEnabled] = useState(
    initialValue ?? false,
  );

  const isEnabled = value !== undefined ? value : isInternallyEnabled;
  const color = isEnabled ? 'primary' : 'action';

  return (
    <>
      <IconButton
        disabled={disabled}
        size={size}
        onClick={() => {
          const newValue = !isEnabled;

          setIsInternallyEnabled(newValue);
          onChange?.(newValue);
        }}
        sx={sx}
      >
        {children ? (
          children({ color, isEnabled })
        ) : (
          <IconComponent color={color} />
        )}
      </IconButton>
      {label !== undefined && label[isEnabled ? 1 : 0]}
    </>
  );
}

export function ReadOnlyMemoryCell(props: MemoryCellProps) {
  return <MemoryCell {...props} disabled IconComponent={CircleOutlined} />;
}
