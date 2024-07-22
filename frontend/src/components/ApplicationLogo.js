import Image from "next/image";

const ApplicationLogo = props => (
    <>
        <Image src={'/logo.svg'} width={140} height={64} alt={"logo"} className={"mr-4"}/>
        <h1 className="text-3xl font-bold">Homework</h1>
    </>
)

export default ApplicationLogo
