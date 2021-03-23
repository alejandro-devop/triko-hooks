import React from 'react';
import useSession from 'hooks/useSession';
import currencyFormatter from 'currency-formatter';
import {countries} from 'countries-list';
import Flag from 'react-native-flags';

/**
 * This hook allows to obtain utils for currency format depending on the application language and reagion
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{flag: *, format: (function(*=, *=)), currency: *, locale: *}}
 */
const useCurrency = () => {
  const {
    stack: {region, countryCode, locale},
  } = useSession();
  const {currency} = countries[countryCode] || {};
  return {
    currency,
    flag: <Flag size={24} code={countryCode} />,
    locale,
    format: (value = 0, options = {}) => {
      const currencyOptions = {
        locale: region,
        format: '%s %v',
        precision: 0,
        ...options,
      };
      return currencyFormatter.format(value, currencyOptions);
    },
  };
};

export default useCurrency;
