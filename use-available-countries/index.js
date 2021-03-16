import {countries} from 'countries-list';
import useRegionConfig from 'shared/hooks/use-regional-config';

const useAvailableCountries = () => {
  const {availableCountries = []} = useRegionConfig();
  const countryList = availableCountries.map((countryKey) => {
    return {...countries[countryKey], code: countryKey};
  });
  return countryList;
};

export default useAvailableCountries;
