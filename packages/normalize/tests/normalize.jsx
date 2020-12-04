import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
// eslint-disable-next-line import/no-unresolved
import { Normalize } from '@zenkit/normalize';

describe('<Normalize />', () => {
  test('should render correctly', () => {
    const component = shallow(<Normalize />);

    expect(component).toMatchSnapshot();
  });
});
