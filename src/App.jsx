import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from '../pages/HomePage';
import JobsPage from '../pages/JobsPage';
import NotFoundPage from '../pages/NotFoundPage';
import JobPage, { jobLoader } from '../pages/JobPage';
import AddJobPage from '../pages/AddJobPage';
import EditJobPage from '../pages/EditJobPage';

const App = () => {
  // Add a new job entry
  const addJob = async (newJob) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newJob),
      });

      if (!res.ok) {
        console.error('Failed to add job');
      } else {
        console.log('Job added successfully');
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  // Delete a job entry
  const deleteJob = async (id) => {
    try {
      const res = await fetch(`/api/jobs/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        console.error(`Failed to delete job with ID: ${id}`);
      } else {
        console.log(`Job with ID: ${id} deleted successfully`);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  //Now update Job
  const updateJob = async (job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      });

      if (!res.ok) {
        console.error('Failed to add job');
      } else {
        console.log('Job added successfully');
      }
    } catch (error) {
      console.error('Error adding job:', error);
    }
  }

  // Configure routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />

        <Route
          path="/jobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
