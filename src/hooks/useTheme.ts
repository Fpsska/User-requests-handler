import { useLayoutEffect, useState } from 'react';

// /. imports

export function useTheme() {
    const [theme, setTheme] = useState<string>('light');

    useLayoutEffect(() => { // triggered before document is loaded
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return { theme, setTheme };
}