// Babel Preprocessor
import CssBaseline from "https://esm.run/@mui/material/CssBaseline";
import React, { StrictMode } from "https://esm.run/react@18";
import {
  ThemeProvider,
  createTheme,
} from "https://esm.run/@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  Typography,
} from "https://esm.run/@mui/material";
import { createRoot } from "https://esm.run/react-dom@18/client";
import { create } from "https://esm.run/zustand";

const TEAM = [
  { name: "Pontos" },
  { name: "Alcmene" },
  { name: "Guwisti" },
  { name: "Attila" },
  { name: "Rain" },
];

// made with https://zenoo.github.io/mui-theme-creator/ and https://m2.material.io/inline-tools/color/
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9f9456",
    },
    secondary: {
      main: "#9f5661",
    },
    background: {
      default: "#161c5d",
      paper: "#2c367c",
    },
    error: {
      main: "#9f5661",
    },
    warning: {
      main: "#9f9456",
    },
    info: {
      main: "#56869f",
    },
    success: {
      main: "#94569f",
    },
  },
});

const useStore = create((set) => ({
  page: "start",
  members: TEAM,
  selected: [],
  remaining: [],
  navigateStart: () => set({ page: "start" }),
  navigateCheckIn: () => set({ page: "checkin" }),
  navigateUpdates: () => set({ page: "updates" }),
  updateSelected: (selected) => set({ selected }),
  updateRemaining: (remaining) => set({ remaining }),
}));

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
      <Typography variant="h2" component="h1">
        Stand Up Randomiser
      </Typography>
    </Container>
  );
};

const Start = () => {
  const updateSelected = useStore((state) => state.updateSelected);
  const navigateCheckIn = useStore((state) => state.navigateCheckIn);

  updateSelected([]);

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>Welcome to the stand up!</Typography>
          <Button variant="contained" onClick={navigateCheckIn}>
            Start
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

const CheckIn = () => {
  const members = useStore((state) => state.members);
  const selected = useStore((state) => state.selected);
  const updateSelected = useStore((state) => state.updateSelected);
  const updateRemaining = useStore((state) => state.updateRemaining);
  const navigateUpdates = useStore((state) => state.navigateUpdates);

  const handleChange = (member) => () => {
    const selectedIndex = selected.findIndex(
      (selectedMember) => selectedMember.name === member.name
    );
    const isSelected = selectedIndex > -1;
    if (isSelected)
      updateSelected([
        ...selected.filter(
          (selectedMember) => selectedMember.name !== member.name
        ),
      ]);
    else updateSelected([...selected, member]);
  };

  const memberSelected = (member) =>
    selected.findIndex(
      (selectedMember) => selectedMember.name === member.name
    ) > -1;

  const handleContinue = () => {
    updateRemaining(selected.sort(() => Math.random() > 0.5 ? -1 : 1));
    navigateUpdates();
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>Select present team members</Typography>
          <FormControl sx={{ m: 2 }} component="fieldset" variant="standard">
            <FormGroup>
              {members.map((member) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={memberSelected(member)}
                        onChange={handleChange(member)}
                      />
                    }
                    label={member.name}
                  />
                );
              })}
            </FormGroup>
          </FormControl>
        </Box>
        <Button
          disabled={selected.length < 1}
          variant="contained"
          onClick={handleContinue}
        >
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};

const Updates = () => {
  const remaining = useStore((state) => state.remaining);
  const updateRemaining = useStore((state) => state.updateRemaining);
  const navigateStart = useStore((state) => state.navigateStart);

  const handleNext = () => {
    if (remaining.length === 1) {
      navigateStart();
    } else {
      updateRemaining(remaining.slice(1));
    }
  }

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>Next to give an update is...</Typography>
          <Typography variant='h2'>{remaining[0].name}</Typography>
          <Button variant="contained" onClick={handleNext}>
            {remaining.length === 1 ? 'Finish' : 'Next'}
          </Button>
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
  const page = useStore((state) => state.page);
  return <Container>{router[page]}</Container>;
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
};

createRoot(document.getElementById("root")).render(<Root />);
