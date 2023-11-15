import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { List } from './list';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Character } from '../../model/characters';
import { useCharacters } from '../../hooks/use.characters';
import charactersReducer from '../../slice/got.slice';

jest.mock('../../hooks/use.characters');
describe('Given List component ', () => {
  describe('When we render it', () => {
    const store = configureStore({
      reducer: {
        characterState: charactersReducer,
      },
      preloadedState: {
        characterState: {
          characters: [{id:1} as Character],
          characterState: 'idle',
        },
      },
    });

    const loadCharacters = jest.fn();
    (useCharacters as jest.Mock).mockReturnValue({
      loadCharacters,
    });

    render(
      <Provider store={store}>
        <List></List>
      </Provider>   
    )
    test('Then it should be in the document', () => {
      const listElement = screen.getAllByRole('list')[0];
      expect(listElement).toBeInTheDocument();
      expect(loadCharacters).toHaveBeenCalled();
    })
})
});

