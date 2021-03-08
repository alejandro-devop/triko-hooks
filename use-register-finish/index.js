import {useState} from 'react';
import {FINALIZE_REGISTER} from './queries';
import {useMutation} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'shared/hooks/use-notification';
import {ACTIVE_STATE} from 'config/user-statuses';
import useUserUpdate from 'shared/hooks/use-user-update';

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
  const {updateUser} = useUserUpdate();
  const [sendRequest] = useMutation(FINALIZE_REGISTER);
  const {
    setKey,
    stack: {locale, user = {}},
  } = useSession();

  const finish = async (options = {}) => {
    const {forceActive, attrs: customAttrs = {}} = options;
    setLoading(true);
    try {
      const {data = {}} = await sendRequest({
        variables: {
          locale,
          userId: user.id,
        },
      });
      if (data.response && data.response.id) {
        await updateUser({attrs: customAttrs});
        await setKey('user', {
          ...user,
          workflow: forceActive
            ? ACTIVE_STATE
            : data.response.transition.workflow,
          attrs: {
            ...user.attrs,
            ...customAttrs,
          },
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
