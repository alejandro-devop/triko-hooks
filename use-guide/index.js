import {useContext} from 'react';
import {GuideContext} from 'shared/components/step-guidance/GuidanceProvider';
import {useMutation} from '@apollo/react-hooks';
import {UPDATE_USER_ATTRS} from 'config/queries/user-queries';
import useNotify from 'hooks/useNotification';
import useSession from 'hooks/useSession';

const useGuide = () => {
  const {steps, currentKey, addGuides, onPop} = useContext(GuideContext);
  const {
    stack: {user = {}},
    setKey,
  } = useSession();
  const [updateUser] = useMutation(UPDATE_USER_ATTRS);
  const {error} = useNotify();
  const {attrs = {}} = user;
  const userGuides = attrs.guides || {};
  return {
    steps,
    currentKey,
    addGuides,
    onPop: async () => {
      try {
        const newGuides = {
          ...userGuides,
          [currentKey]: true,
        };
        await updateUser({
          variables: {
            id: user.id,
            attrs: JSON.stringify({
              guides: newGuides,
            }),
          },
        });
        setKey('user', {
          ...user,
          attrs: {
            ...attrs,
            guides: newGuides,
          },
        });
      } catch (err) {
        console.log('Error: ', err);
        error('Error while updating the user attrs');
      }
      onPop();
    },
  };
};

export default useGuide;
