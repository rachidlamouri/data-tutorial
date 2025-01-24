import { Register } from './Register';

type ByteProps = {
  onChange?: (value: number) => void;
};

export function Byte(props: ByteProps) {
  return <Register {...props} size={8} />;
}
