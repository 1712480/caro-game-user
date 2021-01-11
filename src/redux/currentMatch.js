import { createSlice } from '@reduxjs/toolkit';
import { maxLength } from '../utils/constant';
import { checkEndGame } from '../utils/checkEndGame';
import { ExeMove } from '../utils/exeMove';

const generateMap = (length) => Array(length).fill(Array(length).fill(0));

const init = {
  mapMatch: generateMap(maxLength),
  matchId: null,
  isTurnX: false,
  isEndGame: false,
  roomId: null,
  userPlaying: {
    host: null,
    competitor: null,
  },
  currentMove: {
    x: null,
    y: null,
  },
  success: true,
  currentSocket: null,
};

// add reducer exit game
export const currentMatchSlice = createSlice({
  name: 'currentMatch',
  initialState: init,
  reducers: {
    exeMove: (state, action) => {
      const { x, y } = action.payload;
      const newArray = ExeMove(state.mapMatch, x, y, state.isTurnX);
      if (checkEndGame(newArray, x, y)) {
        return {
          ...state,
          mapMatch: newArray,
          isTurnX: !state.isTurnX,
          isEndGame: true,
        };
      }
      const newCurrentMove = {
        x: action.payload.x,
        y: action.payload.y,
      };
      return {
        ...state,
        mapMatch: newArray,
        isTurnX: !state.isTurnX,
        currentMove: { ...newCurrentMove },
      };
    },
    startGame: (state, action) => {
      const match = action.payload;
      return {
        ...state,
        isTurnX: match.myTurn,
        matchId: match.matchId,
        roomId: match.roomId,
        userPlaying: {
          host: match.roomDetails.x,
          competitor: match.roomDetails.y,
        },
      };
    },
    newGame: (state) => ({
      ...state,
      mapMatch: generateMap(maxLength),
      isTurnX: false,
      isEndGame: false,
    }),
    restartGame: (state, action) => ({
      ...init,
      isTurnX: action.payload,
    }),
    reLoadGame: (state, action) => ({
      ...state,
      userPlaying: {
        host: action.payload?.roomDetail?.x,
        competitor: action.payload?.roomDetail?.y,
      },
      matchId: action.payload.roomDetail.currentMatch,
      roomId: action.payload.roomDetail.roomId,
    }),
    setTurn: (state, action) => ({
      ...state,
      isTurnX: action.payload,
    }),
  },
});

export const {
  exeMove, newGame, restartGame, startGame, reLoadGame, setTurn,
} = currentMatchSlice.actions;

export default currentMatchSlice.reducer;
