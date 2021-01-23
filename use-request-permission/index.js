import {Linking, Platform} from 'react-native';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from 'shared/components/permissions-manager';
import {request} from 'react-native-permissions';

/**
 * Allows to request one permission at a time.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @param permission
 * @returns {[requestPermission, openSettings]}
 * @returns pos 1: Function to request permissions, which returns an
 *                 Object with granted or blocked positions.
 * @returns pos 2: Function to
 */
const useRequestPermission = (permission) => {
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-request-permissions/index.js',
  });

  /**
   * Function to trigger the permission request
   * @returns {Promise<{blocked: *, granted: *}>}
   */
  const requestPermission = async () => {
    try {
      const permissionName =
        Platform.OS === 'ios'
          ? IOS_PERMISSIONS[permission]
          : ANDROID_PERMISSIONS[permission];
      const response = await request(permissionName);
      let granted = false;
      let blocked = false;

      if (response === 'unavailable' || response === 'blocked') {
        blocked = true;
      } else if (response === 'granted') {
        granted = true;
      }

      return {
        granted,
        blocked,
      };
    } catch (e) {
      reportError(e, {
        message: 'Error while requesting permissions',
        code: 'TK-000007',
      });
    }
  };

  const openSettings = async () => {
    await Linking.openSettings();
  };

  return [requestPermission, openSettings];
};

export default useRequestPermission;
