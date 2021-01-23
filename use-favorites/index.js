import {useState} from 'react';
import {GET_FAVORITES} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

/**
 * Hook to fetch and update the client favorite  trikos
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version  1.0.0
 * @returns {{favorites: *}}
 */
const useFavorites = () => {
  const {
    stack: {client = {}},
    setKey,
  } = useSession();
  const [favorites, setFavorites] = useState([]);

  /**
   * We use an on complete to keep taking the favorites from the session always.
   */
  useQuery(GET_FAVORITES, {
    fetchPolicy: 'no-cache',
    onCompleted: ({response = {}}) => {
      const {favorite = {}} = response;
      const {trikos = []} = favorite;
      setFavorites(trikos);
      setKey(
        'favoriteTrikos',
        trikos.map((item) => item.id),
      );
    },
    variables: {
      client: client.id,
    },
  });

  return {
    favorites,
  };
};

export default useFavorites;
