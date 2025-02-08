import { Divider, Stack } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
import { SubjectProvider } from '../../subject-provider/SubjectProvider';
import { Learnable } from '../learnable/Learnable';
import { CanHazCandy } from './CanHazCandy';
import { NestedInfo } from '../learnable/NestedInfo';

type SubjectProps = PropsWithChildren<{
  offset: number;
  children: ReactNode[] | ReactNode;
}>;

export function Subject({ offset, children }: SubjectProps) {
  const childList = Array.isArray(children) ? children : [children];
  const learnableCount = childList.length;

  return (
    <SubjectProvider learnableCount={learnableCount}>
      <Stack gap={4}>
        <Divider />
        {childList.map((child, childIndex) => {
          const offsetIndex = childIndex - offset;
          const learnableIndex =
            offsetIndex -
            learnableCount * Math.floor(offsetIndex / learnableCount);
          return (
            <>
              <Learnable key={childIndex} index={learnableIndex}>
                {child}
              </Learnable>
              <Divider />
            </>
          );
        })}
        <NestedInfo>
          <CanHazCandy />
        </NestedInfo>
        <Divider />
      </Stack>
    </SubjectProvider>
  );
}
