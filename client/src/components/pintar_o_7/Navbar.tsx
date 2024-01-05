'use client';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logoApac from '../../assets/LOGO_negrito.png';

import {
    CustomFlowbiteTheme,
    Flowbite,
    Navbar as FlowbiteNavbar,
} from 'flowbite-react';
import { log } from 'console';

const customTheme: CustomFlowbiteTheme = {
    navbar: {
        root: {
            base: 'bg-white px-2 py-4 md:py-20 dark:border-gray-700 dark:bg-gray-800 sm:px-20 font-poppins',
        },
        link: {
            base: 'block py-2 pr-4 pl-3 md:p-0 text-xl',
            active: {
                on: 'bg-cyan-700 text-white dark:text-white md:bg-transparent md:text-gray-900 ',
                off: 'border-b border-gray-100 text-gray-500 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white',
            },
        },
        collapse: {
            list: 'mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-16 lg:space-x-32 xl:space-x-44 2xl:space-x-60 md:text-sm md:font-medium',
        },
    },
};

export default function Navbar() {
    const location = useLocation();
    const [loggedIn, setLoggedIn] = useState<string | null>(localStorage.getItem('loggedIn'));

    return (
        <Flowbite theme={{ theme: customTheme }}>
            <FlowbiteNavbar className="" fluid>
                <FlowbiteNavbar.Brand href="/">
                    <img
                        src={logoApac}
                        className="mr-3 h-9 md:h-28 sm:h-9"
                        alt="Logo"
                    />
                </FlowbiteNavbar.Brand>
                <FlowbiteNavbar.Toggle />
                <FlowbiteNavbar.Collapse>
                    <FlowbiteNavbar.Link
                        href="/gallery"
                        className={
                            location.pathname == '/gallery'
                                ? 'font-bold text-black'
                                : ''
                        }>
                        a galeria
                    </FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link
                        href="/artists"
                        className={
                            location.pathname == '/artists'
                                ? 'font-bold text-black'
                                : ''
                        }>
                        artistas
                    </FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link
                        href="/contact"
                        className={
                            location.pathname == '/contact'
                                ? 'font-bold text-black'
                                : ''
                        }>
                        contacto
                    </FlowbiteNavbar.Link>
                    { "true" !== "true" ?
                        <FlowbiteNavbar.Link
                        href="/login"
                        className={
                            location.pathname == '/login'
                                ? 'font-bold text-black'
                                : ''
                        }>
                        login
                    </FlowbiteNavbar.Link> :
                     <FlowbiteNavbar.Link
                        href="/profile"
                        className={
                            location.pathname == '/profile'
                                ? 'font-bold text-black'
                                : ''
                        }>
                        perfil
                    </FlowbiteNavbar.Link>
                    }
                </FlowbiteNavbar.Collapse>
            </FlowbiteNavbar>
        </Flowbite>
    );
}
