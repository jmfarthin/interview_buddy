import React, { useState } from 'react';

const NewInterviewForm = () => {
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
        <form onSubmit={handleSubmit}>
            <label>
                Job Title:
                <input
                    type='text'
                    placeholder='Job Title'
                    value={jobTitle}
                    onChange={event => setJobTitle(event.target.value)}
                />
            </label>
            <label>
                Job Level:
                <select
                    value={jobLevel}
                    onChange={event => setJobLevel(event.target.value)}
                >
                    <option value=''>Select Job Level</option>
                    <option value='Junior'>Junior</option>
                    <option value='Mid-Level'>Mid-Level</option>
                    <option value='Senior'>Senior</option>
                    <option value='Manager'>Manager</option>
                </select>
            </label>
            <label>
                Job Function:
                <select
                    value={jobFunction}
                    onChange={event => setJobFunction(event.target.value)}
                >
                    <option value=''>Select Job Function</option>
                    <option value='Web Development'>Web Development</option>
                    <option value='Machine Learning'>Machine Learning</option>
                    <option value='DevOps'>DevOps</option>
                    <option value='Cloud Engineering'>Cloud Engineering</option>
                    <option value='Data Analysis'>Data Analysis</option>
                    <option value='Graphic Design'>Graphic Design</option>
                    <option value='Digital Marketing'>Digital Marketing</option>
                </select>
            </label>
            <label>
                Tools/Technologies:
                <input
                    type='text'
                    placeholder='Keywords Only'
                    value={jobTechnology}
                    onChange={event => setJobTitle(event.target.value)}
                />
            </label>
            <button type='submit'>Start Interview</button>
        </form>
    );
}

export default NewInterviewForm;