import styled from 'styled-components/macro';

const display = ({ inline }) => (inline ? 'inline-block' : 'block');

const Box = styled.div`
  position: relative;
  display: ${display};
  box-sizing: border-box;
`;

export default Box;
