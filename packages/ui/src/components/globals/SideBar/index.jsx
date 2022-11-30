import { useState } from 'react'
import {
  Sidebar as ProSidebar,
  Menu,
  menuClasses,
  MenuItem,
  sidebarClasses,
  useProSidebar,
} from 'react-pro-sidebar'
import Link from 'next/link'
import MenuIcon from './menu-icon'

const Item = ({ title, to, icon, selected, setSelected }) => {

  return (
    <MenuItem
      active={selected === title}
      style={{ color: selected === title ? `#6870fa` : `` }}
      onClick={() => setSelected(title)}
      icon={icon}
      routerLink={<Link href={to} />}
    >
      <h5 className="text-base">{title}</h5>
    </MenuItem>
  )
}

const Sidebar = () => {
  const { collapseSidebar } = useProSidebar()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')

  return (
    <div>
      <ProSidebar className="h-full">
        <Menu iconShape="square">
          {/* LOGO AND MENU */}
          <MenuItem
            onClick={() => [setIsCollapsed(!isCollapsed), collapseSidebar()]}
            icon={!isCollapsed ? undefined : <MenuIcon />}
            style={{
              margin: '10px 0 20px 0',
              color: 'grey',
            }}
          >
            {!isCollapsed && (
              <div className="justify-between ml-4 flex items-center">
                <h3 className="text-grey-100">ADMIN</h3>
                <MenuIcon />
              </div>
            )}
          </MenuItem>

          {/* MENU ITEMS */}
          <div>
            <Item
              title="Dashboard"
              to="/"
              icon={<MenuIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </Menu>
      </ProSidebar>
    </div>
  )
}

export default Sidebar
