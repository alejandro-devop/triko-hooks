import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import useNotify from 'shared/hooks/use-notification';
import Geolocation from '@react-native-community/geolocation';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {useSession} from 'hooks/index';

/**
 * This hook gets the user current location
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param options
 * @returns {{getLocation: *, location: *, loading: *, getGeoLocation: function}}
 */
const useUserLocation = (options = {}) => {
  const {onLocationFound, lazy} = options;
  const [loading, setLoading] = useState(false);
  const {setKey} = useSession();
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
        const geoOptions = {
          timeout: 10000,
          maximumAge: 0,
          enableHighAccuracy: true,
        };
        if (Platform.OS === 'android') {
          delete geoOptions.maximumAge;
          delete geoOptions.enableHighAccuracy;
        }

        Geolocation.getCurrentPosition(
          ({coords}) => {
            const {latitude: lat, longitude: lng} = coords;
            setKey('locationUnavailable', false);
            if (onLocationFound) {
              // This delay is to ensure that the locationUnavailable flag is set to false first
              setTimeout(() => {
                onLocationFound({lat, lng});
              }, 300);
            }
            setLocation({lat, lng});
          },
          (error) => {
            setKey('locationUnavailable', true);
            reportError(error, {
              code: 'TK-000001',
              // message: 'Error while getting the user location',
            });
          },
          geoOptions,
        );
      }
      setLoading(false);
    } catch (e) {
      reportError(e);
      error('Error while getting the current location');
      setLoading(false);
    }
  };

  const getGeoLocation = async (geoOptions = {}) => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({coords}) => {
          resolve(coords);
        },
        (error) => {
          reject(error);
        },
        geoOptions,
      );
    });
  };

  useEffect(() => {
    if (!lazy) {
      getLocation();
    }
  }, []);
  return {
    getLocation,
    getGeoLocation,
    loading,
    location,
  };
};

export default useUserLocation;
