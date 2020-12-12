import React from 'react';
import { useSelector } from 'react-redux';
import Board from '../../components/match/board';

const Match = (props) => {
  const matchMap = useSelector((state) => state.match.mapMatch);
  console.log(matchMap);
  return (
    <div>
      <Board />
    </div>
  );
};

export default Match;
