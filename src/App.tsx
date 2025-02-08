import {
  AppBar,
  Box,
  Breadcrumbs,
  Container,
  createTheme,
  CssBaseline,
  Drawer,
  Stack,
  Tab,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { subjects } from './subjects/subjects';
import { SubjectIndexProvider } from './subject-index-provider/SubjectIndexProvider';
import { Square, SquareOutlined } from '@mui/icons-material';
import {
  ProgressProvider,
  useSubjectProgress,
} from './progress-provider/ProgressProvider';
import { useLocalStorage } from '@uidotdev/usehooks';

type ProgressIndicatorProps = {
  isLearned: boolean;
};

function ProgressIndicator({ isLearned }: ProgressIndicatorProps) {
  const Icon = isLearned ? Square : SquareOutlined;
  const color = isLearned ? 'success' : undefined;

  return (
    <Icon
      sx={{
        width: 10,
        height: 10,
      }}
      color={color}
    />
  );
}

function TabProgress() {
  const { subjectProgress = [] } = useSubjectProgress();

  const chunkSize = 6;
  const chunkCount = Math.ceil(subjectProgress.length / chunkSize);
  const chunks = Array.from({ length: chunkCount }).map((_, index) => {
    const startIndex = index * chunkSize;
    return subjectProgress.slice(startIndex, startIndex + chunkSize);
  });

  return chunks.map((chunk, chunkIndex) => {
    return (
      <Stack direction="row" key={chunkIndex}>
        {chunk.map((isLearned, index) => {
          return <ProgressIndicator key={index} isLearned={isLearned} />;
        })}
      </Stack>
    );
  });
}

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [initState, setInitState] = useState(false);
  const [subjectIndex, setSubjectIndex] = useLocalStorage(
    'selected-subject-index',
    0,
  );
  const subject = subjects[subjectIndex];

  return (
    <ThemeProvider theme={theme}>
      <ProgressProvider
        onInit={() => {
          setInitState(true);
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <Breadcrumbs>
              <Typography variant="h5" component="div">
                Data Tutorial
              </Typography>
              <Typography variant="h6" component="div">
                {subject.title}
              </Typography>
            </Breadcrumbs>
          </Toolbar>
        </AppBar>
        <Stack direction="row">
          <Drawer
            variant="permanent"
            sx={{
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: {
                boxSizing: 'border-box',
              },
            }}
          >
            <Toolbar />
            <Tabs
              value={subject.index}
              onChange={(_event: React.SyntheticEvent, nextIndex: number) => {
                setSubjectIndex(nextIndex);
              }}
              variant="scrollable"
              scrollButtons={false}
              orientation="vertical"
            >
              {subjects.map((subject, index) => {
                return (
                  <Tab
                    key={index}
                    label={
                      <>
                        {subject.title}
                        <SubjectIndexProvider index={subject.index}>
                          <TabProgress />
                        </SubjectIndexProvider>
                      </>
                    }
                  />
                );
              })}
            </Tabs>
          </Drawer>
          <Container
            sx={{
              maxHeight: '100%',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            {subjects
              .filter((nextSubject) => {
                return !initState || nextSubject.index === subject.index;
              })
              .map((nextSubject) => {
                return (
                  <Box
                    key={nextSubject.index}
                    sx={{
                      display:
                        nextSubject.index === subject.index
                          ? 'visible'
                          : 'none',
                    }}
                  >
                    <SubjectIndexProvider index={nextSubject.index}>
                      <nextSubject.Component />
                    </SubjectIndexProvider>
                  </Box>
                );
              })}
          </Container>
        </Stack>
      </ProgressProvider>
    </ThemeProvider>
  );
}

export default App;
