import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import theme from './defaults';

const defaultTheme = theme();

const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={defaultTheme}>{children}</StyledThemeProvider>
);

export default ThemeProvider;
