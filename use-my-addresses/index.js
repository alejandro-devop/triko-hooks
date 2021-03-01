import {useMemo} from 'react';
import {GET_ADDRESSES_CLIENT, GET_ADDRESSES_TRIKO} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

const useMyAddresses = (options = {}) => {
  const {isTriko, onCompleted} = options;
  const {
    stack: {client = {}, triko = {}, locale},
    setKey,
  } = useSession();
  const query = isTriko ? GET_ADDRESSES_TRIKO : GET_ADDRESSES_CLIENT;
  const {loading, data = [], refetch} = useQuery(query, {
    fetchPolicy: 'no-cache',
    variables: {
      ...(isTriko ? {triko: triko.id} : {client: client.id}),
      locale,
    },
    onCompleted: ({response}) => {
      setKey('myAddresses', response);
      if (onCompleted) {
        onCompleted(response);
      }
    },
  });

  const refresh = () => {
    refetch();
  };

  const addresses = useMemo(() => {
    return data.response && Array.isArray(data.response) ? data.response : [];
  }, [data]);

  return {loading, addresses, refresh};
};

export default useMyAddresses;
