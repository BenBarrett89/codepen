// Babel Preprocessor
import CssBaseline from 'https://esm.run/@mui/material/CssBaseline';
import React, { StrictMode } from "https://esm.run/react@18";
import { ThemeProvider, createTheme } from 'https://esm.run/@mui/material/styles';
import { Box, Button, Card, CardContent, Checkbox, Container, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from "https://esm.run/@mui/material";
import { createRoot } from "https://esm.run/react-dom@18/client";
import { create } from 'https://esm.run/zustand';

const TEAM = [
  { name: 'Pontos' },
  { name: 'Alcmene' },
  { name: 'Guwisti' },
  { name: 'Attila' },
  { name: 'Rain' },
];

// made with https://zenoo.github.io/mui-theme-creator/ and https://m2.material.io/inline-tools/color/
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9f9456',
    },
    secondary: {
      main: '#9f5661',
    },
    background: {
      default: '#161c5d',
      paper: '#2c367c',
    },
    error: {
      main: '#9f5661',
    },
    warning: {
      main: '#9f9456',
    },
    info: {
      main: '#56869f',
    },
    success: {
      main: '#94569f',
    },
  },
});

const useStore = create((set) => ({
  page: 'start',
  navigateStart: () => set({ page: 'start' }),
  navigateCheckIn: () => set({ page: 'checkin' }),
  navigateUpdates: () => set({ page: 'updates' }),
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
  return (
    <Container>
      <Typography variant="h2" component="h1">Stand Up Randomiser</Typography>
    </Container>
  );
}

const Start = () => {
  const navigateCheckIn = useStore((state) => state.navigateCheckIn);
  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>Welcome to the stand up!</Typography>
          <Button variant="contained" onClick={navigateCheckIn}>Start</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const CheckIn = () => {
  const navigateUpdates = useStore((state) => state.navigateUpdates);
  
  const members = TEAM;

  const handleChange = (event) => {
    console.log(event.target.name);
  }

  return (
    <Card>
      <CardContent>
        <Box>
          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
            <FormLabel>Select present team members</FormLabel>
            <FormGroup>
              {members.map((member) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox color="secondary" checked={member.name} onChange={handleChange} name={member.name} />
                    }
                    label={member.name}
                  />
                )
              })}
            </FormGroup>
          </FormControl>
        </Box>
        <Button variant="contained" onClick={navigateUpdates}>Continue</Button>
      </CardContent>
    </Card>
  );
};

const Updates = () => {
  const navigateStart = useStore((state) => state.navigateStart);
  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>Updates</Typography>
          <Button variant="contained" onClick={navigateStart}>Finish</Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const router = {
  start: <Start />,
  checkin: <CheckIn />,
  updates: <Updates />,
};

const Content = () => {
  const page = useStore((state) => state.page)
  return (
    <Container>
      {router[page]}
    </Container>
  );
};

const Root = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<Root />);
