import SideBar from '@/components/globals/SideBar'
import { ProSidebarProvider } from 'react-pro-sidebar'

export default function AdminLayout({ children }) {
  return (
    <>
      <ProSidebarProvider>
        <div className="flex h-full w-full">
          {/* SIDEBAR HERE */}
          <SideBar />
          <div className="flex h-full w-full flex-col">
            {/* NAV BAR */}
            <main>{children}</main>
          </div>
        </div>
      </ProSidebarProvider>
    </>
  )
}
