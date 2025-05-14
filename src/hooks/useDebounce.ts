import {useEffect, useState} from "react";

function useDebounce<Type>(defaultValue : Type, delay : number) {
  const [debounceValue, setDebounceValue] = useState<Type>(defaultValue);


  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(defaultValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [defaultValue, delay]);
  return debounceValue;
}

export default useDebounce;
