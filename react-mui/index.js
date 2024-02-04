// Babel Preprocessor
import CssBaseline from 'https://esm.run/@mui/material/CssBaseline';
import React, { forwardRef, StrictMode } from "https://esm.run/react@18";
import { ThemeProvider, createTheme } from 'https://esm.run/@mui/material/styles';
import { Button, Container, Link, Typography } from "https://esm.run/@mui/material"
import { createRoot } from "https://esm.run/react-dom@18/client";
import { create } from 'https://esm.run/zustand';

// made with https://zenoo.github.io/mui-theme-creator/ and https://m2.material.io/inline-tools/color/
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e8a12f',
    },
    secondary: {
      main: '#2fe8a1',
    },
    warning: {
      main: '#d2e82f',
    },
    error: {
      main: '#e8452f',
    },
    info: {
      main: '#2f76e8',
    },
    success: {
      main: '#76e82f',
    },
  },
});

const useStore = create((set) => ({
  page: 'root',
  navigateRoot: () => set({ page: 'root' }),
  navigateTwo: () => set({ page: 'two' }),
}))

const App = () => {
  return (
    <Container>
      <Header />
      <Content />
    </Container>
  );
};

const Header = () => {
  const page = useStore((state) => state.page);
  const navigateRoot = useStore((state) => state.navigateRoot);
  const navigateTwo = useStore((state) => state.navigateTwo);
  return (
    <Container>
      <Typography variant="h2" component="h1">Hello World</Typography>
      <Button variant={page === 'root' ? "contained" : "outlined"} onClick={navigateRoot}>Root</Button>
      <Button variant={page === 'two' ? "contained" : "outlined"} onClick={navigateTwo}>Two</Button>
    </Container>
  );
}

const Root = () => {
  return (
    <Typography>Root</Typography>
  );
}

const Two = () => {
  return (
    <Typography>Two</Typography>
  );
}

const router = {
  root: <Root />,
  two: <Two />
}

const Content = () => {
  const page = useStore((state) => state.page)
  return (
    <Container>
      {router[page]}
    </Container>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
    </ThemeProvider>
  </StrictMode>
);
