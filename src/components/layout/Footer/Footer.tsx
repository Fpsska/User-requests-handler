import React from 'react';

import { BsGithub } from 'react-icons/bs';

import './footer.scss';

// /. imports

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <section className="footer__wrapper">
                <address className="footer__social">
                    <BsGithub
                        size={'34px'}
                        color={'#000'}
                    />
                    <a
                        className="footer__link"
                        target="_blank"
                        href="https://github.com/Fpsska"
                        rel="noreferrer"
                    >
                        Fpsska
                    </a>
                </address>
            </section>
        </footer>
    );
};

export default Footer;
