import React, { useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import merge from 'lodash.merge';
import getDefaultTheme from './defaults';

const defaultTheme = getDefaultTheme();

export function ThemeProvider({ theme: localTheme = {}, children }) {
  const theme = useMemo(() => {
    return merge(defaultTheme, localTheme);
  }, [localTheme]);

  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
