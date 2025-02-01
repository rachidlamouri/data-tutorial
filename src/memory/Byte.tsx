import { ReactNode } from 'react';
import { Register } from './Register';

type ByteProps = {
  onChange?: (value: number, bits: boolean[]) => void;
  label?: ReactNode;
  value?: number;
  initialValue?: number;
  disabled?: boolean;
};

export function Byte(props: ByteProps) {
  return <Register showBorder {...props} size={8} />;
}
