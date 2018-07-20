import { appReducer, INITIAL_STATE } from './app.reducer';

describe('AppReducer', () => {
  it('should return initial state', () => {
    expect(appReducer(undefined, {type: ''})).toBe(INITIAL_STATE);
  });
});
