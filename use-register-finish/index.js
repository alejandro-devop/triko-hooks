import {useState} from 'react';
import {FINALIZE_REGISTER} from './queries';
import {useMutation} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';
import {ACTIVE_STATE} from 'config/user-statuses';

/**
 * This function allows to mark the user  as the register is completed.
 * @version 1.0.0
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{finish: *, loading: *}}
 */
export const useRegisterFinish = () => {
  const [loading, setLoading] = useState(false);
  const {error} = useNotify();
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-register-finish/index.js',
  });
  const [sendRequest] = useMutation(FINALIZE_REGISTER);
  const {
    setKey,
    stack: {locale, user = {}},
  } = useSession();

  const finish = async (options = {}) => {
    const {forceActive} = options;
    setLoading(true);
    try {
      const {data = {}} = await sendRequest({
        variables: {
          locale,
          userId: user.id,
        },
      });
      if (data.response && data.response.id) {
        await setKey('user', {
          ...user,
          workflow: forceActive
            ? ACTIVE_STATE
            : data.response.transition.workflow,
        });
      }
      setLoading(false);
    } catch (e) {
      reportError(e, {code: 'TK-000004'});
      error('Error while updating the user workflow');
      setLoading(false);
    }
  };

  return {
    finish,
    loading,
  };
};
