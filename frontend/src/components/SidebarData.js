
import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as CgIcons from 'react-icons/cg';
import * as GoIcons from 'react-icons/go';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <CgIcons.CgProfile/>,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: '/doctors',
        icon: <AiIcons.AiOutlineDashboard/>,
        cName: 'nav-text'
    },
    {
        title: 'Newappointment',
        path: '/doctors',
        icon: <GoIcons.GoDiffAdded/>,
        cName: 'nav-text'
    },
    {
        title: 'Appointments',
        path: '/appointments',
        icon: <CgIcons.CgCalendarDates />,
        cName: 'nav-text'
    },
    {
        title: 'History',
        path: '/history',
        icon: <AiIcons.AiOutlineHistory/>,
        cName: 'nav-text'
    },
        {
        title: 'Logout',
        path: '/logout',
        icon: <CgIcons.CgLogOut />,
        cName: 'nav-text'
    }
];