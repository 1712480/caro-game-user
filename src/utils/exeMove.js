export const ExeMove = (data, x, y, isTurnX) => {
  const newArray = data.map((row, index) => {
    if (index === x) {
      return row.map((col, index1) => {
        if (index1 === y) {
          return isTurnX ? 1 : 2;
        }
        return col;
      });
    }
    return row;
  });
  return newArray;
};
