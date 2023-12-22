import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { AuthContext } from '../Provider/Authprovider';

const CreateTask = () => {
    const { user } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {

        const taskinfo = {
            title: data.title,
            priority: data.priority,
            description: data.description,
            date: data.date,
            email: user.email,
        }
        console.log(taskinfo)
        axios.post('https://task-mangement-server-site.vercel.app/tasks', taskinfo)
            .then(res => {
                console.log(res.data)
                if (res.data.insertedId) {
                    Swal.fire("Good job!", " Posted to the database, Welcome", "success");
                    reset()

                }
            })

        // const menures = await axiospublic.post('/meals', mealinfo)
        // //console.log(menures)
        // if (menures.data.insertedId) {
        //     Swal.fire("Good job!", "Add data Successfully & Posted to the database", "success");
        // }
    }
    return (
        <div>

            <div>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Task Title</span>
                        </label>

                        <input type="text" {...register("title", { required: true })} placeholder="Meal Title" className="input input-bordered" required />

                        {errors.title && <span className='text-red-500'>title is required</span>}

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Description
                            </span>
                        </label>

                        <input type="text" {...register("description", { required: true })} placeholder="Description" className="input input-bordered" required />

                        {errors.description && <span className='text-red-500'>Meal image is required</span>}

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Priority</span>
                        </label>

                        <select name="func" {...register("priority", { required: true })} placeholder="Priority" className="input input-bordered">
                            <option value="Low">Low</option>
                            <option value="Moderate">Moderate</option>
                            <option value="High">High</option>
                        </select>

                        {errors.priority && <span className='text-red-500'>You Have to slect the category</span>}

                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Deadline
                            </span>
                        </label>

                        <input type="date" {...register("date", { required: true })} placeholder="Date" className="input input-bordered" required />

                        {errors.date && <span className='text-red-500'>Date is required</span>}

                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Add Task</button>
                    </div>

                </form>

            </div>
        </div>
    );
};

export default CreateTask;