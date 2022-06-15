import React, { useState, useEffect } from 'react';

import { BsGithub } from 'react-icons/bs';

import { useTheme } from '../../hooks/useTheme';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {

    const { theme } = useTheme();

    return (
        <footer className={theme === 'light' ? 'footer light' : 'footer dark'}>
            <div className="footer__wrapper">
                <div className="footer__social">
                    <BsGithub size={'34px'} color={theme === 'light' ? '#000' : '#fff'} />
                    <a className="footer__link" target="_blank" href="https://github.com/Fpsska">Fpsska</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
