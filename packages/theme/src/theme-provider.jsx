import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/macro';
import { theme } from './defaults';

export const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
);

export default ThemeProvider;
