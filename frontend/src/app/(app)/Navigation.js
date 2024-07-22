import ApplicationLogo from '@/components/ApplicationLogo'
import Dropdown from '@/components/Dropdown'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import ResponsiveNavLink, {
    ResponsiveNavButton,
} from '@/components/ResponsiveNavLink'
import { DropdownButton } from '@/components/DropdownLink'
import { useAuth } from '@/hooks/auth'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import Button from "@/components/Button";

const Navigation = ({ user }) => {
    const { logout } = useAuth()

    const [open, setOpen] = useState(false)

    return (
        <nav className="bg-white border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link href="/dashboard" className="flex items-center">
                            <ApplicationLogo />
                        </Link>
                    </div>

                    <div className="flex sm:items-center sm:ml-6">
                        <Button type="button" onClick={logout}>
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navigation
