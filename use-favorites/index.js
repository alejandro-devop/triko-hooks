import {useMemo} from 'react';
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

  /**
   * We use an on complete to keep taking the favorites from the session always.
   */
  const {data = {}, loading, refetch} = useQuery(GET_FAVORITES, {
    fetchPolicy: 'no-cache',
    pollInterval: 60000,
    onCompleted: ({response = {}}) => {
      const {favorite = {}} = response;
      const {trikos = []} = favorite;
      setKey(
        'favoriteTrikos',
        trikos.map((item) => item.id),
      );
    },
    variables: {
      client: client.id,
    },
  });

  const refresh = async () => {
    await refetch();
  };
  const favorites = useMemo(() => {
    const {response = {}} = data;
    const {favorite = {}} = response;
    const {trikos = []} = favorite;
    return trikos;
  }, [data]);
  return {
    favorites,
    loading,
    refresh,
  };
};

export default useFavorites;
