import {useState} from 'react';
import Geocoder from 'react-native-geocoder';
import Geocoding from 'react-native-geocoding';

export const cleanAddress = (address) => {
  const [street] = address.split(',');
  return street;
};

export const getGeocodeAddress = async ({latitude, longitude}) => {
  const {results = []} = await Geocoding.from({latitude, longitude});
  const [firstResult = {}] = results;
  const {formatted_address} = firstResult;
  if (formatted_address) {
    const [address] = formatted_address.split(',');
    return address;
  }
  return '';
};

/**
 * This hook allows to find an address using it's latitude and longitude
 * @author Jako <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @returns {{locationInfo: *, loading: *, getLocationInfo: *}}
 */
const useAddressFinder = () => {
  const [loading, setLoading] = useState(true);
  const [locationInfo, setLocationInfo] = useState({});

  const getLocationInfo = async ({lat, lng}) => {
    setLoading(true);
    try {
      const response = await Geocoder.geocodePosition({lat, lng});
      const addressFormatted = await getGeocodeAddress({
        latitude: lat,
        longitude: lng,
      });
      if (Array.isArray(response)) {
        const [matchedPos] = response;
        const {
          adminArea: department,
          country,
          countryCode,
          locality: city,
          subAdminArea,
        } = matchedPos;
        const formattedResponse = {
          department,
          country,
          countryCode,
          address: cleanAddress(addressFormatted),
          city,
          locality: `${city}${subAdminArea ? ' - ' + subAdminArea : ''}`,
        };
        setLocationInfo(formattedResponse);
        setLoading(false);
        return formattedResponse;
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return {loading, locationInfo, getLocationInfo};
};

export default useAddressFinder;
