import {useState} from 'react';
import {UPDATE_TRIKO_LOCATION} from './queries';
import {useMutation} from '@apollo/react-hooks';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'shared/hooks/use-notification';
import {useSession} from 'hooks/index';

/**
 * This hook allows to update the user location
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{updateLocation: *, loading: *}}
 */
const useUserPositionUpdate = () => {
  const [sendRequest] = useMutation(UPDATE_TRIKO_LOCATION);
  const {
    stack: {currentLocation = {}, user = {}, locale},
    setKey,
  } = useSession();
  const [loading, setLoading] = useState(false);
  const {error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-triko-position/index.js',
  });
  /**
   * This function calls the mutation to update the user location
   * @param payload
   * @returns {Promise<void>}
   */
  const updateLocation = async (payload = {}) => {
    const {lat, lng} = payload;
    const {latitude, longitude} = currentLocation;
    setLoading(true);
    try {
      if (latitude !== lat && longitude !== lng) {
        await sendRequest({
          variables: {
            lat,
            lng,
            user: user.id,
            locale,
          },
        });
        await setKey('currentLocation', {
          latitude: lat,
          longitude: lng,
        });
      }
      setLoading(false);
    } catch (e) {
      reportError(e);
      error('Error while updating the user location');
      setLoading(false);
    }
  };
  return {
    loading,
    updateLocation,
  };
};

export default useUserPositionUpdate;
