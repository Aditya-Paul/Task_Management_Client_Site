import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Authprovider';

const UserProfile = () => {
    const { user } = useContext(AuthContext)
    console.log(user)
   
    return (
        <div>

            <section className="bg-grey-lightest py-8">
                <div className="w-full max-w-7xl mx-auto mt-8">
                    <div className="flex flex-wrap -mx-6 -my-6">
                        <div className="w-full lg:w-1/2 px-6 py-6 text-center">
                            <div className="bg-white rounded shadow-lg overflow-hidden p-8">
                                <div className="rounded-full h-64 w-64 flex items-center justify-center bg-grey-light mx-auto mb-8">
                                    <img src={user?.photoURL} alt="" />
                                </div>

                                <div className="font-bold text-xl mb-2">{user?.displayName}</div>
                                <p className="text-grey-darker text-base mb-4">{user?.email}</p>
                                <p className="text-grey-darker text-base mb-4">{user?.userprofile}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserProfile;