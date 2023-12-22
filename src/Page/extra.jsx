import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TodoCard from './TodoCard';
import { AuthContext } from '../Provider/Authprovider';

const Todo_list = () => {
  const { user } = useContext(AuthContext)
  console.log(user)

  const { data: tasks = [], refetch } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/tasks`);
      //const res = await axios.get(`http://localhost:3000//tasks/user/${user.email}`);
      return res.data;
    },
  });

  const usertask = tasks.filter(item => item.email === `${user.email}`)
  console.log(usertask)

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/tasks/${id}`).then((res) => {
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

//   const [{ isOver }, dropRefOngoing] = useDrop({
//     accept: 'pet',
//     drop: (item) => setBasket((prevBasket) =>
//       !prevBasket.some((p) => p.id === item.id) ? [...prevBasket, item] : prevBasket
//     ),
//     collect: (monitor) => ({
//         isOver: monitor.isOver()
//     })
//   });

//   const [, dropRefCompleted] = useDrop({
//     accept: 'pet',
//     drop: (item) => setBasket((prevBasket) =>
//       !prevBasket.some((p) => p.id === item.id) ? [...prevBasket, item] : prevBasket
//     ),
//     collect: (monitor) => ({
//         isOver: monitor.isOver()
//     })
//   });
// const [{ canDrop, isOver }, drop] = useDrop(() => ({
//   accept: "text",
//   drop: () => ({ status: columnStatus }),

//   collect: (monitor) => ({
//       isOver: monitor.isOver(),
//       canDrop: monitor.canDrop(),
//   }),
// }))
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="text-center">
          <h2 className="text-2xl font-bold">To do</h2>
          {usertask?.map((pet) => (
            <TodoCard
              key={pet.id}
              id={pet.id}
              name={pet.title}
              item={pet}
              dlt={handleDelete}
              draggable
            />
          ))}
        </div>
        <div className="text-center border-r-2 border-pink-500" >
          <h2 className="text-2xl font-bold">Ongoing</h2>
          {/* {basket.map((pet) => (
            <TodoCard key={pet.id} id={pet.id} name={pet.title} item={pet} dlt={handleDelete} />
          ))}
          {isOver && <div>Drop Here!</div>} */}
        </div>
        <div className="text-center border-r-2 border-pink-500" >
          <h2 className="text-2xl font-bold">Completed</h2>
          {/* {basket.map((pet) => (
            <TodoCard key={pet.id} id={pet.id} name={pet.title} item={pet} dlt={handleDelete} />
          ))}
          {isOver && <div>Drop Here!</div>} */}
        </div>
      </div>
    </DndProvider>
  );
};

export default Todo_list;
