import React from 'react';
import { useSelector } from 'react-redux';
import Square from '../ square';
import styles from './styles.module.scss';

const RenderBoard = (data) => {
  const Component = data.map((record, indexX) => {
    const recordI = record.map((sq, indexY) => (
      <Square
        key={`${indexX}${indexY}`}
        x={indexX}
        y={indexY}
        value={data[indexX][indexY]}
      />
    ));
    // eslint-disable-next-line react/no-array-index-key
    return <div key={indexX} className={styles.row}>{recordI}</div>;
  });
  return Component;
};

function Board(props) {
  const mapMatch = useSelector((state) => state.match.mapMatch);
  const match = RenderBoard(mapMatch);
  // const a = [];
  return (
    <div className={styles.boardWrapper} style={{ lineHeight: 0 }}>{match}</div>
  );
}

export default Board;
