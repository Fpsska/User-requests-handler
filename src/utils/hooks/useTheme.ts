import { useLayoutEffect, useState } from 'react';

// /. imports

const isOChasDarkTheme = window?.matchMedia(
    '(prefers-color-scheme: dark)'
).matches;
const defaultTheme = isOChasDarkTheme ? 'dark' : 'light';

export function useTheme(): any {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('app-theme') || defaultTheme
    ); // if localStorage of key 'app-theme' is empty, set defaultTheme

    useLayoutEffect(() => {
        // triggered before document is loaded
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('app-theme', theme);
    }, [theme]);

    return { theme, setTheme };
}
