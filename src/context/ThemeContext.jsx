import { createContext, useContext, useEffect, useMemo, useState } from "react";

const defaultTheme = {
  primary: "#16522D",
  secondary: "#ffd000",
  storeName: "BizBiteNow",
  logo: "",
};

const ThemeContext = createContext(defaultTheme);

export const ThemeProvider = ({
  children,
  initialTheme = defaultTheme,
}) => {
  const [theme, setTheme] = useState(initialTheme);

useEffect(() => {
  const root = document.documentElement;

  root.style.setProperty("--primary", theme.primary);

  root.style.setProperty("--secondary", "#CA8A04"); // Tailwind yellow-600

  root.style.setProperty(
    "--primary-light",
    `${theme.primary}15`
  );

  root.style.setProperty(
    "--primary-border",
    `${theme.primary}35`
  );

  root.style.setProperty(
    "--primary-shadow",
    `${theme.primary}25`
  );
}, [theme]);

  const updateTheme = (updates) => {
    setTheme((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const value = useMemo(
    () => ({
      theme,
      updateTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;