import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export const getServerSideProps = async (context: NextPageContext) => {
    const session = await getSession(context);
    // const users = await DBAdapter.query('SELECT * FROM User', 'get')
    if (!session) return {
        redirect: {
            permanent: true,
            destination: "/no-user"
        },
    }
}
const Settings = () => {


    return (
        <div>

        </div>
    );
}

export default Settings;
