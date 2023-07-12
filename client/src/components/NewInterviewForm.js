import React, { useState, forwardRef } from 'react';
import { FiX } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useMutation } from '@apollo/client';
import { CREATE_CHAT, CREATE_MESSAGE } from '../utils/mutations';

const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
};

const NewInterviewForm = forwardRef(({ styles, attributes, showForm, onClose }, ref) => {
    const [jobTitle, setJobTitle] = useState('');
    const [jobLevel, setJobLevel] = useState('');
    const [jobFunction, setJobFunction] = useState('');
    const [jobTechnology, setJobTechnology] = useState('');
    const [error, setError] = useState('');

    const [createChat, { loading: creatingChat }] = useMutation(CREATE_CHAT);

    const handleSubmit = async event => {
        event.preventDefault();

        console.log("Form submitted");

        if (!jobTitle || !jobLevel || !jobFunction || !jobTechnology) {
            alert('All fields are required.');
        } else {
            console.log({ jobTitle, jobLevel, jobFunction, jobTechnology });
            
            try {
                const { data } = await createChat({
                    variables: {
                        jobTitle,
                        jobLevel,
                        jobFunction,
                        jobTechnology
                    }
                });

                console.log("New chat data:", data);

                console.log(data.createChat);
                setError(''); // Clear error state upon successful chat creation
            } catch (err) {
                console.error('Error creating chat:', err);
                console.log("Error details:", err);
                setError('Error creating chat.'); // Update error state if an error occurred

            }
        }
    };

    if (!showForm) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-10">
            <motion.form
                initial="hidden"
                animate="visible"
                variants={formVariants}
                transition={{ duration: 0.5 }}
                onSubmit={handleSubmit}
                style={{ position: 'relative' }}
                className="container mx-auto bg-gray-600 p-7 rounded-lg grid gap-4 grid-cols-2 auto-rows-min max-w-md"
            >
                <label className="col-span-2 brand-font-bold text-sm text-white">
                    Job Title:
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type='text'
                        placeholder='Job Title'
                        value={jobTitle}
                        onChange={event => setJobTitle(event.target.value)}
                        className="job-title mt-2 block w-full px-4 py-2 bg-brandGreen rounded-lg"
                    />
                </label>

                <label className="brand-font-bold text-sm text-white">
                    Job Level:
                    <motion.select
                        whileFocus={{ scale: 1.05 }}
                        value={jobLevel}
                        onChange={event => setJobLevel(event.target.value)}
                        className="mt-2 block w-full px-4 py-2 rounded-lg bg-brandGreen"
                    >
                        <option value=''>Select Level</option>
                        <option value='Junior'>Junior</option>
                        <option value='Mid-Level'>Mid-Level</option>
                        <option value='Senior'>Senior</option>
                        <option value='Manager'>Manager</option>
                    </motion.select>
                </label>

                <label className="brand-font-bold text-sm text-white">
                    Job Function:
                    <motion.select
                        whileFocus={{ scale: 1.05 }}
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
                    </motion.select>
                </label>

                <label className="col-span-2 brand-font-bold text-sm text-white">
                    Tools/Technologies:
                    <motion.input
                        whileFocus={{ scale: 1.05 }}
                        type='text'
                        placeholder='Keywords Only'
                        value={jobTechnology}
                        onChange={event => setJobTechnology(event.target.value)}
                        className="tools-input mt-2 block w-full px-4 py-2 bg-brandGreen rounded-lg"
                    />
                </label>
                
                <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.9 }} 
                    type='submit' 
                    className="rounded-full bg-gradient mt-4 px-6 py-3 col-span-2 self-center brand-font-bold text-lg text-white"
                >
                    Start Interview
                </motion.button>

                <motion.button 
                    whileHover={{ 
                        scale: 1.1, 
                        rotate: 360
                    }} 
                    whileTap={{ scale: 0.9 }} 
                    type='button' 
                    style={{ position: 'absolute', top: '-38px', left: '0px' }} 
                    onClick={onClose}
                >
                    <FiX size={35} color='#8C52FF' />
                </motion.button>

                {error && <p className="error-message">{error}</p>} {/* Display error message when it exists */}

            </motion.form>
        </div>
    );
})

export default NewInterviewForm;