import LoginLinks from '@/app/LoginLinks'
import Image from "next/image";
import ApplicationLogo from "@/components/ApplicationLogo";
import Link from "next/link";

const Home = () => {
    return (
        <>
            <div
                className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <LoginLinks/>

                <div className="bg-gray-100 flex flex-col items-center p-4">
                    <Link href="/" className="flex items-center mb-4">
                        <ApplicationLogo />
                    </Link>

                    <div className="bg-black text-green-500 font-mono p-4 border border-gray-700 rounded-lg shadow-lg">
                        <pre>
        <code>
          {`[INFO] Users Table:
       - Fields: ID, Nume, Prenume, Email, Parola

[INFO] Migration and Seed:
       - Create a migration for the users table
       - Populate the users table with test data using a seed

[INFO] API CRUD:
       - Create a CRUD API for the users table
       - Implement soft delete for the delete operation

[INFO] Validation:
       - All fields are mandatory
       - Check if the email exists and validate its format
       - Use a symmetric header key predefined between the Laravel API and the frontend

[INFO] Frontend:
       - Registration Form:
         - Fields: Nume, Prenume, Email, Parola
         - Frontend validation before server submission

       - After Registration:
         - Redirect to login form
         - Fields: Email, Parola

       - After Login:
         - Display a welcome message: "Bine ati venit, Nume Prenume"
         - Provide a logout option`}
        </code>
      </pre>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
