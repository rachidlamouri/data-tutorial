import { List, ListItem } from '@mui/material';
import { PropsWithChildren, ReactNode } from 'react';
import { SubjectProvider } from '../../subject-provider/SubjectProvider';
import { Learnable } from '../learnable/Learnable';
import { CanHazCandy } from './CanHazCandy';

type SubjectProps = PropsWithChildren<{
  offset: number;
  children: ReactNode[];
}>;

export function Subject({ offset, children }: SubjectProps) {
  const learnableCount = children.length;

  return (
    <SubjectProvider learnableCount={learnableCount}>
      <List>
        {children.map((child, childIndex) => {
          const offsetIndex = childIndex - offset;
          const learnableIndex =
            offsetIndex -
            learnableCount * Math.floor(offsetIndex / learnableCount);
          return (
            <Learnable key={childIndex} index={learnableIndex}>
              {child}
            </Learnable>
          );
        })}
        <ListItem>
          <CanHazCandy />
        </ListItem>
      </List>
    </SubjectProvider>
  );
}
