import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  AppBar,
  Toolbar,
  CssBaseline,
  ThemeProvider,
  createTheme,
  Snackbar,
  Alert,
  Paper,
  Grid,
} from "@mui/material";
import { CheckCircle, Error } from "@mui/icons-material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

function App() {
  const [formData, setFormData] = useState({
    field1: "",
    field2: "",
    field3: "",
    field4: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://eamengine/submit", formData);
      console.log(response.data);
      setSnackbarMessage("registration successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error submitting data:", error);
      setSnackbarMessage("Error submitting data.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        {/* Navigation Bar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Worksbyte
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              Signup
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    name="field1"
                    value={formData.field1}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="field2"
                    value={formData.field2}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    name="field3"
                    value={formData.field3}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company Name"
                    name="field4"
                    value={formData.field4}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CheckCircle />}
                >
                  Register
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            mt: 4,
            py: 3,
            px: 2,
            backgroundColor: theme.palette.primary.main,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography variant="body1">
            &copy; {new Date().getFullYear()} Worksbyte Technologies. All rights
            reserved.
          </Typography>
        </Box>
      </Box>

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          icon={snackbarSeverity === "success" ? <CheckCircle /> : <Error />}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
