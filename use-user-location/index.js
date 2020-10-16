import {useEffect, useState} from 'react';
import useNotify from 'hooks/useNotification';
import Geolocation from '@react-native-community/geolocation';

const useUserLocation = (options = {}) => {
  const {onLocationFound} = options;
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({});
  const {error} = useNotify();
  const getLocation = async () => {
    setLoading(true);
    try {
      if (Geolocation) {
        Geolocation.getCurrentPosition(async ({coords}) => {
          const {latitude: lat, longitude: lng} = coords;
          if (onLocationFound) {
            onLocationFound({lat, lng});
          }
          setLocation({lat, lng});
        });
      }
      setLoading(false);
    } catch (e) {
      error('Error while getting the current location');
      setLoading(false);
    }
  };
  useEffect(() => {
    getLocation();
  }, []);
  return {
    getLocation,
    loading,
    location,
  };
};

export default useUserLocation;
