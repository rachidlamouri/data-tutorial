import { useEffect, useState } from 'react';

type TrackableInput<T extends string | number> = {
  keys: T[];
  onFinish: () => void;
};

export const useTrackable = <T extends string | number>({
  keys,
  onFinish,
}: TrackableInput<T>) => {
  const initialState = Object.fromEntries(
    keys.map((key) => {
      return [key, false];
    }),
  ) as Record<T, boolean>;

  const [trackables, setStates] = useState<Record<T, boolean>>(initialState);

  useEffect(() => {
    if (Object.values(trackables).every((value) => value)) {
      onFinish();
    }
  }, [trackables, onFinish]);

  const onTrack = (key: T) => {
    setStates((previous) => {
      return {
        ...previous,
        [key]: true,
      };
    });
  };

  return {
    onTrack,
    trackables,
  };
};
