import { findMemorialReducer, INITIAL_STATE } from './find-memorial.reducer';

describe('FindMemorialReducer', () => {
  it('should return initial state', () => {
    expect(findMemorialReducer(undefined, {type: ''})).toBe(INITIAL_STATE);
  });
});
