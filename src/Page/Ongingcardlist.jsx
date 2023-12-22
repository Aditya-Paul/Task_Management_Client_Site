import axios from 'axios';
import React from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
const Ongingcardlist = ({items, dlt, uprefatch }) => {
    const handlecomplete =(id)=>{
        const taskinfo = {
            title: items.title,
            priority: items.priority,
            description: items.description,
            date: items.date,
            email: items.email,
        }
        console.log(taskinfo)
        axios.post('http://localhost:3000/Complete', taskinfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    axios.delete(`http://localhost:3000/Ongoing/${id}`).then((res) => {
                        if (res.data.deletedCount > 0) {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${id} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          uprefatch();
                        }
                      });
                }
            })
    }
    return (
        <div >
            <div className="card  bg-base-100 shadow-xl bg-green-50">
                <div className="card-body text-center">
                    <h2 className="card-title text-center">{items.title}</h2>
                    <h2 className="bg-yellow-200 rounded-xl">{items.priority}</h2>
                    <p>{items.description}</p>
                    <p>Deadline: <span className='bg-purple-300 rounded-xl'>{items.date}</span></p>
                    <div className='flex items-center justify-center'>
                        
                        <button onClick={()=>handlecomplete(items._id)} className='btn btn-secondary' >Complete</button>
                        <button  onClick={() => dlt(items._id)} className=' btn' ><FaRegTrashAlt /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ongingcardlist;