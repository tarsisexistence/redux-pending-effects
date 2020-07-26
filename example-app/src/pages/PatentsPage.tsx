import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPatents } from '../actions';
import { RootState } from '../reducers/rootReducer';
import { PatentItem } from '../components/PatentItem/PatentItem';
import { ErrorPage } from './ErrorPage';

export const PatentsPage: React.FC = () => {
  const dispatch = useDispatch();
  const { shouldPatentsUpdate, patentsData, error } =
    useSelector<RootState, Reducers.PatentsReducerState>(state => state.patentsReducer);

  useEffect(() => {
    if (shouldPatentsUpdate) {
      dispatch(getPatents());
    }
  }, []);

  return error ? <ErrorPage optionalMessage={error}/> : (
    <ul>
      {
        patentsData.map(({id, ...rest}: Global.PatentDataShape) => (
          <PatentItem key={id} {...rest}/>
        ))
      }
    </ul>
  )
};