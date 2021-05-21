import {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import useSession from 'hooks/useSession';

const useFbListener = (callback, eventName) => {
  const {
    stack: {hasNotifyPermissions},
  } = useSession();
  useEffect(() => {
    if (hasNotifyPermissions) {
      messaging().onMessage((notificationInfo) => {
        const {type} = notificationInfo.data ? notificationInfo.data : {};
        if (callback) {
          if (Array.isArray(eventName) && eventName.includes(type)) {
            callback(notificationInfo);
          } else if (type === eventName) {
            callback(notificationInfo);
          }
        }
      });
    }
  }, [hasNotifyPermissions]);
};

export default useFbListener;
