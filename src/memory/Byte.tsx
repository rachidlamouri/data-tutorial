import { Register } from './Register';

type ByteProps = {
  onChange?: (value: number, bits: boolean[]) => void;
  label?: string;
  value?: number;
};

export function Byte(props: ByteProps) {
  return <Register showBorder {...props} size={8} />;
}
