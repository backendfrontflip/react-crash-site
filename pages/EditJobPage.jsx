import React from 'react'
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

const EditJobPage = ({updateJobSubmit}) => {
  const job = useLoaderData();
  const [title, setTitle] = useState(job.title);
    const [type, setType] = useState(job.type);
    const [location, setLocation] = useState(job.location);
    const [description, setDescription] = useState(job.description);
    const [salary, setSalary] = useState(job.salary);
    const [companyName, setCompanyName] = useState(job.company.name);
    const [companyDescription, setCompanyDescription] = useState(job.company.description);
    const [contactEmail, setContactEmail] = useState(job.company.contactEmail);
    const [contactPhone, setContactPhone] = useState(job.company.contactPhone);

    const navigate = useNavigate();
    const {id} = useParams();

    const submitForm = (e) => {
      e.preventDefault();
    
      const updatedJob = {
        id,
        title,
        type,
        location,
        description,
        salary,
        company: {
          name: companyName,
          description: companyDescription,
          contactEmail,
          contactPhone,
        },
      };
    
      updateJobSubmit(updatedJob);
    
      toast.success('Job updated successfully');
    
      navigate(`/jobs/${id}`);
    };
    

    
  
    const inlineStyles = {
      section: { backgroundColor: '#EEF2FF', padding: '6rem 1rem' },
      container: { margin: 'auto', maxWidth: '768px' },
      formWrapper: {
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        borderRadius: '0.375rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #E8EBF3',
        margin: '1rem',
      },
      heading: { textAlign: 'center', fontSize: '1.875rem', fontWeight: '600', marginBottom: '1.5rem' },
      label: { display: 'block', color: '#4B5563', fontWeight: '700', marginBottom: '0.5rem' },
      input: {
        border: '1px solid #D1D5DB',
        borderRadius: '0.375rem',
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
      },
      textarea: {
        border: '1px solid #D1D5DB',
        borderRadius: '0.375rem',
        width: '100%',
        padding: '0.5rem',
        marginBottom: '1rem',
        resize: 'none',
      },
      button: {
        backgroundColor: '#6366F1',
        color: '#FFFFFF',
        fontWeight: '700',
        padding: '0.5rem 1rem',
        borderRadius: '9999px',
        width: '100%',
        textAlign: 'center',
        cursor: 'pointer',
        border: 'none',
      },
    };
  return (
    <section style={inlineStyles.section}>
      <div style={inlineStyles.container}>
        <div style={inlineStyles.formWrapper}>
          <form onSubmit={submitForm}>
            <h2 style={inlineStyles.heading}>Update Job</h2>

            <div>
              <label htmlFor="type" style={inlineStyles.label}>
                Job Type
              </label>
              <select
                id="type"
                name="type"
                style={inlineStyles.input}
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="title" style={inlineStyles.label}>
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                style={inlineStyles.input}
                placeholder="e.g., Software Developer"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="description" style={inlineStyles.label}>
                Description
              </label>
              <textarea
                id="description"
                name="description"
                style={inlineStyles.textarea}
                placeholder="Add any job duties, expectations, requirements, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <div>
              <label htmlFor="salary" style={inlineStyles.label}>
                Salary
              </label>
              <select
                id="salary"
                name="salary"
                style={inlineStyles.input}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              >
                <option value="Under $50k">Under $50K</option>
                <option value="$50k - 60k">$50K - $60K</option>
                <option value="$60k - 70k">$60K - $70K</option>
                <option value="$70k - 80k">$70K - $80K</option>
                <option value="Over $200k">Over $200K</option>
              </select>
            </div>

            <div>
              <label htmlFor="location" style={inlineStyles.label}>
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                style={inlineStyles.input}
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Company Info</h3>

            <div>
              <label htmlFor="company" style={inlineStyles.label}>
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                style={inlineStyles.input}
                placeholder="Enter company name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="company_description" style={inlineStyles.label}>
                Company Description
              </label>
              <textarea
                id="company_description"
                name="company_description"
                style={inlineStyles.textarea}
                placeholder="Enter company description"
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                rows="4"
              ></textarea>
            </div>

            <div>
              <label htmlFor="contact_email" style={inlineStyles.label}>
                Contact Email
              </label>
              <input
                type="email"
                id="contact_email"
                name="contact_email"
                style={inlineStyles.input}
                placeholder="Enter contact email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="contact_phone" style={inlineStyles.label}>
                Contact Phone
              </label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                style={inlineStyles.input}
                placeholder="Enter contact phone"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
              />
            </div>

            <button type="submit" style={inlineStyles.button}>
              Update Job
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default EditJobPage