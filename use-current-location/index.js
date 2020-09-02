import {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {Platform} from 'react-native';

const useCurrentLocation = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({});
  const getCurrentLocation = async () => {
    setLoading(true);
    try {
      if (Geolocation) {
        await Geolocation.getCurrentPosition(
          async ({coords = {}}) => {
            const {latitude: lat, longitude: lng} = coords;
            setPosition({lat, lng});
          },
          () => {},
          Platform.select({
            ios: {},
            android: {
              enableHighAccuracy: false,
              timeout: 5000,
              maximumAge: 10000,
            },
          }),
        );
      }
      setLoading(false);
      return position;
    } catch (err) {
      setLoading(false);
    }
  };
  return {
    getCurrentLocation,
    loading,
    position,
  };
};

export default useCurrentLocation;
