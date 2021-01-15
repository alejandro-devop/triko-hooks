import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

export const EVENT__DID_SHOW = 'keyboardDidShow';
export const EVENT__DID_HIDE = 'keyboardDidHide';

const useKeyboard = () => {
  const [keyboardVisible, setVisible] = useState(false);
  const [keyBoardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      EVENT__DID_SHOW,
      (e) => {
        const {endCoordinates = {}} = e;
        setKeyboardHeight(endCoordinates.height);
        setVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      EVENT__DID_HIDE,
      () => {
        setVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return [keyboardVisible, keyBoardHeight];
};

export default useKeyboard;
