import { createMemorialReducer, INITIAL_STATE } from './create-memorial.reducer';

describe('CreateMemorialReducer', () => {
  it('should return initial state', () => {
    expect(createMemorialReducer(undefined, {type: ''})).toBe(INITIAL_STATE);
  });
});
