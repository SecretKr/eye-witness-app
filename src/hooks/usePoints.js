import { useState, useCallback } from 'react';

const STORAGE_KEY = 'eyewitness_points';

const usePoints = () => {
    const [points, setPoints] = useState(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseInt(stored, 10) : 0;
    });

    const addPoints = useCallback((amount) => {
        setPoints((prev) => {
            const newTotal = prev + amount;
            localStorage.setItem(STORAGE_KEY, String(newTotal));
            return newTotal;
        });
    }, []);

    return { points, addPoints };
};

export default usePoints;
