import {useState} from 'react';
import {isEmpty} from 'shared/utils/functions';

const useMachine = (steps = {}, initialStep = '') => {
  const keys = Object.keys(steps);
  const [currentStep, setCurrentStep] = useState(
    !isEmpty(initialStep) ? initialStep : keys[0],
  );
  const [currentKey, setCurrentKey] = useState(
    keys.findIndex((key) => key === currentStep),
  );

  let foundStep = null;
  const totalKeys = keys.length;
  const lastKey = totalKeys - 1;
  const firstKey = 0;
  const lastStep = keys[lastKey];
  const firstStep = keys[firstKey];
  let stepOptions = {};

  if (!isEmpty(currentStep)) {
    foundStep = steps[currentStep] || null;
  }
  const goToTransition = (transition) => {
    if (keys.includes(transition)) {
      setCurrentStep(transition);
    }
  };

  const goBack = () => {};
  const goNext = () => {
    let nextKey = currentKey + 1;
    if (nextKey > lastKey) {
      nextKey = lastKey;
    }
    setCurrentKey(nextKey);
    setCurrentStep(keys[nextKey]);
  };

  if (foundStep && typeof foundStep === 'object') {
    stepOptions = foundStep.options || {};
    foundStep = foundStep.component || null;
  }
  console.log('Current step: ', currentStep, keys, currentKey);
  return [
    foundStep,
    {
      stepOptions,
      goToTransition,
      goBack,
      goNext,
    },
  ];
};

export default useMachine;
