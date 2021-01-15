import {useContext} from 'react';
import {TranslationContext} from 'shared/components/translation-provider/TranslationContext';

/**
 * This component allows to connect with the translation tools.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, triko
 * @returns {{_t: _t}}
 */
const useTranslation = () => {
  const dictionary = useContext(TranslationContext);
  return {
    _t: (key, replacements) => {
      if (!dictionary) {
        return key;
      }
      if (!replacements) {
        return dictionary[key] || key;
      } else {
        let translation = dictionary[key] || key;
        let keys = Object.keys(replacements);
        if (keys.length === 0) {
          return key;
        }
        keys.forEach((replacement) => {
          let reg = new RegExp('%' + replacement + '%', 'g');
          translation = translation.replace(reg, replacements[replacement]);
        });
        return translation;
      }
    },
  };
};

export default useTranslation;
