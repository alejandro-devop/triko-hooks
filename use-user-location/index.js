import {useEffect, useState} from 'react';
import useNotify from 'hooks/useNotification';
import Geolocation from '@react-native-community/geolocation';
import useErrorReporter from 'shared/hooks/use-error-reporter';

/**
 * This hook gets the user current location
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param options
 * @returns {{getLocation: *, location: *, loading: *}}
 */
const useUserLocation = (options = {}) => {
  const {onLocationFound} = options;
  const [loading, setLoading] = useState(false);
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-user-location/index.js',
  });
  const [location, setLocation] = useState({});
  const {error} = useNotify();

  /**
   * This function is used to fetch the user current location.
   * @returns {Promise<void>}
   */
  const getLocation = async () => {
    setLoading(true);
    try {
      if (Geolocation) {
        Geolocation.getCurrentPosition(
          async ({coords}) => {
            const {latitude: lat, longitude: lng} = coords;
            if (onLocationFound) {
              onLocationFound({lat, lng});
            }
            setLocation({lat, lng});
          },
          () => {},
          {
            maximumAge: 0,
            enableHighAccuracy: true,
          },
        );
      }
      setLoading(false);
    } catch (e) {
      reportError(e);
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
