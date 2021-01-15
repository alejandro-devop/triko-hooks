import {useSession} from 'hooks/index';
import locales from '../../../locales';

const useLocales = () => {
  const {
    stack: {locale},
  } = useSession();
  return locales[locale];
};

export default useLocales;
