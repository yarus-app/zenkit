const positionMap = ['Top', 'Right', 'Bottom', 'Left'];

export const directionalProp = (property, ...values) => {
  const [
    firstValue,
    secondValue = firstValue,
    thirdValue = firstValue,
    fourthValue = secondValue,
  ] = values;
  const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  return positionMap.map((position, index) => ({
    [`${property}${position}`]: valuesWithDefaults[index],
  }));
};
