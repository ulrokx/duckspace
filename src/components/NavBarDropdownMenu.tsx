import { Button } from '@chakra-ui/button';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/layout';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import NextLink from 'next/link'
import React from 'react'
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
import {CgProfile, CgBookmark} from 'react-icons/cg'
import { GiExitDoor } from 'react-icons/gi';


export const NavBarDropdownMenu: React.FC= ({}) => {
    const [{data, fetching}] = useMeQuery({
        pause: isServer()
    })
    const [{fetching: lFetching}, logout] = useLogoutMutation()
    if(fetching) {
        return null
    } else if(!data?.me) {
        return (
            <>
                <NextLink href="/login">
                    <Link mr={4}>login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link>register</Link>
                </NextLink>
            </>
        )
    } else {
        return (<Menu>
            <MenuButton as={Button} leftIcon={<HamburgerIcon />}>
                {data.me.username}
            </MenuButton>
            <MenuList>
                <MenuItem icon={<CgProfile />}>
                    My Profile
                </MenuItem>
                <MenuItem icon={<CgBookmark />}>
                    Saved Posts
                </MenuItem>
                <MenuItem icon={<GiExitDoor />} onClick={() => logout()} isLoading={fetching}>
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>);
    }
}