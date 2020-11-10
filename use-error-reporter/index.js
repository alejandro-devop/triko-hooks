const useErrorReporter = (config = {}) => {
  const {componentPath, path} = config;
  return (errorInfo = {}) => {
    console.log('error: ', errorInfo);
  };
};

export default useErrorReporter;
