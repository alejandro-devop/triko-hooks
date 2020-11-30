import {APP_CODE, ERROR_REPORTER_URL} from 'react-native-dotenv';
import {useSession} from 'hooks/index';
import {isEmpty} from 'shared/utils/functions';
import useNotify from 'hooks/useNotification';
import useTranslation from 'hooks/useTranslation';

const useErrorReporter = (config = {}) => {
  const {
    stack: {user = {}},
  } = useSession();
  const {_t} = useTranslation();
  const {error} = useNotify();
  const userId = !isEmpty(user) ? user.id : 'none';
  const phone = !isEmpty(user) ? user.phonenumber : 'none';

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
          user: userId,
          phone: phone,
          code,
        }),
      });
      // response.json();
    } catch (e) {
      console.log('Cannot get error');
    }
  };
};

export default useErrorReporter;
