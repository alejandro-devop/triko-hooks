import {useNavigation, StackActions} from '@react-navigation/native';

// const prepareStack = (paths = []) => {
//   const actions = paths.map(path =>
//     NavigationActions.navigate({routeName: path}),
//   );
//   const index = actions.length - 1;
//   return {index, actions};
// };

/**
 * This hook allows access to the navigation and re-directions
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @version 1.0.0
 * @app Client, Triko
 * @returns {{redirectWith: redirectWith, redirectTo: redirectTo}}
 */
const useNavigate = () => {
  const navigation = useNavigation();
  return {
    navigation,
    redirectTo: (path, params) => {
      navigation.dispatch(StackActions.replace(path, params));
      // const {initial} = options;
      // let paths = [path];
      // if (initial) {
      //   paths = [initial, path];
      // }
      // navigation.dispatch(StackActions.reset(prepareStack(paths)));
    },
    redirectWith: (paths = []) => {
      // navigation.dispatch(StackActions.reset(paths));
    },
    goBack: () => {
      navigation.goBack();
    },
    reset: () => {},
  };
};

export default useNavigate;
