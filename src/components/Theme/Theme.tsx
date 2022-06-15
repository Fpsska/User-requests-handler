import React, { useState, useEffect } from 'react';

import { useTheme } from '../../hooks/useTheme';

import './theme.scss';

// /. imports

const Theme: React.FC = () => {

    const { theme, setTheme } = useTheme();

    const [isActive, setActiveStatus] = useState<boolean>(theme === 'light' ? false : true);

    useEffect(() => {
        isActive ? setTheme('dark') : setTheme('light');
    }, [isActive]);

    const themeHandler = (): void => {
        setActiveStatus(!isActive);
    };

    return (
        <div className="theme">
            <label className="theme-switch">
                <input className="theme-switch__input" type="checkbox" defaultChecked={isActive} onClick={themeHandler} />
                <div className="slider round">
                    <span className="slider__text">
                        <span className="off">light</span>
                        <span className="on">dark</span>
                    </span>
                </div>
            </label>
        </div>
    );
};

export default Theme;