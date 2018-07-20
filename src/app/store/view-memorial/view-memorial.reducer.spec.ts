import { INITIAL_STATE, viewMemorialReducer } from './view-memorial.reducer';

describe('ViewMemorialReducer', () => {
  it('should return initial state', () => {
    expect(viewMemorialReducer(undefined, {type: ''})).toBe(INITIAL_STATE);
  });
});
