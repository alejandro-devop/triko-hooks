import Snackbar from 'react-native-snackbar';
import palette from 'themes/styles/palette';

const successNotify = (message) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: palette.success,
    textColor: palette.white,
  });
};

const errorNotify = (message) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    backgroundColor: palette.red,
    textColor: palette.white,
  });
};

/**
 * This hook provides access to notification functions.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @returns {{success: *, error: *}}
 */
const useNotify = () => {
  return {
    success: successNotify,
    error: errorNotify,
  };
};

export default useNotify;
