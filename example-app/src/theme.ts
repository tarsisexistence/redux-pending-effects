import { dark } from 'grommet';
import { deepMerge } from 'grommet/utils';

export const theme = deepMerge(dark, {
  global: {
    colors: {
      background: '#2a2a2a'
    }
  },
  formField: {
    focus: {
      border: {
        color: 'status-ok'
      }
    }
  }
});
