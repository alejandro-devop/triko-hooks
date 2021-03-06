import {useMemo, useState} from 'react';
import useSession from 'shared/hooks/use-session-triko';
import {useLazyQuery} from '@apollo/react-hooks';
import {GET_PENDING_REQUEST_CLIENT, GET_PENDING_REQUEST_TRIKO} from './queries';
import useRegionConfig from 'shared/hooks/use-regional-config';
import {STATUS_CANCEL, STATUS_FINISHED} from 'config/request-statuses';
import {startedStatuses} from 'shared/hooks/use-request-status';
import {isEmpty} from 'shared/utils/functions';
import {WORKFLOWS_MAP} from 'shared/commons/constants';
import moment from 'moment';
export const TYPE_REQUEST = 1;
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
    onlyFavors,
    isTriko,
    noRunning,
    onlyCurrentDay,
    noCanceled,
    noFinished,
    onlyPending,
    onlyFutureEvents,
    onlyOwned,
  } = options;
  const {
    stack: {
      client = {},
      triko = {},
      locale,
      currentLocation: userLocation = {},
    },
  } = useSession();
  const [currentLocation] = useState(userLocation);
  const {trikoFavorIds = [], defaultSearchDistance = 2} = useRegionConfig();
  const currentDate = moment().format('YYYY-MM-DD');
  const variables = {
    ...(isTriko ? {triko: triko.id} : {client: client.id}),
    type: getType(options),
    locale,
    workflow: [],
  };

  if (onlyFavors && !isEmpty(currentLocation)) {
    const {latitude, longitude} = currentLocation;
    variables.nearest = JSON.stringify({
      longitude,
      latitude,
      radius: defaultSearchDistance,
    });
  }

  if (onlyPending) {
    variables.onlyPending = true;
    variables.workflow.push(WORKFLOWS_MAP.pending);
  }
  if (onlyCurrentDay) {
  }
  if (onlyOwned) {
    variables.onlyOwned = true;
  }
  if (onlyFutureEvents) {
    variables.date = `>=.${currentDate}`;
  }
  if (onlyCurrentDay) {
    variables.date = `${currentDate}`;
  }
  variables.workflow = JSON.stringify(variables.workflow);
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
      const {triko: requestTrikos = []} = item;
      const includedInFavors = trikoFavorIds.includes(service.type.id);
      const {workflow} = !isEmpty(item.transition) ? item.transition : {};
      const attributes = item.attributes ? JSON.parse(item.attributes) : {};

      const isFinished =
        (isTriko && attributes.terminatedTriko) ||
        (!isTriko && attributes.terminatedClient);
      if (noFinished && (isFinished || workflow === STATUS_FINISHED)) {
        return false;
      }
      if (noCanceled && workflow === STATUS_CANCEL) {
        return false;
      }
      if (noRunning && startedStatuses.includes(workflow)) {
        return false;
      }
      const trikosIds = requestTrikos.map((item) => item.id);
      if (isTriko && onlyOwned && !trikosIds.includes(triko.id)) {
        return false;
      }
      if (
        isTriko &&
        !isEmpty(attributes.market) &&
        !isEmpty(attributes.cart) &&
        parseInt(attributes.cart, 10) === 0
      ) {
        return false;
      }
      if (onlyFavors) {
        return includedInFavors;
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
