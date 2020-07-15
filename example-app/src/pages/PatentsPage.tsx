import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPatents } from '../actions';
import { RootState } from '../reducers/rootReducer';
import { PatentsReducerState } from '../reducers/patentsReducer';
import { PatentItem } from '../components/PatentItem/PatentItem';
import { PatentDataShape } from '../services/NasaService';
import { ErrorMessage } from '../components/ErrorMessage/ErrorMessage';

export const PatentsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { patentsData, error } =
    useSelector<RootState, PatentsReducerState>(state => state.patentsReducer);

  useEffect(() => {
    if (patentsData.length || error) {
      return;
    }

    dispatch(getPatents());
  }, []);

  return error ? <ErrorMessage message={error}/> : (
    <ul>
      {
        patentsData.map(({id, ...rest}: PatentDataShape) => {
          return <PatentItem key={id} {...rest}/>
        })
      }
    </ul>
  )
};