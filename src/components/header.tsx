import React from 'react';
import {
  Button
} from '@chakra-ui/react'
//import {
//  Menu,
//  MenuButton,
//  MenuList,
//  MenuItem,
//  MenuItemOption,
//  MenuGroup,
//  MenuOptionGroup,
//  MenuIcon,
//  MenuCommand,
//  MenuDivider,
//  HamburgerIcon,
//  AddIcon,
//  ExternalLinkIcon,
//  RepeatIcon,
//  EditIcon
//} from "@chakra-ui/react"
import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react"

import {
  AddIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon
} from '@chakra-ui/icons'

import '../Header.scss';

function Header() {
  return (
    <header className="Header">
      {/*
      <div class="Header">
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
          />
          <MenuList>
            <MenuItem icon={<AddIcon />} command="⌘T">
              New Tab
            </MenuItem>
            <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
              New Window
            </MenuItem>
            <MenuItem icon={<RepeatIcon />} command="⌘⇧N">
              Open Closed Tab
            </MenuItem>
            <MenuItem icon={<EditIcon />} command="⌘O">
              Open File...
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      */}
    </header>
  )
}

export default Header;
