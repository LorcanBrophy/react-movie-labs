import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#6c63ff" },
      secondary: { main: "#ff6584" },
      ...(mode === "dark" && {
        background: { default: "#121212", paper: "#1e1e1e" },
      }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", sans-serif',
      h3: { fontWeight: 700 },
    },
    shape: { borderRadius: 12 },
  });