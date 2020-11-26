import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import { ThemeProvider } from '@zenkit/theme';

describe('<ThemeProvider />', () => {
  test('should render correctly', () => {
    const component = shallow(<ThemeProvider />);

    expect(component).toMatchSnapshot();
  });
});
