import { selectIsPending } from 'redux-pending-effects';

import { store } from '../store';
import { getPatents, getLibraryContent } from '../actions';
import { clearStoreActionName } from '../constants/actionNames';
import { nasaService } from '../services/NasaService';

describe('store testing on RPE selector', () => {
  afterEach(() => {
    store.dispatch({
      type: clearStoreActionName
    });
  });

  it('should test selectIsPending changing on getPatents fetch', async () => {
    const getPatentsAction: Actions.GetPatents = getPatents();

    expect(selectIsPending(store.getState())).toBe(false);

    store.dispatch(getPatentsAction);

    expect(selectIsPending(store.getState())).toBe(true);

    await getPatentsAction.payload;

    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should test selectIsPending changing on getLibraryContent fetch', async () => {
    expect(selectIsPending(store.getState())).toBe(false);

    store.dispatch<any>(getLibraryContent('test'));

    expect(selectIsPending(store.getState())).toBe(true);

    await nasaService.getLibraryContent('test');

    expect(selectIsPending(store.getState())).toBe(false);
  });

  it('should test selectIsPending changing on getAstronomyPictureData fetch', async () => {

  });
});
