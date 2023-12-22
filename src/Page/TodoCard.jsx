import axios from 'axios';
import React from 'react';
import { useDrag } from 'react-dnd';
import Swal from 'sweetalert2';
import { FaRegTrashAlt } from "react-icons/fa";
const TodoCard = ({ items, dlt,updlt }) => {
    console.log(items)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'task',
        item: items, // Use an object here
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(dropResult);
            if (item && dropResult) {
                alert('You dropped the item!');
                // Access dropResult directly
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId(),
        }),
    }));
    const handleongoing =(id)=>{
        const taskinfo = {
            title: items.title,
            priority: items.priority,
            description: items.description,
            date: items.date,
            email: items.email,
        }
        console.log(taskinfo)
        axios.post('http://localhost:3000/Ongoing', taskinfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
                        if (res.data.deletedCount > 0) {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${id} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          updlt();
                        }
                      });
                }
            })
    }
    const handlecomplete =(id)=>{
        const taskinfo = {
            title: items.title,
            priority: items.priority,
            description: items.description,
            date: items.date,
            email: items.email,
        }
        console.log(taskinfo)
        axios.post('http://localhost:3000/complete', taskinfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
                        if (res.data.deletedCount > 0) {
                          Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `${id} has been deleted`,
                            showConfirmButton: false,
                            timer: 1500,
                          });
                          updlt();
                        }
                      });
                }
            })
    }
    return (

        <div ref={drag} >
            <div className="card  bg-base-100 shadow-xl bg-yellow-100">
                <div className="card-body text-center">
                    <h2 className="card-title text-center">{items.title}</h2>
                    <h2 className="bg-yellow-200 ">{items.priority}</h2>
                    <p>{items.description}</p>
                    <p>Deadline: <span className='bg-purple-300 rounded-xl'>{items.date}</span></p>
                    <div className='flex items-center justify-center'>
                        <button onClick={()=>handleongoing(items._id)} className='btn btn-success' >Onging</button>
                        <button onClick={()=>handlecomplete(items._id)} className='btn btn-secondary' >Complete</button>
                        <button  onClick={() => dlt(items._id)} className=' btn' ><FaRegTrashAlt /></button>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default TodoCard;