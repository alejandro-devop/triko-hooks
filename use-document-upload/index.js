import {useState} from 'react';
import useNotify from 'shared/hooks/use-notification';
import useTranslation from 'shared/hooks/use-translate';
import {useSession} from 'hooks/index';
import {useMutation} from '@apollo/react-hooks';
import {UPLOAD_REQUIRED_DOC} from 'components/required-documents/queries';

/**
 * This hook allows to upload a required document.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @returns {{loading: *, uploadDocument: *}}
 */
const useDocumentUpload = () => {
  const [loading, setLoading] = useState(false);
  const {error} = useNotify();
  const [uploadFile] = useMutation(UPLOAD_REQUIRED_DOC);
  const {
    stack: {locale, myDocuments, triko = {}},
    setKey,
  } = useSession();
  const {_t} = useTranslation();

  const uploadDocument = async (payload = {}) => {
    const {
      files = [],
      documentId,
      requirementId,
      step,
      onDone,
      onError,
      attrs = {},
    } = payload;
    setLoading(true);
    try {
      const variables = {
        reqId: documentId,
        step,
        file: files && files.length > 0 ? JSON.stringify(files) : null,
        triko: triko.id,
        trikoReq: requirementId,
        locale,
        attrs: JSON.stringify(attrs),
      };
      const response = await uploadFile({
        variables,
      });

      const {response: newDoc} = response.data || {};
      let myNewDocuments = [...myDocuments];
      // If the document is not uploaded we push it into my documents.
      if (
        !myDocuments.find((doc) => doc.requirement.id === newDoc.requirement.id)
      ) {
        myNewDocuments.push(newDoc);
      } else {
        // Otherwise we update the uploaded document in my documents
        myNewDocuments = myDocuments.map((item) => {
          if (item.requirement.id === newDoc.requirement.id) {
            item = newDoc;
          }
          return item;
        });
      }
      setLoading(false);
      setKey('myDocuments', myNewDocuments);
      if (onDone) {
        onDone();
      }
    } catch (e) {
      console.log('error: ', e);
      error(_t('generic_error', {code: 'TK-00012'}));
      setLoading(false);
      if (onError) {
        onError();
      }
    }
  };
  return {loading, uploadDocument};
};

export default useDocumentUpload;
