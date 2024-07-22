'use client'

import { useAuth } from '@/hooks/auth'
import Navigation from '@/app/(app)/Navigation'
import Loading from '@/app/(app)/Loading'
import { UserProvider } from '@/context/UserContext';

const AppLayout = ({ children }) => {
    const { user } = useAuth({ middleware: 'auth' })

    if (!user) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <Navigation user={user} />

            <main>
                <UserProvider user={user}>
                    {children}
                </UserProvider>
            </main>
        </div>
    )
}

export default AppLayout
