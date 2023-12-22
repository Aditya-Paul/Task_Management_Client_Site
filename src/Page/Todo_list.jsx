import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoCard from './TodoCard';
import { AuthContext } from '../Provider/Authprovider';
import OngingCard from './OngingCard';
import Comment from 'postcss/lib/comment';
import CompleteCard from './CompleteCard';

const Todo_list = () => {
  const { user } = useContext(AuthContext)
  const [ongoingitem, setOngoing] = useState([])
  const [refresh, setrefresh] = useState([])
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get(`https://task-mangement-server-site.vercel.app/tasks`);
      //const res = await axios.get(`https://task-mangement-server-site.vercel.app//tasks/user/${user.email}`);
      return res.data;
    },
  });
  const usertask = tasks.filter(item => item.email === `${user.email}`)
  console.log(usertask)

  const handleDelete = (id) => {
    axios.delete(`https://task-mangement-server-site.vercel.app/tasks/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `${id} has been deleted`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  return (
    
      <div className="grid grid-cols-1 md:grid-cols-3 ">
        <div className="text-center border-r-2 border-pink-500 ">
          <h2 className="text-2xl font-bold p-2 bg-yellow-200 rounded-xl">To do</h2>
          {usertask?.map((pet) => (
            <TodoCard key={pet.id} id={pet.id} name={pet.title} items={pet} dlt={handleDelete} ongoingitems={ongoingitem} updlt={refetch}
              draggable
            />
          ))}
        </div>
        <div className="text-center border-r-2 border-pink-500" >
          <h2 className="text-2xl font-bold p-2 bg-green-200 rounded-xl">Ongoing</h2>
          <OngingCard drefresh={refresh}></OngingCard>
        </div>

        <div className="text-center border-r-2 border-pink-500 " >
          <h2 className="text-2xl font-bold p-2 bg-purple-200 rounded-xl">Completed</h2>
          <CompleteCard></CompleteCard>
        </div>
      </div>
  );
};

export default Todo_list;
