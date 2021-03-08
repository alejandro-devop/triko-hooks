import {useState} from 'react';
import useNotify from 'shared/hooks/use-notification';
import useTranslation from 'shared/hooks/use-translate';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_TRIKO} from './queries';
import {useSession} from 'hooks/index';

/**
 * This hook allows you to update the triko information.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @returns {{updateTriko: *, loading: *}}
 */
const useUpdateTriko = () => {
  const {
    stack: {triko = {}, user = {}, locale},
    setKey,
  } = useSession();
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(UPDATE_TRIKO);
  const {error} = useNotify();
  const {_t} = useTranslation();
  const updateTriko = async (payload = {}) => {
    const {attrs = {}, onSuccess} = payload;
    try {
      setLoading(true);
      await sendRequest({
        variables: {
          id: triko.id,
          user: user.id,
          locale,
          attrs: JSON.stringify(attrs),
        },
      });
      setKey('triko', {
        ...triko,
        trikoAttrs: {
          ...triko.trikoAttrs,
          attrs: {
            ...triko.trikoAttrs.attrs,
            ...attrs,
          },
        },
      });
      setLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      console.log('Error: ', e);
      error(_t('generic_error'));
      setLoading(false);
    }
  };
  return {
    loading,
    triko,
    updateTriko,
  };
};

export default useUpdateTriko;
