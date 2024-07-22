import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'

export const metadata = {
    title: "ESX Homework",
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="antialiased">
                <AuthCard
                    logo={
                        <Link href="/" className="flex items-center mb-4">
                            <ApplicationLogo/>
                        </Link>
                    }>
                    {children}
                </AuthCard>
            </div>
        </div>
    )
}

export default Layout
