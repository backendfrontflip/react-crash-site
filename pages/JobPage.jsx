import React, { useState, useEffect } from 'react';
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import Spinner from '../src/components/Spinner';
import { FaArrowLeft, FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const JobPage = ({ deleteJob }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const job = useLoaderData();
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const onDeleteClick = (jobId) => {
    const confirm = window.confirm('Are you sure you want to delete this listing?');
    if (!confirm) return;

    deleteJob(jobId);
    toast.success('Job deleted successfully');
    navigate('/jobs');
  };

  useEffect(() => {
    setLoading(!job);
  }, [job]);

  const handleReadMore = async () => {
    setLoadingDetails(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setShowMore(true);
    setLoadingDetails(false);
  };

  if (loading) return <Spinner />;

  const styles = {
    section: { padding: '6rem 1rem' },
    container: { margin: 'auto', maxWidth: '1024px', padding: '1rem' },
    link: { color: '#6366F1', display: 'flex', alignItems: 'center', textDecoration: 'none', marginBottom: '1rem' },
    mainCard: {
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
      marginBottom: '1.5rem',
    },
    jobType: { color: '#6B7280', marginBottom: '1rem' },
    jobTitle: { fontSize: '1.875rem', fontWeight: '700', marginBottom: '1rem' },
    jobLocation: {
      color: '#F97316',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
    },
    button: {
      backgroundColor: '#6366F1',
      color: '#FFFFFF',
      fontWeight: '700',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '1rem',
    },
    asideCard: {
      backgroundColor: '#FFFFFF',
      padding: '1.5rem',
      borderRadius: '0.375rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      marginBottom: '1.5rem',
    },
    sectionTitle: { color: '#3730A3', fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' },
    contactInfo: {
      backgroundColor: '#EEF2FF',
      padding: '0.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
    },
    actionButton: {
      display: 'block',
      width: '100%',
      textAlign: 'center',
      backgroundColor: '#E11D48',
      color: '#FFFFFF',
      fontWeight: '700',
      padding: '0.5rem 1rem',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      marginTop: '1rem',
    },
  };

  return (
    <>
      <section style={styles.section}>
        <div style={styles.container}>
          <Link to="/jobs" style={styles.link}>
            <FaArrowLeft style={{ marginRight: '0.5rem' }} /> Back to Job Listings
          </Link>
        </div>
      </section>

      <section style={{ backgroundColor: '#EEF2FF' }}>
        <div style={styles.container}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
            <main>
              <div style={styles.mainCard}>
                <div style={styles.jobType}>{job.type}</div>
                <h1 style={styles.jobTitle}>{job.title}</h1>
                <div style={styles.jobLocation}>
                  <FaMapMarker style={{ marginRight: '0.5rem' }} />
                  <p>{job.location}</p>
                </div>
              </div>

              <div style={styles.mainCard}>
                <h3 style={styles.sectionTitle}>Job Description</h3>
                <p>{job.description}</p>
                <button onClick={handleReadMore} disabled={loadingDetails} style={styles.button}>
                  {loadingDetails ? 'Loading...' : 'Read More'}
                </button>
                {showMore && <p>{job.additionalDetails}</p>}
                <h3 style={styles.sectionTitle}>Salary</h3>
                <p>{job.salary} / Year</p>
              </div>
            </main>

            <aside>
              <div style={styles.asideCard}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Company Info</h3>
                <h2 style={{ fontSize: '1.5rem' }}>{job.company.name}</h2>
                <p>{job.company.description}</p>
                <hr style={{ margin: '1rem 0' }} />
                <h3>Contact Email:</h3>
                <p style={styles.contactInfo}>{job.company.contactEmail}</p>
                <h3>Contact Phone:</h3>
                <p style={styles.contactInfo}>{job.company.contactPhone}</p>
              </div>

              <div style={styles.asideCard}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  style={{
                    ...styles.button,
                    backgroundColor: '#6366F1',
                    marginBottom: '1rem',
                    display: 'block',
                    textAlign: 'center',
                  }}
                >
                  Edit Job
                </Link>
                <button onClick={() => onDeleteClick(job.id)} style={styles.actionButton}>
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`/api/jobs/${params.id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch job with ID: ${params.id} (Status: ${res.status})`);
  }

  try {
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to parse job data: ${error.message}`);
  }
};

export { JobPage as default, jobLoader };
