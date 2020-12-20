import {useState} from 'react';
import useErrorReporter from 'shared/hooks/use-error-reporter';
import useNotify from 'hooks/useNotification';
import {POSTULATE_TO_SERVICE} from './queries';
import {useMutation} from '@apollo/react-hooks';
import {useSession} from 'hooks/index';
import useRequestUpdateAttrs from 'shared/hooks/use-request-update-attrs';
import {isEmpty} from 'shared/utils/functions';

const useServicePostulate = (request = {}) => {
  const [loading, setLoading] = useState(false);
  const {attributes} = request;
  const requestAttr = !isEmpty(attributes) ? JSON.parse(attributes) : {};
  const reportError = useErrorReporter({
    path: 'src/main/components/request-detail-component/hooks.js',
  });
  const {
    stack: {locale},
  } = useSession();
  const [sendRequest] = useMutation(POSTULATE_TO_SERVICE);
  const {sendRequest: updateAttrs} = useRequestUpdateAttrs(request);
  const {error} = useNotify();

  const applyToService = async (payload = {}) => {
    const {rejected, accepted, triko = {}, rate} = payload;
    setLoading(true);
    try {
      await sendRequest({
        variables: {
          accepted,
          request: request.id,
          rejected,
          triko: triko.id,
          locale,
        },
      });
      let {applyRates = []} = requestAttr;
      if (rejected) {
        applyRates = applyRates.filter((item) => item.triko.id !== triko.id);
      } else if (accepted) {
        applyRates = [
          {
            triko: {
              id: triko.id,
            },
            rate,
          },
        ];
      } else {
        applyRates.push({
          triko: {
            id: triko.id,
          },
          rate,
        });
      }
      await updateAttrs({
        attrs: {
          applyRates,
          favorRate: rate,
        },
      });
      setLoading(false);
    } catch (e) {
      reportError(e);
      error('Error while sending postulation');
      setLoading(false);
    }
  };
  return {
    loading,
    applyToService,
  };
};

export default useServicePostulate;
