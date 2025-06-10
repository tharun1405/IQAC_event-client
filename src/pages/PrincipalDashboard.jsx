import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../components/commons/LoadingIndicator';
import PrimaryButton from '../components/commons/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { approveCertificate, fetchRequesteventadmin, rejectCertificate } from '../store/formActions';

const IQACDashboard = () => {
  const dispatch = useDispatch();
  const { requests, certificates, isLoading } = useSelector((state) => state.certificate);

  useEffect(() => {
    dispatch(fetchRequesteventadmin());
  }, []);

  const handleApprove = async (certificateDetails) => {
    dispatch(approveCertificate(certificateDetails));
  };

  const handleReject = async (_id) => {
    dispatch(rejectCertificate(_id));
  };

  return (
    <div
      className='flex flex-col flex-grow justify-center bg-cover bg-center bg-no-repeat'
      style={{ backgroundImage: "url('/bg1.jpg')" }}
    >
      <div className={`flex flex-col items-center justify-center gap-y-16 md:px-8 px-4 md:pt-12 pt-10 md:pb-14 pb-12 ${isLoading ? 'opacity-35' : ''}`}>

        {/* Pending Requests Table */}
        <div className='bg-white rounded-lg shadow-lg shadow-gray-500 sm:p-8 p-4 lg:w-2/3 w-full overflow-x-auto'>
          <h2 className='sm:text-3xl text-xl font-semibold text-gray-800 mb-6'>IQAC Pending Approvals</h2>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Coordinator</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Organising Department</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Type</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Venue</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Target Audience</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Email</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Actions</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {requests.length > 0 ? requests.map((request) => (
                <tr key={request._id}>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{request.eventcordinator}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{request.department}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{request.othereventype || request.eventType}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{request.eventVenue}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{request.targetAudience}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{request.email}</td>
                  <td className='border-2 border-gray-400 text-nowrap px-2 sm:px-4 py-2'>
                    <PrimaryButton
                      title='Approve'
                      isLoading={isLoading}
                      onClick={() => handleApprove(request)}
                      className={`${isLoading ? 'opacity-40 cursor-not-allowed' : ''} bg-green-500 hover:bg-green-600 text-white text-nowrap md:mr-4 mr-2 active:opacity-70 py-1 px-3 font-semibold rounded-md`}
                    />
                    <PrimaryButton
                      title='Reject'
                      isLoading={isLoading}
                      onClick={() => handleReject(request._id)}
                      className={`${isLoading ? 'opacity-40 cursor-not-allowed' : ''} bg-red-500 hover:bg-red-600 text-white text-nowrap active:opacity-70 py-1 px-3 font-semibold rounded-md`}
                    />
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className='border-2 border-gray-400 px-4 py-2'>No Pending requests.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Issued Certificates Table */}
        <div className='bg-white rounded-lg shadow-lg shadow-gray-500 sm:p-8 p-4 lg:w-2/3 w-full overflow-x-auto'>
          <h2 className='sm:text-3xl text-xl font-semibold text-gray-800 mb-6'>Issued Event</h2>
          <table className='w-full table-auto'>
            <thead>
              <tr className='bg-gray-200'>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Co-ordinator</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Type</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Objective</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event Venue</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Email</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>Event ID</th>
                <th className='border-2 border-gray-400 px-2 sm:px-4 py-2'>View Form</th>
              </tr>
            </thead>
            <tbody className='text-center'>
              {certificates.length > 0 ? certificates.map((certificate) => (
                <tr key={certificate._id}>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{certificate.name}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{certificate.eventType}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{certificate.eventName}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{certificate.college}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{certificate.email}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>{certificate.verID}</td>
                  <td className='border-2 border-gray-400 px-2 sm:px-4 py-2'>
                    <Link
                      to={certificate.certificateLink}
                      target='_self'
                      rel='noopener noreferrer'
                      className='bg-blue-500 hover:bg-blue-600 text-white text-nowrap active:opacity-70 py-1 px-3 font-semibold rounded-md'
                    >
                      View Event Form
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className='border-2 border-gray-400 px-4 py-2'>No Event Form.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isLoading && <LoadingIndicator loadingText={'Loading...'} />}
    </div>
  );
};

export default IQACDashboard;
