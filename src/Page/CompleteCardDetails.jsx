import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
const CompleteCardDetails = ({items, dlt }) => {
    return (
        <div >
            <div className="card  bg-base-100 shadow-xl bg-green-50">
                <div className="card-body text-center">
                    <h2 className="card-title text-center">{items.title}</h2>
                    <h2 className="bg-yellow-200 rounded-xl">{items.priority}</h2>
                    <p>{items.description}</p>
                    <p>Deadline: <span className='bg-purple-300 rounded-xl'>{items.date}</span></p>
                    <div className='flex items-center justify-center'>
                        <button  onClick={() => dlt(items._id)} className=' btn' ><FaRegTrashAlt /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompleteCardDetails;