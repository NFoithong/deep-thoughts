import React from 'react';
// importing the useQuery Hook from Apollo Client. This will allow us to make requests to the GraphQL server
import { useQuery } from '@apollo/client';
import {QUERY_THOUGHTS} from '../utils/queries';

const Home = () => {
   // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  
  // This is called optional chaining, and it's new to JavaScript—so new that only browsers seem to support it
  const thoughts = data?.thoughts || [];
  console.log(thoughts);
  
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>{/* PRINT THOUGHT LIST */}</div>
      </div>
    </main>
  );
};

export default Home;
