import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {
  PermissionsManager,
  PERMISSIONS,
  ANDROID_PERMISSIONS,
  IOS_PERMISSIONS,
} from 'components/base/permissions-manager';
import RNPermissions from 'react-native-permissions';

export const APP_PERMISSIONS = {...PERMISSIONS};

const getInitialState = (permissions) =>
  permissions.reduce((accumulator, current) => {
    accumulator[current] = null;
    return accumulator;
  }, {});

/**
 * Allows to check if the user has a specific set of permissions, it also allows to trigger the
 * permission request
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @param options
 * @returns {{appPermissions: *, reCheck: *}}
 */
const useHasPermissions = (options = {}) => {
  const {permissions = []} = options;

  const [appPermissions, setAppPermissions] = useState(
    getInitialState(permissions),
  );

  const checkIos = async () => {
    const grantedPermissions = {};
    const permissionStatuses = await Promise.all(
      permissions.map(
        async (permissionName) =>
          await RNPermissions.check(IOS_PERMISSIONS[permissionName]),
      ),
    );
    permissionStatuses.forEach((status, key) => {
      let granted = false;
      if (status === 'granted') {
        granted = true;
      }
      grantedPermissions[permissions[key]] = granted;
    });
    setAppPermissions(grantedPermissions);
  };

  const checkAndroid = async () => {
    const grantedPermissions = {};
    const permissionStatuses = await Promise.all(
      permissions.map(
        async (permissionName) =>
          await RNPermissions.check(ANDROID_PERMISSIONS[permissionName]),
      ),
    );
    permissionStatuses.forEach((status, key) => {
      let granted = false;
      if (status === 'granted') {
        granted = true;
      }
      grantedPermissions[permissions[key]] = granted;
    });
    setAppPermissions(grantedPermissions);
  };

  const checkPermissions = async () => {
    if (Platform.OS === 'ios') {
      await checkIos();
    } else {
      await checkAndroid();
    }
  };

  useEffect(() => {
    checkPermissions();
  }, []);

  return {
    appPermissions,
    reCheck: checkPermissions,
  };
};

export default useHasPermissions;
