import useSession from 'shared/hooks/use-session-triko';
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_PENDING_REQUEST_CLIENT, GET_PENDING_REQUEST_TRIKO} from './queries';
import {useMemo} from 'react';
import useRegionConfig from 'shared/hooks/use-regional-config';
import {STATUS_FINISHED} from 'config/request-statuses';

export const TYPE_REQUEST = 1;
export const TYPE_EMERGENCY = 2;
export const TYPE_BAG = 3;
export const WORKFLOWS_MAP = {
  pending: 21,
  approved: 19,
  rejected: 20,
  accepted: 22,
  payment: 23,
  onMyWay: 24,
  onYourDoor: 25,
};

const getType = ({onlyFavors}) => {
  if (onlyFavors) {
    return TYPE_BAG;
  }
  return TYPE_REQUEST;
};

const useRequestList = (options = {}) => {
  const {
    onlyFavors,
    isTriko,
    onlyCurrentDay,
    onlyMyServices,
    noFinished,
    onlyPending,
  } = options;
  const {
    stack: {client = {}, triko = {}, locale, currentLocation = {}},
  } = useSession();
  const {trikoFavorIds = [], defaultSearchDistance = 20} = useRegionConfig();
  const variables = {
    ...(isTriko ? {triko: triko.id} : {client: client.id}),
    type: getType(options),
    locale,
  };
  if (onlyFavors) {
    delete variables.triko;
    delete variables.client;
    const {latitude, longitude} = currentLocation;
    variables.nearest = JSON.stringify({
      longitude,
      latitude,
      radius: defaultSearchDistance,
    });
  }

  if (onlyPending) {
    variables.workflow = WORKFLOWS_MAP.pending;
  }

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
      const {workflow} = item.transition;
      if (noFinished && workflow === STATUS_FINISHED) {
        return false;
      }
      return !onlyFavors ? !included : included;
    });
    return requestsList;
  }, [data, onlyFavors]);

  return {
    getPendingRequests,
    loading,
    requests,
  };
};

export default useRequestList;
