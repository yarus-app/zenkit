import styled from 'styled-components/macro';

export const Box = styled.div`
  display: ${({ inline }) => (inline ? 'inline-block' : 'block')};
  box-sizing: border-box;
`;

export default Box;
