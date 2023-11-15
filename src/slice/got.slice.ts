import { Character } from '../model/characters';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadCharacterThunk, updateCharacterThunk } from './got.thunks';

type CharacterState = {
  characters: Character[];
  characterState: 'idle' | 'loading' | 'error';
};

const initialState: CharacterState = {
  characters: [],
  characterState: 'idle',
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder.addCase(loadCharacterThunk.pending, (state: CharacterState) => {
      state.characterState = 'loading';
      return state;
    }),


    builder.addCase(loadCharacterThunk.fulfilled,
      (state: CharacterState, { payload }: PayloadAction<Character[]>) => {
        state.characters = payload;
        state.characterState = 'idle';
        return state;
      }
    );
    
    builder.addCase(loadCharacterThunk.rejected, (state: CharacterState) => {
      state.characterState = 'error';
      return state;
    })

    builder.addCase(
      updateCharacterThunk.fulfilled,
      (state: CharacterState, { payload }: PayloadAction<Character>) => {
        state.characters[state.characters.findIndex((item) => item.id === payload.id)] =
          payload;
        return state;
      } 
    )

    builder.addCase(updateCharacterThunk.pending, (state: CharacterState) => {
      state.characterState = 'loading';
      return state;
    }),

    builder.addCase(updateCharacterThunk.rejected, (state: CharacterState) => {
      state.characterState = 'error';
      return state;
    }

    )
    }
  });

  export default characterSlice.reducer;
