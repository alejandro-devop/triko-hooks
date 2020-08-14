import {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {ThemeContext} from 'shared/components/theme-provider';

const initializeStyles = ({styles: themeClasses, ...context}, styles) => {
  let processedStyles = {};
  if (styles instanceof Function) {
    processedStyles = StyleSheet.create(styles({...context}) || {});
  } else if (styles instanceof Object) {
    processedStyles = StyleSheet.create(styles);
  } else {
    processedStyles = {};
  }
  return [processedStyles, themeClasses];
};

/**
 * This hook allows to access the global styles from the theme.
 * @author Alejandro <alejandro.devop@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @param {*} styles
 */
const useStyles = styles => {
  const context = useContext(ThemeContext);
  return initializeStyles(context, styles);
};

export default useStyles;
