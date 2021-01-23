import {useState} from 'react';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {ADD_FAVORITE} from './queries';
import {useMutation} from '@apollo/react-hooks';

/**
 * Provides function to add trikos to favorites, it also saves it in session.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {[sendRequest, boolean]}
 */
const useAddFavorite = () => {
  const {
    stack: {favoriteTrikos = [], client = {}, locale},
    setKey,
  } = useSession();
  const [loading, setLoading] = useState(false);
  const [callMutation] = useMutation(ADD_FAVORITE);
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-add-favorite/index.js',
  });
  /**
   * Triggers the mutation call to add a triko to the favorites list
   * @param trikoId
   * @param remove
   * @returns {Promise<void>}
   */
  const sendRequest = async (trikoId, remove) => {
    try {
      setLoading(true);
      const {data = {}} = await callMutation({
        variables: {
          client: client.id,
          triko: trikoId,
          locale,
          remove: remove === true ? true : null,
        },
      });
      if (remove) {
        await setKey(
          'favoriteTrikos',
          favoriteTrikos.filter((item) => item.id !== trikoId),
        );
      } else {
        await setKey('favoriteTrikos', [...favoriteTrikos, data.response]);
      }

      setLoading(false);
    } catch (e) {
      setLoading(false);
      reportError(e, {
        message: 'Error while adding to favorite',
        code: 'TUA-000008',
      });
    }
  };

  return [sendRequest, loading];
};

export default useAddFavorite;
