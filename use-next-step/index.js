import {useEffect, useState} from 'react';
import useSession from 'hooks/useSession';
import {
  ACTIVE_STATE,
  PERSONAL_INFORMATION_STATE,
  REGISTERING_STATE,
  REQUIRED_DOC_STATE,
  SELECTING_SERVICES_STATE,
} from 'config/user-statuses';

/**
 * This hook handles the trikolaborator step by step position while registering.
 * returns the current step depending on the user workflow step.
 * @author Jako <jakop.box@gmail.com>
 * @returns {{currentStep: *, setCurrentStep: *}}
 */
const useNextStep = () => {
  const {stack = {}} = useSession();
  const [currentStep, setCurrentStep] = useState(0);
  const {user = {}} = stack || {};
  const getNextStep = () => {
    switch (user.workflow) {
      case REGISTERING_STATE:
        return 1;
      case SELECTING_SERVICES_STATE:
        return 2;
      case PERSONAL_INFORMATION_STATE:
        return 3;
      case REQUIRED_DOC_STATE:
        return 4;
      case ACTIVE_STATE:
        return ACTIVE_STATE;
      default:
        return 1;
    }
  };
  useEffect(() => {
    setCurrentStep(getNextStep());
  }, [stack]);
  return {currentStep, setCurrentStep};
};

export default useNextStep;
