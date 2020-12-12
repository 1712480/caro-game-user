import { createSlice } from '@reduxjs/toolkit';
import { maxLength } from '../utils/constant';
import { checkEndGame } from '../utils/checkEndGame';

const generateMap = (length) => {
  const Map = [];
  for (let i = 0; i < length; i += 1) {
    const row = [];
    for (let j = 0; j < length; j += 1) {
      row.push(0);
    }
    Map.push(row);
  }
  return Map;
};

export const currentMatchSlice = createSlice({
  name: 'currentMatch',
  initialState: {
    mapMatch: generateMap(maxLength),
    isTurnX: true,
    success: true,
    isEndGame: false,
  },
  reducers: {
    exeMove: (state, action) => {
      const { x, y } = action.payload;
      const newArray = state.mapMatch.map((row, index) => {
        if (index === x) {
          return row.map((col, index1) => {
            if (index1 === y) {
              return state.isTurnX ? 1 : 2;
            }
            return col;
          });
        }
        return row;
      });
      if (checkEndGame(newArray, x, y)) {
        return {
          ...state,
          mapMatch: newArray,
          isTurnX: !state.isTurnX,
          isEndGame: true,
        };
      }
      return {
        ...state,
        mapMatch: newArray,
        isTurnX: !state.isTurnX,
      };
    },
    newGame: (state) => ({
      ...state,
      mapMatch: generateMap(maxLength),
      isTurnX: true,
      isEndGame: false,
    }),
  },
});

export const { exeMove, newGame } = currentMatchSlice.actions;

export default currentMatchSlice.reducer;

// export const selectUser = (state) => state.user;
