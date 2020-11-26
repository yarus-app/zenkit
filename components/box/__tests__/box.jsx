/* eslint-disable import/no-unresolved */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { shallow } from 'enzyme';
import { Box } from '@zenkit/box';

describe('<Box />', () => {
  test('should render correctly in "debug" mode', () => {
    const component = shallow(<Box />);

    expect(component).toMatchSnapshot();
  });
});
