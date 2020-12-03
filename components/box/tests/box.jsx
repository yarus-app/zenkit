import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import { Box } from '@zenkit/box';

describe('<Box />', () => {
  test('should render correctly in "debug" mode', () => {
    const component = shallow(<Box />);

    expect(component).toMatchSnapshot();
  });
});
