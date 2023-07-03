import React, { useState, forwardRef } from 'react';

const NewInterviewForm = forwardRef(({ styles, attributes }, ref) => {
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

    return (
        <div ref={ref} style={styles} {...attributes} className="fixed inset-0 flex items-center justify-center z-10">
            <form onSubmit={handleSubmit} className="bg-brandGreen p-5 rounded-lg grid gap-4 grid-cols-2 auto-rows-min max-w-sm w-full">
                <label className="col-span-2 brand-font-bold text-sm">
                    Job Title:
                    <input
                        type='text'
                        placeholder='Job Title'
                        value={jobTitle}
                        onChange={event => setJobTitle(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 border rounded-lg"
                    />
                </label>
                <label className="brand-font-bold text-sm">
                    Job Level:
                    <select
                        value={jobLevel}
                        onChange={event => setJobLevel(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 border rounded-lg"
                    >
                        <option value=''>Select Level</option>
                        <option value='Junior'>Junior</option>
                        <option value='Mid-Level'>Mid-Level</option>
                        <option value='Senior'>Senior</option>
                        <option value='Manager'>Manager</option>
                    </select>
                </label>
                <label className="brand-font-bold text-sm">
                    Job Function:
                    <select
                        value={jobFunction}
                        onChange={event => setJobFunction(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 border rounded-lg"
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
                <label className="col-span-2 brand-font-bold text-sm">
                    Tools/Technologies:
                    <input
                        type='text'
                        placeholder='Keywords Only'
                        value={jobTechnology}
                        onChange={event => setJobTechnology(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 border rounded-lg"
                    />
                </label>
                <button type='submit' className="rounded-full bg-brandPurple text-brandGray mt-4 px-6 py-3 col-span-2 self-center brand-font-bold text-lg">
                    Start Interview
                </button>
            </form>
        </div>
    );
})

export default NewInterviewForm;