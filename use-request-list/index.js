import useSession from 'shared/hooks/use-session-triko';
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_PENDING_REQUEST_CLIENT, GET_PENDING_REQUEST_TRIKO} from './queries';
import {useMemo} from 'react';
import useRegionConfig from 'shared/hooks/use-regional-config';
import {STATUS_CANCEL} from 'config/request-statuses';
import {startedStatuses} from 'shared/hooks/use-request-status';
import {isEmpty} from 'shared/utils/functions';
import {WORKFLOWS_MAP} from 'shared/commons/constants';
export const TYPE_REQUEST = 1;
export const TYPE_EMERGENCY = 2;
export const TYPE_BAG = 3;

const getType = ({allTypes, onlyFavors}) => {
  if (allTypes) {
    return null;
  } else if (onlyFavors) {
    return TYPE_BAG;
  }
  return TYPE_REQUEST;
};

const useRequestList = (options = {}) => {
  const {
    allTypes,
    onlyFavors,
    isTriko,
    noRunning,
    onlyCurrentDay,
    onlyMyServices,
    noCanceled,
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
      const {workflow} = !isEmpty(item.transition) ? item.transition : {};
      const attributes = item.attributes ? JSON.parse(item.attributes) : {};
      const isFinished =
        (isTriko && attributes.terminatedTriko) ||
        (!isTriko && attributes.terminatedClient);
      if (noFinished && isFinished) {
        return false;
      }
      if (noCanceled && workflow === STATUS_CANCEL) {
        return false;
      }
      if (noRunning && startedStatuses.includes(workflow)) {
        return false;
      }
      if (onlyFavors) {
        return included;
      }
      return true;
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
