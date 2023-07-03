import React, { useState, forwardRef } from 'react';
import { FiX } from 'react-icons/fi';

const NewInterviewForm = forwardRef(({ styles, attributes, showForm, onClose }, ref) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobLevel, setJobLevel] = useState('');
    const [jobFunction, setJobFunction] = useState('');
    const [jobTechnology, setJobTechnology] = useState('');

    const handleSubmit = event => {
        event.preventDefault();

        if (!jobTitle || !jobLevel || !jobFunction || !jobTechnology) {
            alert('All fields are required.');
        } else {
            console.log({ jobTitle, jobLevel, jobFunction, jobTechnology });
            // API call to send these values to be added later.
        }
    };

    if (!showForm) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <form onSubmit={handleSubmit} style={{ position: 'relative' }} className="container mx-auto bg-gray-600 p-5 rounded-lg grid gap-4 grid-cols-2 auto-rows-min max-w-md">
                <label className="col-span-2 brand-font-bold text-sm text-white">
                    Job Title:
                    <input
                        type='text'
                        placeholder='Job Title'
                        value={jobTitle}
                        onChange={event => setJobTitle(event.target.value)}
                        className="job-title mt-2 block w-full px-4 py-2 bg-brandGreen rounded-lg"
                    />
                </label>
                <label className="brand-font-bold text-sm text-white">
                    Job Level:
                    <select
                        value={jobLevel}
                        onChange={event => setJobLevel(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 rounded-lg bg-brandGreen"
                    >
                        <option value=''>Select Level</option>
                        <option value='Junior'>Junior</option>
                        <option value='Mid-Level'>Mid-Level</option>
                        <option value='Senior'>Senior</option>
                        <option value='Manager'>Manager</option>
                    </select>
                </label>
                <label className="brand-font-bold text-sm text-white">
                    Job Function:
                    <select
                        value={jobFunction}
                        onChange={event => setJobFunction(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 rounded-lg bg-brandGreen"
                    >
                        <option value=''>Select Function</option>
                        <option value='Web Development'>Web Development</option>
                        <option value='Machine Learning'>Machine Learning</option>
                        <option value='DevOps'>DevOps</option>
                        <option value='Cloud Engineering'>Cloud Engineering</option>
                        <option value='Data Analysis'>Data Analysis</option>
                        <option value='Graphic Design'>Graphic Design</option>
                        <option value='Digital Marketing'>Digital Marketing</option>
                    </select>
                </label>
                <label className="col-span-2 brand-font-bold text-sm text-white">
                    Tools/Technologies:
                    <input
                        type='text'
                        placeholder='Keywords Only'
                        value={jobTechnology}
                        onChange={event => setJobTechnology(event.target.value)}
                        className="tools-input mt-2 block w-full px-4 py-2 bg-brandGreen rounded-lg"
                    />
                </label>
                <button type='submit' className="rounded-full bg-gradient mt-4 px-6 py-3 col-span-2 self-center brand-font-bold text-lg text-white">
                    Start Interview
                </button>
                <button type='button' style={{ position: 'absolute', top: '-38px', left: '0px' }} onClick={onClose}> 
                    <FiX size={35} color='#8C52FF' />
                </button>
            </form>
        </div>
    );
})

export default NewInterviewForm;