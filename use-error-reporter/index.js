import {APP_CODE, ERROR_REPORTER_URL} from 'react-native-dotenv';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';
import useNotify from 'hooks/useNotification';
import useTranslation from 'hooks/useTranslation';

const useErrorReporter = (config = {}) => {
  const {stack = {}} = useSession();
  const {
    user = {},
    locale,
    region,
    triko = {},
    client = {},
    countryCode,
    regionId,
    currentLocation,
  } = stack;
  const {_t} = useTranslation();
  const {error} = useNotify();
  const userId = !isEmpty(user) ? user.id : 'none';
  const phone = !isEmpty(user) ? user.phonenumber : 'none';
  const sessionToSend = {
    locale,
    region,
    triko: !isEmpty(triko) ? triko.id : null,
    client: !isEmpty(client) ? client.id : null,
    user: !isEmpty(user) ? user.id : null,
    countryCode,
    regionId,
    currentLocation: !isEmpty(currentLocation) ? currentLocation : null,
  };
  const {path} = config;
  return async (errorInfo = {}, messageOptions = {}) => {
    const {message, code} = messageOptions;
    try {
      if (message) {
        error(_t(message, {code}));
      }
      await fetch(ERROR_REPORTER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          application: APP_CODE,
          file: path,
          error: errorInfo.message,
          session: JSON.stringify(sessionToSend),
          user: userId,
          phone: phone,
          code,
        }),
      });
      console.log('Thrown error: ', errorInfo);
      // response.json();
    } catch (e) {
      console.log('Cannot get error');
    }
  };
};

export default useErrorReporter;
