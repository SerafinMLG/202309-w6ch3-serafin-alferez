import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { ApiRepo } from '../services/api.repo';
import { useCallback, useMemo } from 'react';
import * as ac from '../slice/got.slice';
import { Character } from '../model/characters';
import { loadCharacterThunk, updateCharacterThunk } from '../slice/got.thunks';

export function useCharacters() {
  const { characters } = useSelector(
    (state: RootState) => state.characterState
  );
  const dispatch = useDispatch<AppDispatch>();

  const repo = useMemo(() => new ApiRepo(), []);

  const loadCharacters = useCallback(async () => {
    try {
      dispatch(loadCharacterThunk(repo));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch, repo]);

  const updateCharacter = async (
    id: Character['id'],
    updatedCharacter: Partial<Character>
  ) => {
    try {

      dispatch(updateCharacterThunk({
        id,
        repo,
        updatedCharacter,
      })
    );
  } catch (error) {
      console.log((error as Error).message);
  }
};

  return {
    loadCharacters,
    characters,
    updateCharacter,
  };
}
