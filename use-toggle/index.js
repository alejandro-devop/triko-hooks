import {useState} from 'react';
import {isEmpty} from 'shared/utils/functions';

const useToggle = (defaultValue = false) => {
  const [visible, setVisible] = useState(defaultValue);
  const toggle = (value) => {
    if (!isEmpty(value)) {
      setVisible(value);
    } else {
      setVisible(!visible);
    }
  };
  return [visible, toggle];
};

export default useToggle;
