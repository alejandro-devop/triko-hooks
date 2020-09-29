import {useState} from 'react';
import Geocoder from 'react-native-geocoding';

const useAddressLocation = () => {
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const getCurrentPosition = async ({addressQuery, city}) => {
    setLoading(true);
    try {
      const {results = []} = await Geocoder.from(`${city}, ${addressQuery}`);
      if (results.length === 0) {
        setNotFound(true);
      } else {
        const [addressMatch] = results;
        const {geometry = {}} = addressMatch;
        const {location = {}} = geometry;
        setNotFound(false);
        setLoading(false);
        return location;
      }
    } catch (e) {
      console.log('Error: ', e);
      setLoading(false);
      setNotFound(true);
    }
  };
  return {
    getCurrentPosition,
    loading,
    notFound,
  };
};

export default useAddressLocation;
