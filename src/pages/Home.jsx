import React, { useState } from 'react';
import PrimaryButton from '../components/commons/PrimaryButton';
import LoadingIndicator from '../components/commons/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { requestCertificate } from '../store/formActions';

const events = [
  "Seminar", "Workshop", "Webinar", "Conference", "FDP", "EDP", "Guest Lecture", "Alumni Talk",
  "Fest", "Visit", "Awareness Program", "Club Activity", "MoU Activity", "Extension Activity",
  "Celebration", "Cultural", "SDP", "Competitions", "Faculty Seminar", "Human Values",
  "Certificate Course", "Orientation", "Research and Development", "IIC", "IPR", "NCC", "NSS",
  "Sports", "Training Program", "Outbound Training", "Placement Drive", "Other"
];

const departments = [
  "Bachelor of Arts in PJE", "Bachelor of science", "Bachelor of Arts - Criminology",
  "Bachelor of Social work", "Bachelor of Business Administration - Aviation",
  "Bachelor of Commerce", "Bachelor of Commerce - CMA", "Bachelor of Computer Application",
  "Bachelor of Business Administration", "Bsc in Fashion and Apparel Design", "Master of Arts in Economics",
  "Master of Arts in English", "Master of Buisness Administration", "Master Of Computer Applications",
  "Master of Science in Electronic Media", "Master of Arts in Journalism and Mass Communication",
  "Master of Social Work", "Master of Commerce", "Master of Science in Physics", "Master of Science in Chemistry",
  "Master of Science in Psychology", "Master of Science in Psychology"
];

const eventVenues = [
  "Main Auditorium", "MBA Semianar Hall", "Mechanical Seminar Hall", "CS/IS Seminar Hall", "AIT Seminar Hall", "AiGS Seminar Hall", "AIGS Open Arena", "Other"
];

const CertificateRequestForm = () => {
  const dispatch = useDispatch();
  const isRequesting = useSelector((state) => state.certificate.isRequesting);

  const [certificateData, setCertificateData] = useState({
    eventType: '',
    othereventype: '',
    email: '',
    department: '',
    eventcordinator: '',
    targetAudience: '',
    eventVenue: '',
    otherVenue: '',
    eventobjective: ''
  });

  const [errors, setErrors] = useState({});
  const [numResourcePersons, setNumResourcePersons] = useState(0);
  const [resourcePersons, setResourcePersons] = useState([]);

  const { email, eventType, othereventype, department, eventcordinator, targetAudience, eventVenue, otherVenue, eventobjective } = certificateData;

  const handleUpdateValue = (key, value) => {
    if (key === 'eventType') {
      setCertificateData(prev => ({ ...prev, eventType: value, othereventype: '' }));
    } else if (key === 'eventVenue') {
      setCertificateData(prev => ({ ...prev, eventVenue: value, otherVenue: '' }));
    } else {
      setCertificateData(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleNumResourcePersonsChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setNumResourcePersons(count);
    setResourcePersons(Array.from({ length: count }, () => ({
      name: '',
      qualification: '',
      occupation: '',
      expertise: '',
      experience: ''
    })));
  };

  const handleResourcePersonChange = (index, key, value) => {
    const updated = [...resourcePersons];
    updated[index][key] = value;
    setResourcePersons(updated);
  };

  const validateForm = () => {
    const errors = {};
    if (!department) errors.department = 'Department is required';
    if (!eventcordinator) errors.eventcordinator = 'Event co-ordinator is required';
    if (!eventType) errors.eventType = 'Event type is required';
    if (eventType === "Other" && !othereventype.trim()) errors.othereventype = 'Event name is required';
    if (!targetAudience.trim()) errors.targetAudience = 'Target audience is required';
    if (!eventVenue) errors.eventVenue = 'Event venue is required';
    if (eventVenue === "Other" && !otherVenue.trim()) errors.eventVenue = 'Other event venue is required';
    if (!eventobjective.trim()) errors.eventobjective = 'Event objective is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) errors.email = 'Invalid email address';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    const finalData = {
      ...certificateData,
      othereventype: eventType === 'Other' ? othereventype : eventType,
      eventVenue: eventVenue === 'Other' ? otherVenue : eventVenue,
      resourcePersons
    };

    dispatch(requestCertificate(finalData));

    setCertificateData({
      eventType: '', othereventype: '', email: '', department: '', eventcordinator: '',
      targetAudience: '', eventVenue: '', otherVenue: '', eventobjective: ''
    });
    setNumResourcePersons(0);
    setResourcePersons([]);
    setErrors({});
  };

  return (
    <div className='flex flex-grow items-center justify-center md:px-8 px-4 md:pt-12 pt-10 md:pb-14 pb-12 bg-cover bg-center bg-no-repeat'>
      <form onSubmit={handleSubmit} className={`lg:w-100 md:w-3/4 w-full ${isRequesting ? 'opacity-35' : ''}`}>
        <fieldset className='rounded-xl p-4 sm:p-8 shadow-lg shadow-purple-600 bg-gradient-to-br from-gray-400 to-slate-200 bg-opacity-50'>
          <label className='sm:text-4xl text-2xl font-semibold text-black'>IQAC Event Registration</label>
          <br /><br />

          {/* Event Type */}
          <label className='block text-gray-700 font-bold'>Event Type</label>
          <select value={eventType} onChange={(e) => handleUpdateValue('eventType', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md'>
            <option value="">Choose Event Type</option>
            {events.map((type, index) => <option key={index} value={type}>{type}</option>)}
          </select>
          {errors.eventType && <p className='text-red-500 text-sm'>{errors.eventType}</p>}

          {eventType === "Other" && (
            <>
              <label className='block text-gray-700 font-bold'>Enter Other Event Type</label>
              <input type='text' value={othereventype} onChange={(e) => handleUpdateValue('othereventype', e.target.value)} placeholder='Enter event name' className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md' />
              {errors.othereventype && <p className='text-red-500 text-sm'>{errors.othereventype}</p>}
            </>
          )}

          {/* Department */}
          <label className='block text-gray-700 font-bold'>Organising Department</label>
          <select value={department} onChange={(e) => handleUpdateValue('department', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md'>
            <option value="">Select Department</option>
            {departments.map((type, index) => <option key={index} value={type}>{type}</option>)}
          </select>
          {errors.department && <p className='text-red-500 text-sm'>{errors.department}</p>}

          {/* Event Co-ordinator */}
          <label className='block text-gray-700 font-bold'>Event Co-ordinator</label>
          <input type='text' value={eventcordinator} onChange={(e) => handleUpdateValue('eventcordinator', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md' />
          {errors.eventcordinator && <p className='text-red-500 text-sm'>{errors.eventcordinator}</p>}

          {/* Target Audience */}
          <label className='block text-gray-700 font-bold'>Target Audience</label>
          <input type='text' value={targetAudience} onChange={(e) => handleUpdateValue('targetAudience', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md' />
          {errors.targetAudience && <p className='text-red-500 text-sm'>{errors.targetAudience}</p>}

          {/* Event Venue */}
          <label className='block text-gray-700 font-bold'>Event Venue</label>
          <select value={eventVenue} onChange={(e) => handleUpdateValue('eventVenue', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md'>
            <option value="">Choose Venue</option>
            {eventVenues.map((venue, index) => <option key={index} value={venue}>{venue}</option>)}
          </select>
          {errors.eventVenue && <p className='text-red-500 text-sm'>{errors.eventVenue}</p>}

          {eventVenue === "Other" && (
            <>
              <label className='block text-gray-700 font-bold'>Enter Other Venue</label>
              <input type='text' value={otherVenue} onChange={(e) => handleUpdateValue('otherVenue', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md' />
              {errors.eventVenue && <p className='text-red-500 text-sm'>{errors.eventVenue}</p>}
            </>
          )}

          {/* Objective */}
          <label className='block text-gray-700 font-bold'>Objective(s) of the Event</label>
          <input type='text' value={eventobjective} onChange={(e) => handleUpdateValue('eventobjective', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md' />
          {errors.eventobjective && <p className='text-red-500 text-sm'>{errors.eventobjective}</p>}

          {/* Resource Persons */}
          <label className='block text-gray-700 font-bold'>Number of Resource Person(s)</label>
          <select value={numResourcePersons} onChange={handleNumResourcePersonsChange} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md'>
            <option value="0">None</option>
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>


          {resourcePersons.map((rp, index) => (
            <fieldset key={index} className='border border-gray-300 p-4 mb-4 rounded'>
              <legend className='text-sm font-semibold text-gray-700'>Resource Person {index + 1}</legend>
              <input type='text' placeholder='Name' value={rp.name} onChange={(e) => handleResourcePersonChange(index, 'name', e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md' />
              <input type='text' placeholder='Qualification' value={rp.qualification} onChange={(e) => handleResourcePersonChange(index, 'qualification', e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md' />
              <input type='text' placeholder='Occupation' value={rp.occupation} onChange={(e) => handleResourcePersonChange(index, 'occupation', e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md' />
              <input type='text' placeholder='Expertise In' value={rp.expertise} onChange={(e) => handleResourcePersonChange(index, 'expertise', e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md' />
              <input type='number' placeholder='Years of Experience' value={rp.experience} onChange={(e) => handleResourcePersonChange(index, 'experience', e.target.value)} className='w-full px-3 py-2 mt-2 border border-gray-300 rounded-md' />
            </fieldset>
          ))}

          {/* Email */}
          <label className='block text-gray-700 font-bold'>Email</label>
          <input type='email' value={email} onChange={(e) => handleUpdateValue('email', e.target.value)} className='w-full px-3 py-2 mb-4 border border-gray-300 rounded-md' />
          {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}

          <PrimaryButton isLoading={isRequesting} title={isRequesting ? 'Sending Request...' : 'Submit'} />
        </fieldset>
      </form>
      {isRequesting && <LoadingIndicator loadingText={'Requesting...'} />}
    </div>
  );
};

export default CertificateRequestForm;
