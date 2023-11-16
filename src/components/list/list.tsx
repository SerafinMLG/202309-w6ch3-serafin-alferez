import { useEffect } from 'react';

import { Card } from '../card/card';

import { useCharacters } from '../../hooks/use.characters';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export function List() {
  const { loadCharacters } = useCharacters();

  const { characters } = useSelector(
    (state: RootState) => state.characterState
    );
    
  useEffect(() => {
    loadCharacters();
  }, [loadCharacters]);

  return (
    <>
      
        <ul className="characters-list row list-unstyled">
          {characters.map((item) => (
            <Card info={item} key={item.id}></Card>
          ))}
        </ul>
    </>
  );
}
