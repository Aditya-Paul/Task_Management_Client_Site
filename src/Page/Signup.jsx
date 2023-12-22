import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form'; //1
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Authprovider';
import axios from 'axios';
import Swal from 'sweetalert2';
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const imgae_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const Signup = () => {
    const { signup, update } = useContext(AuthContext)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        console.log(data, data.image[0])
        const imageFile = { image: data.image[0] }
        const res = await axios.post(imgae_hosting_api, imageFile, {
            headers: { 'content-Type': 'multipart/form-data' }
        })
        console.log("with image url", res.data)

        //signup
        if (res.data.success) {
            const img = res.data.data.display_url;
            signup(data.email, data.password)
                .then(res => {

                    update(data.name, data.image = img)
                        .then(() => {

                            const userinfo = {
                                name: data.name,
                                email: data.email,
                                photo: img,
                                occupation: data.occupation,
                            }
                            console.log(userinfo)
                            // user post to the database


                            axios.post('http://localhost:3000/users', userinfo)
                                .then(res => {
                                    console.log(res.data)
                                    if (res.data.insertedId) {
                                        Swal.fire("Good job!", "Registered Successfully & Posted to the database, Welcome", "success");
                                        reset()
                                        navigate('/')

                                    }
                                })
                                

                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
                .catch(error => {
                    Swal.fire("Oops!", "Something wrong! try again", "error");
                })
        }

    }


    return (
        <>
            <div className="hero min-h-screen bg-pink-100 pt-20">
                <div className="hero-content flex-row lg:flex-row-reverse">
                    <div className="card shadow-2xl bg-base-100">

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>

                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" required />

                                {errors.name && <span className='text-red-500'>Name is required</span>}

                            </div>
                            {/* Image */}
                            <div className='form-control w-full my-6'>
                                <p>Choose your photo</p>
                                <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                            </div>
                            {/* Category */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Occupation</span>
                                </label>

                                <input type="text" {...register("occupation", { required: true })} placeholder="Occupation" className="input input-bordered" required />

                                {errors.occupation && <span className='text-red-500'>Occupation is required</span>}

                            </div>
                            {/* Email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>

                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" required />

                                {errors.email && <span className='text-red-500'>Email is required</span>}

                            </div>
                            {/* Password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>

                                <input type="password" {...register("password", {
                                    required: true,
                                })} placeholder="password" className="input input-bordered" required />

                                {errors.password?.type === "required" && (
                                    <p className='text-red-500'>Password is required</p>
                                )}

                            </div>
                            {/* Register Button */}
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div className='text-center'>
                            <p className="text-base">Already have an account? <span><Link className='text-pink-600' to='/login'>Login</Link></span></p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;