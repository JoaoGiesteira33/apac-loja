'use client';

import { Link } from 'react-router-dom';

import logoApac from '../../assets/LOGO_negrito.png';

import {
    CustomFlowbiteTheme,
    Flowbite,
    Navbar as FlowbiteNavbar,
} from 'flowbite-react';

const customTheme: CustomFlowbiteTheme = {
    navbar: {
        root: {
            base: 'bg-white px-2 py-4 md:py-20 dark:border-gray-700 dark:bg-gray-800 sm:px-4 font-poppins',
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
    return (
        <Flowbite theme={{ theme: customTheme }}>
            <FlowbiteNavbar
                className="border-black border-2 mb-10"
                fluid
                rounded>
                <FlowbiteNavbar.Brand as={Link} href="/">
                    <img
                        src={logoApac}
                        className="mr-3 h-4 md:h-28 sm:h-9"
                        alt="Logo"
                    />
                </FlowbiteNavbar.Brand>
                <FlowbiteNavbar.Toggle />
                <FlowbiteNavbar.Collapse>
                    <FlowbiteNavbar.Link href="/">
                        a galeria
                    </FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link as={Link} href="/">
                        artistas
                    </FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link href="/">contacto</FlowbiteNavbar.Link>
                    <FlowbiteNavbar.Link href="/">login</FlowbiteNavbar.Link>
                </FlowbiteNavbar.Collapse>
            </FlowbiteNavbar>
        </Flowbite>
    );
}
