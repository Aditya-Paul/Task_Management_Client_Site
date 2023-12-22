import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import CompleteCardDetails from './CompleteCardDetails';

const CompleteCard = ({dfrsh}) => {
    const { user } = useContext(AuthContext)

    const { data: completetasks = [], refetch } = useQuery({
        queryKey: ['completetasks'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/Complete`);
            return res.data;
        },
    });
    const CompltTask = completetasks.filter(item => item.email === `${user.email}`)
    console.log(CompltTask)
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/Complete/${id}`).then((res) => {
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

        <div>
            {CompltTask?.map((pet) => (
                <CompleteCardDetails key={pet.id} items={pet} dlt={handleDelete} >

                </CompleteCardDetails>
            ))}

        </div>
    );
};

export default CompleteCard;