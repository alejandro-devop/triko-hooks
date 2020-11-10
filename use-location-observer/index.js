import {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
});

const useLocationObserver = (options = {}) => {
  const {
    distanceFilter,
    timeout,
    enableHighAccuracy = false,
    maximumAge,
  } = options;
  const [initialized, setInitialized] = useState(false);
  const [location, setLocation] = useState({latitude: null, longitude: null});
  let observerId = null;

  const initialize = async () => {
    console.clear();
    console.log('Initializing watcher!');
    setInitialized(true);
    observerId = Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => {
        console.log('The location change! ', latitude, longitude);
        setLocation({
          latitude,
          longitude,
        });
      },
      (errorInfo) => {
        console.log('Error while watching position: ', errorInfo);
      },
      {
        timeout,
        enableHighAccuracy,
        maximumAge,
        distanceFilter,
      },
    );
  };

  const stopObserver = () => {
    Geolocation.clearWatch(observerId);
    Geolocation.stopObserving();
  };

  return {
    initialize,
    initialized,
    location,
    stopObserver,
    getLocation: () => location,
  };
};

export default useLocationObserver;
