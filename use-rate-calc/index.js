import {CALC_RATE} from './queries';
import {useQuery} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';

/**
 * This hook allows to calculate the triko rating per service
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param options
 * @returns {{total: *, loading: *}}
 */
export const useCalcRate = (options = {}) => {
  const {
    byService = false,
    services = [],
    date = '',
    duration = 0,
    byHour = 1,
    type = 1,
    distance = '',
    time = '',
    transport = 0,
    tip = 0,
  } = options;
  const {
    stack: {triko = {}, regionId},
  } = useSession();
  const {loading, data = {}} = useQuery(CALC_RATE, {
    fetchPolicy: 'no-cache',
    variables: {
      byService,
      services: JSON.stringify(services),
      date,
      duration,
      byHour,
      type,
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
  return {
    loading,
    total,
  };
};
