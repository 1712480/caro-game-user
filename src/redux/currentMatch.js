import { createSlice } from '@reduxjs/toolkit';
import { maxLength } from '../utils/constant';
import { checkEndGame } from '../utils/checkEndGame';

const generateMap = (length) => Array(length).fill(Array(length).fill(0));

// add reducer exit game
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
