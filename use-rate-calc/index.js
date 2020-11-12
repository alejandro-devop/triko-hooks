import {CALC_RATE} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

const useCalcTotal = (options = {}) => {
  const {
    date,
    byService,
    duration,
    byHour,
    time,
    type,
    distance,
    triko,
    regionId,
    transport,
    tip,
    services,
  } = options;
  const {loading, data = {}} = useQuery(CALC_RATE, {
    fetchPolicy: 'no-cache',
    variables: {
      byService,
      services: JSON.stringify(services),
      date,
      duration: parseInt(duration, 10),
      byHour,
      type: type.id,
      distance,
      time,
      transport,
      tip,
      triko: triko.id,
      region: regionId,
    },
  });
  const {services: calcServices = []} = data.response || {};
  const total = calcServices.reduce((accumulator, currentItem) => {
    const {Total} = currentItem.detail || {};
    accumulator += Total;
    return accumulator;
  }, 0);
  return {loading, total};
};

/**
 * This hook allows to calculate the triko rating per service
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param options
 * @returns {{total: *, loading: *}}
 */
export const useCalcRate = (options = {}) => {
  // services: servicesIds,
  //   date: application_date,
  //   duration: parseInt(duration, 10),
  const {request = {}, byService = false} = options;
  const {
    details = [],
    application_date: date,
    duration,
    byHour,
    time,
    type = {},
    distance,
    attrs = {},
  } = request;
  const {transport, tip} = attrs;
  const services = details.map((item) => item.service.id);
  const {
    stack: {triko = {}, regionId},
  } = useSession();

  const {loading, total} = useCalcTotal({
    date,
    byService,
    duration,
    byHour,
    time,
    type,
    distance,
    triko,
    regionId,
    transport,
    tip,
    services,
  });
  return {
    loading,
    total,
  };
};

export const useCalcRateClient = (options = {}) => {
  const {request = {}, byService = false} = options;
  const {
    details = [],
    application_date: date,
    duration,
    byHour,
    time,
    type = {},
    distance,
    attrs = {},
    triko = {},
  } = request;
  const {transport, tip} = attrs;
  const services = details.map((item) => item.service.id);
  const {
    stack: {regionId},
  } = useSession();
  const {loading, total} = useCalcTotal({
    date,
    byService,
    duration,
    byHour,
    time,
    type,
    distance,
    triko,
    regionId,
    transport,
    tip,
    services,
  });
  return {
    loading,
    total,
  };
};
