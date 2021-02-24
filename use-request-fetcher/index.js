import {useQuery} from '@apollo/react-hooks';
import {GET_REQUEST} from './queries';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';
import useRegionConfig from 'shared/hooks/use-regional-config';

export const useRequestFetcher = ({requestId, onComplete}) => {
  const {
    stack: {locale},
  } = useSession();
  const {requestFetchInterval} = useRegionConfig();
  const {loading, refetch, data = {}} = useQuery(GET_REQUEST, {
    fetchPolicy: 'no-cache',
    pollInterval: requestFetchInterval,
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
