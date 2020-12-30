/* eslint-disable consistent-return */
import styled from 'styled-components/macro';
import { prop, spacing, ifProp } from '@zenkit/helpers';

const findProp = (...keys) => (props) => {
  const neededKey = keys.find((key) => key in props);

  if (neededKey) {
    return props[neededKey];
  }
};

export const Box = styled.div`
  // space
  max-width: ${(props) => spacing(findProp('max-width', 'maxw')(props))(props)};
  width: ${(props) => spacing(findProp('width', 'w')(props))(props)};
  min-width: ${(props) => spacing(findProp('min-width', 'minw')(props))(props)};

  max-height: ${(props) =>
    spacing(findProp('max-height', 'maxh')(props))(props)};
  height: ${(props) => spacing(findProp('height', 'h')(props))(props)};
  min-height: ${(props) =>
    spacing(findProp('min-height', 'minh')(props))(props)};

  margin-top: ${(props) =>
    spacing(
      findProp('margin-top', 'mt', 'margin-y', 'my', 'margin', 'm')(props)
    )(props)};
  margin-left: ${(props) =>
    spacing(
      findProp('margin-left', 'ml', 'margin-x', 'mx', 'margin', 'm')(props)
    )(props)};
  margin-right: ${(props) =>
    spacing(
      findProp('margin-right', 'mr', 'margin-x', 'mx', 'margin', 'm')(props)
    )(props)};
  margin-bottom: ${(props) =>
    spacing(
      findProp('margin-bottom', 'mb', 'margin-y', 'my', 'margin', 'm')(props)
    )(props)};

  padding-top: ${(props) =>
    spacing(
      findProp('padding-top', 'pt', 'padding-y', 'py', 'padding', 'p')(props)
    )(props)};
  padding-left: ${(props) =>
    spacing(
      findProp('padding-left', 'pl', 'padding-x', 'px', 'padding', 'p')(props)
    )(props)};
  padding-right: ${(props) =>
    spacing(
      findProp('padding-right', 'pr', 'padding-x', 'px', 'padding', 'p')(props)
    )(props)};
  padding-bottom: ${(props) =>
    spacing(
      findProp('padding-bottom', 'pb', 'padding-y', 'py', 'padding', 'p')(props)
    )(props)};
  // layout
  position: ${prop('position', 'relative')};
  box-sizing: border-box;
  display: ${ifProp('inline', 'inline-block', 'block')};

  top: ${(props) => spacing(prop('top')(props))(props)};
  left: ${(props) => spacing(prop('left')(props))(props)};
  right: ${(props) => spacing(prop('right')(props))(props)};
  bottom: ${(props) => spacing(prop('bottom')(props))(props)};
  z-index: ${(props) => spacing(prop('z-index')(props))(props)};

  overflow-x: ${(props) =>
    spacing(findProp('overflow-x', 'overflow')(props))(props)};
  overflow-y: ${(props) =>
    spacing(findProp('overflow-y', 'overflow')(props))(props)};
  vertical-align: ${prop('vertical-align')};

  border-top: ${findProp('border-top', 'bt', 'border-y', 'by', 'border', 'b')};
  border-left: ${findProp(
    'border-left',
    'bl',
    'border-x',
    'bx',
    'border',
    'b'
  )};
  border-right: ${findProp(
    'border-right',
    'br',
    'border-x',
    'bx',
    'border',
    'b'
  )};
  border-bottom: ${findProp(
    'border-bottom',
    'bb',
    'border-y',
    'by',
    'border',
    'b'
  )};

  border-width: ${findProp('border-width', 'bw')};
  border-style: ${findProp('border-style', 'bs')};
  border-color: ${findProp('border-color', 'bc')};
  border-radius: ${prop('border-radius')};

  // typography
  // color
  color: ${prop('color')};
  background: ${findProp('background', 'bg')};
`;
