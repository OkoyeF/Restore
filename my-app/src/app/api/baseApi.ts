import { fetchBaseQuery, BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { startLoading, stopLoading } from '../layout/uiSlice';
import { toast } from 'react-toastify';
import { router } from '../route/Routes';

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5086/api',
});

type ErrorResponse = string | { title: string } | { errors: Record<string, string[]> };

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object = {}
) => {
  api.dispatch(startLoading());
  await sleep();
  
  const result = await customBaseQuery(args, api, extraOptions);
  
  api.dispatch(stopLoading());
  
  if (result.error) {
    console.log(result.error);
    
    const originalStatus = result.error.status === 'PARSING_ERROR' && result.error.originalStatus
      ? result.error.originalStatus
      : result.error.status;

    const responseData = result.error.data as ErrorResponse;
    
    switch (originalStatus) {
      case 400:
        if (typeof responseData === 'string') {
          toast.error(responseData);
        } else if (responseData && typeof responseData === 'object' && 'errors' in responseData) {
          const errorMessages = Object.values(responseData.errors).flat().join(', ');
          toast.error(errorMessages);
        } else if (responseData && typeof responseData === 'object' && 'title' in responseData) {
          toast.error(responseData.title);
        }
        break;
      case 401:
        if (responseData && typeof responseData === 'object' && 'title' in responseData) {
          toast.error(responseData.title);
        } else {
          toast.error('Unauthorized');
        }
        break;
      case 404:
        // Navigate to not-found route regardless of response data structure
        router.navigate('/not-found');
        break;
      case 500:
        if (responseData && typeof responseData === 'object' && 'title' in responseData) {
          router.navigate('/server-error', { state: { error: responseData.title } });
        } else {
          router.navigate('/server-error', { state: { error: 'Server error' } });
        }
        break;
      default:
        toast.error('An unexpected error occurred');
        break;
    }
  }

  return result;
};