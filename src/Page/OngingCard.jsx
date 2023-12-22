import React, { useContext } from 'react';
import { AuthContext } from '../Provider/Authprovider';
import { useQuery } from '@tanstack/react-query';
import Ongingcardlist from './Ongingcardlist';
import axios from 'axios';
import Swal from 'sweetalert2';

const OngingCard = ({drefresh}) => {
    const { user } = useContext(AuthContext)

    const { data: ontasks = [], refetch } = useQuery({
        queryKey: ['ontasks'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:3000/Ongoing`);
            return res.data;
        },
    });
    const ongoTask = ontasks.filter(item => item.email === `${user.email}`)
    console.log(ongoTask)
    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/Ongoing/${id}`).then((res) => {
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
            {ongoTask?.map((pet) => (
                <Ongingcardlist key={pet.id} items={pet} dlt={handleDelete} uprefatch={refetch} >

                </Ongingcardlist>
            ))}

        </div>
    );
};

export default OngingCard;