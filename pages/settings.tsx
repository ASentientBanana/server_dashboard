import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: NextPageContext) => {
    console.log("settings rend");
    const session = await getSession(context);
    console.log(session);

    if (session === null) return {
        redirect: {
            permanent: false,
            destination: "/no-user"
        },
    }

    return {
        props: {
            users: []
        }
    }
}
const Settings = () => {


    return (
        <div>
            Some data
        </div>
    );
}

export default Settings;
