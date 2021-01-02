import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Board from '../../components/match/board';
import { newGame, exeMove } from '../../redux/currentMatch';
import { API_HOST } from '../../utils/constant';

const History = () => {
  const dispatch = useDispatch();
  const [listMove, setListMove] = useState([]);
  const [step, setStep] = useState(listMove.length);
  const currentUser = useSelector((state) => state.currentUser);
  const inputRef = useRef(null);
  const router = useRouter();

  const matchId = router.query.id;
  const token = currentUser?.access_token;

  useEffect(() => {
    if (matchId) {
      axios.get(`${API_HOST}matches/my/${matchId}`, {
        headers: {
          access_token: token,
        },
      })
        .then((res) => {
          setListMove(res.data.data.match[0].moves);
          setStep(res.data.data.match[0].moves.length);
        })
        .catch((err) => {
          toast.success(err.response.message);
          router.push('/history');
        });
    }
  }, [matchId]);

  useEffect(() => {
    dispatch(newGame());
    for (let i = 0; i < step; i += 1) {
      const action = exeMove({
        x: listMove[i].x,
        y: listMove[i].y,
      });
      dispatch(action);
    }
    inputRef.current.value = step;
  }, [step]);

  const Previous = () => {
    if (inputRef.current.value === '') {
      setStep(0);
      return;
    }
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const Next = () => {
    if (inputRef.current.value === '') {
      setStep(0);
      return;
    }
    if (step < listMove.length) {
      setStep(step + 1);
    }
  };

  const ChangeStep = (e) => {
    const newStep = e.target.value;
    if (newStep === '') {
      return;
    }
    if (newStep >= 0 && newStep <= listMove.length) {
      setStep(newStep);
    } else if (newStep < 0) {
      inputRef.current.value = 0;
      setStep(0);
    } else {
      inputRef.current.value = listMove.length;
      setStep(listMove.length);
    }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Board />
      <div style={{ display: 'flex' }}>
        <Button color="primary" onClick={Previous}> Prev </Button>
        <input type="number" max={listMove.length} min={0} ref={inputRef} onChange={ChangeStep} />
        <Button color="warning" onClick={Next}> Next </Button>
      </div>
    </div>
  );
};

export default History;
