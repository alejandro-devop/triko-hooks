import {useEffect, useState} from 'react';

const useMock = (mock = [], delay = 2000) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setTimeout(() => {
      setData(mock);
      setLoading(false);
    }, delay);
  }, []);
  return {
    loading,
    data: {
      response: data,
    },
  };
};

export default useMock;
