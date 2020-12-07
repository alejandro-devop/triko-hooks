import {useQuery} from '@apollo/react-hooks';
import {GET_REQUEST} from './queries';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';

export const useRequestFetcher = ({requestId, onComplete}) => {
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
    onCompleted: ({response = {}}) => {
      if (onComplete) {
        const [request = {}] =
          !isEmpty(response) && Array.isArray(response) ? response : [];
        onComplete(request);
      }
    },
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
