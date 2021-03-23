import {useState, useRef, useEffect} from 'react';
import {checkNotifications} from 'react-native-permissions';
import {requestNotifications, openSettings} from 'react-native-permissions';
import {useSession} from 'hooks/index';

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
  const {setKey} = useSession();
  const checkPermission = async () => {
    const {status} = await checkNotifications();
    const hasPermission = status === 'granted';
    setHasPermission(hasPermission);
    setKey('hasNotifyPermissions', hasPermission);
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
