export const unsignedDecimalToBits = (
  unsignedDecimal: number,
  bitCount: number,
): boolean[] => {
  const bits = unsignedDecimal
    .toString(2)
    .padStart(bitCount, '0')
    .split('')
    .map((character) => {
      return character === '1';
    });

  return bits;
};

export const unsignedDecimalToByte = (unsignedDecimal: number): boolean[] => {
  const bits = unsignedDecimalToBits(unsignedDecimal, 8);

  return bits;
};

export const signedDecimalToByte = (signedDecimal: number): boolean[] => {
  const isNegative = signedDecimal < 0;
  const unsignedDecimal = isNegative ? signedDecimal + 128 : signedDecimal;

  const firstBit = isNegative;
  const otherBits = unsignedDecimalToBits(unsignedDecimal, 7);

  return [firstBit, ...otherBits];
};

export const bitsToUnsignedDecimal = (bits: boolean[]): number => {
  const byteText = bits.map((bit) => (bit ? '1' : '0')).join('');
  const unsignedDecimal = Number.parseInt(byteText, 2);
  return unsignedDecimal;
};

export const byteToSignedDecimal = (bits: boolean[]): number => {
  const [firstBit, ...otherBits] = bits;

  const firstBitDecimal = firstBit ? -128 : 0;
  const otherBitsDecimal = bitsToUnsignedDecimal(otherBits);

  const unsignedDecimal = firstBitDecimal + otherBitsDecimal;
  return unsignedDecimal;
};

export const unsignedDecimalToCharacter = (decimal: number) => {
  return String.fromCharCode(decimal);
};

export const characterToDecimal = (character: string) => {
  return character.charCodeAt(0);
};

export const characterToByte = (character: string) => {
  const unsignedDecimalValue = characterToDecimal(character);
  const bits = unsignedDecimalToByte(unsignedDecimalValue);
  return bits;
};
