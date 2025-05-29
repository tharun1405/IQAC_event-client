import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../utils/apiService';
import sweetAlert from '../utils/sweetAlert';

// Async thunk for requesting a certificate
export const requestCertificate = createAsyncThunk(
  'certificate/requestCertificate',
  async ( { email, eventType, othereventype, department, eventcordinator, targetAudience, eventVenue, otherVenue, eventobjective }, { rejectWithValue } ) => {
    try {
      const response = await api.post( '/api/certificates/request', { email, eventType, othereventype, department, eventcordinator, targetAudience, eventVenue, otherVenue, eventobjective} );
      sweetAlert( { text: 'Your certificate request has been submitted successfully.' } );
      return response.data;
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
      return rejectWithValue( error.response?.data?.error );
    }
  }
);

// Async thunk for fetching certificate requests
export const fetchRequests = createAsyncThunk(
  'certificate/fetchRequests',
  async ( _, { rejectWithValue } ) => {
    try {
      const response = await api.get( '/api/certificates/requests' );
      return response.data;
    } catch ( error ) {
      return rejectWithValue( error.response?.data?.error );
    }
  }
);

// Async thunk for fetching requests and certificates
export const fetchRequestsAndCertificates = createAsyncThunk(
  'certificate/fetchRequestsAndCertificates',
  async ( _, { rejectWithValue } ) => {
    try {
      const [requestsRes, certificatesRes] = await Promise.all( [
        api.get( '/api/certificates/requests' ),
        api.get( '/api/certificates/all' ),
      ] );
      return { requests: requestsRes.data, certificates: certificatesRes.data };
    } catch ( error ) {
      return rejectWithValue( error.response?.data?.error );
    }
  }
);

// Async thunk for approving and generating a certificate
export const approveCertificate = createAsyncThunk(
  'certificate/approveCertificate',
  async ( certificateDetails, { dispatch, rejectWithValue } ) => {
    const { _id, name, eventType, eventName, email, college, verID } = certificateDetails;
    try {
      const generateCertificate = { name, eventType, eventName, email, college, verID };
      await api.put( `/api/certificates/create/${ _id }`, generateCertificate );
      sweetAlert( { text: 'Certificate generated successfully.' } );
      // Dispatch fetchCertificateData to update both requests and certificates
      await dispatch( fetchRequestsAndCertificates() );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
      return rejectWithValue( error.response?.data?.error );
    }
  }
);

// Async thunk for rejecting a certificate
export const rejectCertificate = createAsyncThunk(
  'certificate/rejectCertificate',
  async ( _id, { dispatch, rejectWithValue } ) => {
    try {
      await api.delete( `/api/certificates/reject/${ _id }` );
      sweetAlert( { text: 'Certificate request rejected.' } );
      // Dispatch fetchRequests to update requests
      await dispatch( fetchRequests() );
    } catch ( error ) {
      sweetAlert( { title: 'Error!', text: error.response.data.error, icon: 'error' } );
      return rejectWithValue( error.response?.data?.error );
    }
  }
);