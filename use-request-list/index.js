import useSession from 'shared/hooks/use-session-triko';
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_PENDING_REQUEST_CLIENT, GET_PENDING_REQUEST_TRIKO} from './queries';
import {useMemo} from 'react';
import useRegionConfig from 'shared/hooks/use-regional-config';

const useRequestList = (filter, isTriko) => {
  const {
    stack: {client = {}, triko = {}, locale},
  } = useSession();
  const {trikoFavorIds = []} = useRegionConfig();
  const variables = {
    ...(isTriko ? {triko: triko.id} : {client: client.id}),
    locale,
  };
  const [getPendingRequests, {data = {}, loading}] = useLazyQuery(
    isTriko ? GET_PENDING_REQUEST_TRIKO : GET_PENDING_REQUEST_CLIENT,
    {
      fetchPolicy: 'network-only',
      pollInterval: 10000,
      variables,
    },
  );
  const requests = useMemo(() => {
    let requestsList = data.response ? data.response : [];
    requestsList = requestsList.filter((item) => {
      const [detail = []] = item.details;
      const {service} = detail;
      const included = trikoFavorIds.includes(service.type.id);
      return filter === 0 ? !included : included;
    });
    return requestsList;
  }, [data, filter]);

  return {
    getPendingRequests,
    loading,
    requests,
  };
};

export default useRequestList;
