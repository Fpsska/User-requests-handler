import React from 'react';

import { BsGithub } from 'react-icons/bs';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer__wrapper">
                <div className="footer__social">
                    <BsGithub size={'34px'} />
                    <a target="_blank" href="https://github.com/Fpsska">Fpsska</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
