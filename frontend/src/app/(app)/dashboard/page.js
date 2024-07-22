'use client'

import Header from '@/app/(app)/Header'
import { useState, useEffect } from 'react'
import { useUser } from '@/context/UserContext'
import axios from "@/lib/axios"
import Button from '@/components/Button'
import Input from '@/components/Input'
import Label from '@/components/Label'
import InputError from '@/components/InputError'
import { Modal } from 'flowbite-react'

const Dashboard = () => {
    const currentUser = useUser()

    const [users, setUsers] = useState([])
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState([])
    const [status, setStatus] = useState(null)

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users')
            setUsers(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors([])

        if (formData.id) {
            try {
                await axios.put(`/api/users/${formData.id}`, formData)
                setStatus('User updated successfully!')
                fetchUsers()
                resetForm()
                setOpenModal(false)
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        } else {
            try {
                await axios.post('/api/users', formData)
                setStatus('User created successfully!')
                fetchUsers()
                resetForm()
                setOpenModal(false)
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const handleAdd = () => {
        setOpenModal(true)
        resetForm()
    }

    const handleEdit = (user) => {
        setOpenModal(true)
        setFormData({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '',
        })
    }

    function onCloseModal() {
        resetForm()
        setOpenModal(false)
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user?')) return

        try {
            await axios.delete(`/api/users/${id}`)
            setStatus('User deleted successfully!')
            fetchUsers()
        } catch (error) {
            console.error(error)
        }
    }

    const resetForm = () => {
        setFormData({
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        })
        setErrors([])
    }

    return (
        <>
            <Header title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 border-b border-gray-200">
                            {currentUser ? (
                                <>
                                    <h1 className="mb-4">
                                        Bine ati
                                        venit, <strong>{currentUser.first_name} {currentUser.last_name}</strong>
                                    </h1>

                                    {status && <div className="mb-4 text-green-600">{status}</div>}

                                    <div className="flex py-4 gap-4 flex-col">
                                        <div className="flex items-center">
                                            <h5 className="font-bold">Users</h5>
                                        </div>
                                        <div className="flex">
                                            <Button type="button"
                                                    onClick={() => handleAdd()}>
                                                Add User
                                            </Button>
                                        </div>
                                    </div>
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3">ID</th>
                                            <th className="px-4 py-3">First Name</th>
                                            <th className="px-4 py-3">Last Name</th>
                                            <th className="px-4 py-3">Email</th>
                                            <th className="px-4 py-3">Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id} className="border-b border-gray-700">
                                                <td className="px-4 py-3">{user.id}</td>
                                                <td className="px-4 py-3">{user.first_name}</td>
                                                <td className="px-4 py-3">{user.last_name}</td>
                                                <td className="px-4 py-3">{user.email}</td>
                                                <td className="px-4 py-3 flex gap-4">
                                                    <Button type="button"
                                                            data-modal-target="userModal"
                                                            data-modal-toggle="userModal"
                                                            onClick={() => handleEdit(user)}>
                                                        Edit
                                                    </Button>

                                                    {currentUser.id !== user.id ? (
                                                        <Button type="button" className="bg-red-900 text-white"
                                                                onClick={() => handleDelete(user.id)}>Delete</Button>
                                                    ) : ''}
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>

                                    <Modal show={openModal} size="xl" onClose={onCloseModal} popup>
                                        <Modal.Header className="p-6">
                                            {formData.id ? 'Edit User' : 'Add User'}
                                        </Modal.Header>
                                        <Modal.Body>
                                            <form onSubmit={handleSubmit}>
                                                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                                    <div>
                                                        <Label htmlFor="first_name">First Name</Label>
                                                        <Input
                                                            id="first_name"
                                                            type="text"
                                                            name="first_name"
                                                            value={formData.first_name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <InputError messages={errors.first_name} className="mt-2"/>
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="last_name">Last Name</Label>
                                                        <Input
                                                            id="last_name"
                                                            type="text"
                                                            name="last_name"
                                                            value={formData.last_name}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <InputError messages={errors.last_name} className="mt-2"/>
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="email">Email</Label>
                                                        <Input
                                                            id="email"
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <InputError messages={errors.email} className="mt-2"/>
                                                    </div>

                                                    <div>
                                                        <Label htmlFor="password">Password</Label>
                                                        <Input
                                                            id="password"
                                                            type="password"
                                                            name="password"
                                                            value={formData.password}
                                                            onChange={handleChange}
                                                            required={!formData.id}
                                                        />
                                                        <InputError messages={errors.password} className="mt-2"/>
                                                    </div>
                                                </div>

                                                <Button type="submit">{formData.id ? 'Update' : 'Create'}</Button>
                                            </form>
                                        </Modal.Body>
                                    </Modal>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard
