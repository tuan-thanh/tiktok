import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debounncedValue, setDebbouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebbouncedValue(value), delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debounncedValue;
}

export default useDebounce;
