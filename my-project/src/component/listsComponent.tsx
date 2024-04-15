import React, { useState, useEffect } from 'react';
import { createClient, PostgrestError } from '@supabase/supabase-js';

// Định nghĩa kiểu dữ liệu cho mỗi mục trong danh sách công việc
interface Task {
    id: string;
    created_at: string;
    label: string;
    status: string;
    // Các thuộc tính khác của công việc nếu có
}

const supabaseUrl = 'https://bcapnmymeawxfoqlufla.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYXBubXltZWF3eGZvcWx1ZmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2NzkxMTYsImV4cCI6MjAyODI1NTExNn0.OWdEhipLhAdeUEJG-EZ4vQ0a9wmex2Kw-Syqi-vXCEE';
const supabase = createClient(supabaseUrl, supabaseKey);

const ToDoList: React.FC = () => {
    const [data, setData] = useState<Task[]>([]);
    const [task, setTask] = useState<Task>({
        id: '',
        created_at: '',
        label: '',
        status: '',
    });
    const [tasku, setTasku] = useState<Task>({
        id: '',
        created_at: '',
        label: '',
        status: '',
    });
    // const [dataChanged, setDataChanged] = useState<boolean>(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        const createData = async () => {
            try {
                const { data: newData, error } = await supabase
                    .from('Tasks')
                    .insert([
                        { label: task.label, status: task.status },
                    ])
                fetchData()
                if (error) {
                    throw error;
                } else {
                    setData(prevData => [...prevData, ...(newData ?? [])]);
                    setTask({ id: '', created_at: '', label: '', status: '' });
                }
            } catch (error) {
                console.error('Error create data:', (error as PostgrestError).message);
            }
        };
        createData()
    };
    const deleteData = async (id: string) => {
        try {
            const { error } = await supabase
                .from('Tasks')
                .delete()
                .eq('id', id)
            fetchData()
            if (error) {
                throw error;
            } else {
                setData(data)
            }
        } catch (error) {
            console.error('Error create data:', (error as PostgrestError).message);
        }
    };
    const updateTask = async (taskId: string) => {
        try {
            const { data, error } = await supabase
                .from('Tasks')
                .update({ label: tasku.label, status: tasku.status })
                .eq('id', taskId)
                .select()
            fetchData()
            if (error) {
                throw error;
            } else {
                setData(data)
            }
        } catch (error) {
            console.error('Error create data:', (error as PostgrestError).message);
        }
    };
    console.log(data);
    function displayTask(taskId: string) {
        data.map((task) => {
            if (task.id == taskId) {
                setTasku({ label: task.label, status: task.status, created_at: task.created_at, id: task.id })
            }
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTask(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        });
    };
    const handleChangeU = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTasku(prevFormData => {
            return {
                ...prevFormData,
                [e.target.name]: e.target.value
            }
        });
    };
    console.log(tasku);

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('Tasks') // Sử dụng kiểu dữ liệu Task ở đây
                .select('*');
            if (error) {
                throw error;
            } else {
                setData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', (error as PostgrestError).message);
        }
    };
    return (
        <div className='mainTodo'>
            <h1 className='text-5xl mb-10'>Task List</h1>
            <div className='formCreate'>
                <form onSubmit={handleSubmit}>
                    <input
                        className='me-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400'
                        name="label"
                        type="text"
                        placeholder="Task label..."
                        value={task.label}
                        onChange={handleChange}
                    />
                    <input
                        className='ms-3 me-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400'
                        name="status"
                        type="text"
                        placeholder="Task status..."
                        value={task.status}
                        onChange={handleChange}
                    />
                    <button className='bg-blue-400 py-1 px-3 rounded-md' type="submit">Add</button>
                </form>
            </div>
            <div className='formUpdate'>
                <form onSubmit={() => updateTask(tasku.id)}>
                    <input
                    className='me-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400'
                        name="label"
                        type="text"
                        placeholder="Task label..."
                        defaultValue={tasku.label}
                        onChange={handleChangeU}
                    />
                    <input
                    className='ms-3 me-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400'
                        name="status"
                        type="text"
                        placeholder="Task status..."
                        defaultValue={tasku.status}
                        onChange={handleChangeU}
                    />
                    <button className='bg-blue-400 py-1 px-3 rounded-md' type="submit">Update</button>
                </form>
            </div>
            <table className='border-collapse border border-slate-400 m-auto mt-5 h-52 w-96'>
                <thead>
                    <tr className=''>
                        <th className='border border-slate-300'>Label</th>
                        <th className='border border-slate-300'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr  className='border border-slate-300' key={item.id}>
                            <td>{item.label}</td>
                            <td>{item.status}</td>
                            <td><button className='bg-red-400 py-1 px-3 rounded-md' onClick={() => { deleteData(item.id) }}>delete</button></td>
                            <td><button className='bg-blue-400 py-1 px-3 rounded-md' onClick={() => { displayTask(item.id) }}>edit</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ToDoList;
