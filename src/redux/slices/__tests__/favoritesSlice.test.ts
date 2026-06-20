import favoritesReducer, { toggleFavorite } from '../favoritesSlice';

describe('favoritesSlice', () => {
  it('should add favorite when toggled', () => {
    const state = favoritesReducer(undefined, toggleFavorite('exp-1'));
    expect(state.favoriteIds).toContain('exp-1');
  });

  it('should remove favorite when toggled again', () => {
    let state = favoritesReducer(undefined, toggleFavorite('exp-1'));
    state = favoritesReducer(state, toggleFavorite('exp-1'));
    expect(state.favoriteIds).not.toContain('exp-1');
  });

  it('should support multiple favorites', () => {
    let state = favoritesReducer(undefined, toggleFavorite('exp-1'));
    state = favoritesReducer(state, toggleFavorite('exp-2'));
    expect(state.favoriteIds).toEqual(['exp-1', 'exp-2']);
  });
});
