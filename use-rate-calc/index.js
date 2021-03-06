import {CALC_RATE} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import useMyServices from 'shared/hooks/use-my-services';
import {isEmpty} from 'shared/utils/functions';

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
    price,
    onCompleted,
  } = options;

  const {loading, data = {}} = useQuery(CALC_RATE, {
    fetchPolicy: 'no-cache',
    variables: {
      byService,
      services: JSON.stringify(services),
      date,
      duration: parseInt(duration, 10),
      byHour,
      price,
      type: type.id,
      distance,
      time,
      transport,
      tip,
      triko: !isEmpty(triko) && !isEmpty(triko.id) ? triko.id : '0',
      region: regionId,
    },
    onCompleted: ({response = {}}) => {
      const requestServices = response.services;
      const requestTotal = calcTotal(requestServices);
      if (onCompleted) {
        onCompleted(requestTotal);
      }
    },
  });
  const calcTotal = (requestServices = []) =>
    requestServices.reduce((accumulator, currentItem) => {
      const {Total} = currentItem.detail || {};
      accumulator += Total;
      return accumulator;
    }, 0);

  const {services: calcServices = []} = data.response || {};
  const total = calcTotal(calcServices);
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
  const {request = {}} = options;
  const {
    stack: {myServices = []},
  } = useSession();
  const serviceIds = !isEmpty(request.details)
    ? request.details.map((item) => parseInt(item.service.id, 10))
    : [];
  const requestServices = myServices.filter((item) =>
    serviceIds.includes(parseInt(item.id, 10)),
  );
  const total =
    requestServices.reduce((accumulator, currentItem) => {
      accumulator += currentItem.price_base;
      return accumulator;
    }, 0) * parseInt(request.duration, 10);

  return {
    loading: false,
    total,
  };
};

export const useCalcRateClient = (options = {}) => {
  const {request = {}, byService = false, onCompleted} = options;
  const {
    details = [],
    application_date: date,
    duration,
    byHour = true,
    time,
    type = {},
    distance,
    attrs = {},
    triko = {},
    total: price,
    attributes,
    isFavor,
  } = request;
  const {transport, tip} = attrs;
  const {incentive} = !isEmpty(attributes) ? JSON.parse(attributes) : {};
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
    price: isFavor ? price : null,
    transport,
    tip: !isEmpty(tip) && tip > 0 ? tip : incentive,
    services,
    onCompleted,
  });
  return {
    loading,
    total,
  };
};

export const useCalcRatePostulate = (options = {}) => {
  const {request = {}, trikoId, rate = 0} = options;
  const {
    stack: {regionId},
  } = useSession();
  const {
    attributes,
    details = [],
    duration = 1,
    application_date: requestDate,
    type = {},
    transport = 0,
  } = request;
  const services = details.map((item) => item.service.id);
  const {incentive = 0} = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const {loading, data = {}} = useQuery(CALC_RATE, {
    fetchPolicy: 'no-cache',
    variables: {
      byService: false,
      services: JSON.stringify(services),
      triko: trikoId,
      region: regionId,
      date: requestDate,
      price: rate,
      duration: parseInt(duration, 10),
      type: type.id,
      tip: parseFloat(incentive, 10),
      transport: parseFloat(transport, 10),
    },
  });
  const calcTotal = (requestServices = []) =>
    requestServices.reduce((accumulator, currentItem) => {
      const {Total} = currentItem.detail || {};
      accumulator += Total;
      return accumulator;
    }, 0);

  const {services: calcServices = []} = data.response || {};
  const total = calcTotal(calcServices);
  return {loading, total};
};
