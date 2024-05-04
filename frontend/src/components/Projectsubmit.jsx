import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

function App() {
  const [link, setLink] = useState('');
  const [comments, setComments] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [daysSinceMount, setDaysSinceMount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDaysSinceMount((prevDays) => prevDays + 1);
    }, 86400000); 

    return () => clearInterval(interval); 
  }, []);

 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    //  API call to send data
    try {
      const response = await axios.post('http://localhost:5000/api/student/', {
        link,
        comments,
      });
      console.log(response.data);  
      // Reset error state upon successful submission
      setError('');
    } catch (error) {
      // Handle error from API call
      console.error('Error submitting data:', error);
      setError('Error submitting data. Please try again.');
    } finally {
      setLoading(false);
    }
  
    setLink('');
    setComments('');
  };

  return (
    <div className="custom-bg">
      <div className="container mt-5 ">
        <h1 className="mb-4">Project Submission</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="link" className="form-label">
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
            <label htmlFor="comments" className="form-label">
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
            disabled={loading || daysSinceMount < 80} // Disable if loading or daysSinceMount < 80
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;

