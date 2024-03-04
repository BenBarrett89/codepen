// Babel Preprocessor
import CssBaseline from "https://esm.run/@mui/material@5.15.10/CssBaseline";
import React, { StrictMode } from "https://esm.run/react@18";
import {
  ThemeProvider,
  createTheme,
} from "https://esm.run/@mui/material@5.15.10/styles/index.js";
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
  TextField,
  Typography,
} from "https://esm.run/@mui/material@5.15.10";
import { createRoot } from "https://esm.run/react-dom@18/client";
import { create } from "https://esm.run/zustand";

// const TEAM = [
//   { name: "Goku" },
//   { name: "Vegeta" },
//   { name: "Raditz" },
//   { name: "Piccolo" },
// ];

const TEAM = [
  { name: "Adrien" },
  { name: "Alister" },
  { name: "Ben" },
  { name: "Cristian" },
  { name: "Gaurav" },
  { name: "Kavitha" },
  { name: "Kellen" },
  { name: "Lisa" },
  { name: "Mathias" },
  { name: "Megan" },
  { name: "Meng" },
  { name: "Rachel" },
  { name: "Rashmil" },
  { name: "Yash" },
  { name: "Zahid" },
]

// made with https://zenoo.github.io/mui-theme-creator/ and https://m2.material.io/inline-tools/color/
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#d9df88",
    },
    secondary: {
      main: "#cadcea",
    },
    background: {
      default: "#859f63",
      paper: "#57684a",
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
  newMember: undefined,
  setNewMember: (member) => set({ newMember: member }),
  navigateStart: () => set({ page: "start" }),
  navigateCheckIn: () => set({ page: "checkin" }),
  navigateUpdates: () => set({ page: "updates" }),
  updateMembers: (members) => set({ members }),
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
    <Container sx={{ my: 2 }}>
      <Typography variant="h2" component="h1">
        Stand Up Randomiser
      </Typography>
    </Container>
  );
};

const Start = () => {
  const updateMembers = useStore((state) => state.updateMembers);
  const updateSelected = useStore((state) => state.updateSelected);
  const navigateCheckIn = useStore((state) => state.navigateCheckIn);

  updateMembers(TEAM);
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
  const updateMembers = useStore((state) => state.updateMembers);
  const updateSelected = useStore((state) => state.updateSelected);
  const updateRemaining = useStore((state) => state.updateRemaining);
  const navigateUpdates = useStore((state) => state.navigateUpdates);
  const newMember = useStore((state) => state.newMember);
  const setNewMember = useStore((state) => state.setNewMember);

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

  const handleChangeNewMember = (event) => setNewMember(event.target.value);

  const handleAddMember = () => {
    updateMembers(members.concat({ name: newMember }));
    handleChange({ name: newMember })();
    setNewMember("");
  };

  const handleContinue = () => {
    updateRemaining(selected.sort(() => (Math.random() > 0.5 ? -1 : 1)));
    navigateUpdates();
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>
            Select or enter present team members
          </Typography>
          <FormControl sx={{ mb: 2 }} component="fieldset" variant="standard">
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
        <Box>
          <TextField
            id="additional-member-text-field"
            label="Add another member"
            variant="outlined"
            value={newMember}
            onChange={handleChangeNewMember}
          />
          <Button
            sx={{ mt: 1, ml: 2 }}
            color="secondary"
            variant="contained"
            onClick={handleAddMember}
            disabled={!newMember || newMember.length < 1}
          >
            Add
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button
            disabled={selected.length < 1}
            variant="contained"
            onClick={handleContinue}
          >
            Continue
          </Button>
        </Box>
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
  };

  return (
    <Card>
      <CardContent>
        <Box>
          <Typography paragraph>Next to give an update is...</Typography>
          <Typography variant="h2">{remaining[0].name}</Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" onClick={handleNext}>
            {remaining.length === 1 ? "Finish" : "Next"}
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
