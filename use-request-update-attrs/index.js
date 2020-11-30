import {useState} from 'react';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_REQUEST_ATTRS} from './queries';
import {useSession} from 'hooks/index';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import {isEmpty} from 'shared/utils/functions';

const useRequestUpdateAttrs = (request) => {
  const [loading, setLoading] = useState(false);
  const [sendRequest] = useMutation(UPDATE_REQUEST_ATTRS);
  const {
    stack: {locale},
  } = useSession();
  const reportError = useErrorReporter({
    path: 'src/shared/hooks/use-request-update-attrs/index.js',
  });
  const updateRequest = async (payload = {}, requestOverride) => {
    setLoading(true);
    const {attrs = {}, image} = payload;
    const {longitude, latitude} = (!isEmpty(requestOverride)
      ? requestOverride
      : request
    ).attrs;
    try {
      await sendRequest({
        variables: {
          request: (!isEmpty(requestOverride) ? requestOverride : request).id,
          duration: (!isEmpty(requestOverride) ? requestOverride : request)
            .duration,
          longitude,
          latitude,
          locale,
          attrs: JSON.stringify(attrs),
          image: !isEmpty(image) ? JSON.stringify(image) : null,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e, {code: 'TUA-000005'});
      setLoading(false);
    }
  };

  return {
    loading,
    sendRequest: updateRequest,
  };
};

export default useRequestUpdateAttrs;
