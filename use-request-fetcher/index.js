import {useQuery} from '@apollo/react-hooks';
import {GET_REQUEST} from './queries';
import {useSession} from 'hooks/index';

export const useRequestFetcher = ({requestId}) => {
  const {
    stack: {locale},
  } = useSession();
  const {loading, refetch, data = {}} = useQuery(GET_REQUEST, {
    fetchPolicy: 'no-cache',
    pollInterval: 5000,
    variables: {
      id: requestId,
      locale,
    },
    onCompleted: () => {},
  });
  const refresh = async () => {
    try {
      await refetch();
    } catch (e) {
      console.log('Error while refetching the service');
    }
  };
  const [request = {}] =
    data.response && Array.isArray(data.response) ? data.response : [];
  return {
    loading,
    refresh,
    request,
  };
};
