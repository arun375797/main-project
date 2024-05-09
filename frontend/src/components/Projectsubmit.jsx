import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../axiosinterceptor';

const Projectsubmit = () => {
    const [link, setLink] = useState('');
    const [comments, setComments] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [daysUntilEnd, setDaysUntilEnd] = useState(0);
    const [user, setUser] = useState(null);
    const [submitted, setSubmitted] = useState(false); // Track if project has been submitted

    const userEmail = sessionStorage.getItem('currentUser');

    useEffect(() => {
        // Fetch user data
        const getUser = async () => {
            try {
                const response = await axiosInstance.get(`http://localhost:5000/api/student/user?email=${userEmail}`);
                setUser(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('Error fetching user data');
            }
        };

        getUser();
    }, [userEmail]);

    useEffect(() => {
        const fetchProject = async () => {
            if (user && user._id) {
                try {
                    const response = await axiosInstance.get(`http://localhost:5000/api/studentProjects/id/${user._id}`);
                    if (response.data.length > 0) {
                        const endDate = new Date(response.data[0].endDate);
                        const today = new Date();
                        const differenceInDays = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
                        setDaysUntilEnd(differenceInDays);
                        console.log(differenceInDays)
                        setError(null);
                        // Check if project has been submitted
                        if (response.data[0].submitted) {
                            setSubmitted(true);
                        }
                    } else {
                        setError('No project found');
                    }
                } catch (error) {
                    console.error('Error fetching project:', error);
                    setError('Project not selected');
                }
            }
        };

        fetchProject();
    }, [user]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const response = await axiosInstance.post('http://localhost:5000/api/student/projectsub/', {
                link,
                comments,
            });
            console.log(response.data);
            setError('');
            setSubmitted(true); // Mark project as submitted
            alert("you have sucessfully submitted the submission")
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('Error submitting data. Please try again.');
        } finally {
            setLoading(false);
        }

        setLink('');
        setComments('');
    };

    return (
        <div style={{ 
            background: "linear-gradient(130deg, #231a6f, #0f054c)",
            minHeight: '100vh', 
            padding: '70px' 
        }}>
            <div className="custom-bg">
                <div className="container mt-5 ">
                    <h1 className="mb-4" style={{color:'white'}}>Project Submission</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="link" className="form-label" style={{color:'white'}}>
                                Link:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="link"
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comments" className="form-label" style={{color:'white'}}>
                                Comments:
                            </label>
                            <textarea
                                className="form-control"
                                id="comments"
                                value={comments}
                                onChange={(e) => setComments(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading || daysUntilEnd > 83 || submitted} // Disable if loading, daysUntilEnd > 83, or already submitted
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Projectsubmit;
