import { spacing } from './spacing';

export const ellipsis = (width, lines = 1) => (props = {}) => {
  const styles = {
    display: 'inline-block',
    maxWidth: spacing(width)(props) || '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    wordWrap: 'normal',
  };

  return lines > 1
    ? {
        ...styles,
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: lines,
        display: '-webkit-box',
        whiteSpace: 'normal',
      }
    : styles;
};
