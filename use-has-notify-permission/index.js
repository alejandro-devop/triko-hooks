import {useState, useRef, useEffect} from 'react';
import {checkNotifications} from 'react-native-permissions';
import {requestNotifications, openSettings} from 'react-native-permissions';

export const useRequestNotificationPermission = (
  types = ['alert', 'sound'],
) => {
  const requestPermission = async () => {
    const {status} = await requestNotifications(types);
    return status;
  };

  return [requestPermission, openSettings];
};

const useHasNotifyPermission = () => {
  const [hasPermission, setHasPermission] = useState();
  const checkPermission = async () => {
    const {status} = await checkNotifications();
    console.log('Checking permissions....', status);
    setHasPermission(status === 'granted');
  };

  const handleCheckPermission = useRef(null);

  useEffect(() => {
    handleCheckPermission.current = checkPermission;
  });

  useEffect(() => {
    handleCheckPermission.current();
  }, []);

  return [hasPermission, checkPermission];
};

export default useHasNotifyPermission;
