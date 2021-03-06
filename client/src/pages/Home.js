import React from 'react';
// importing the useQuery Hook from Apollo Client. This will allow us to make requests to the GraphQL server
import { useQuery } from '@apollo/client';
import {QUERY_THOUGHTS, QUERY_ME_BASIC} from '../utils/queries';
import ThoughtList from '../components/ThoughtList';
// check the logged-in status of a user
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';
import ThoughtForm from '../components/ThoughtForm';

const Home = () => {
   // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  
  // This is called optional chaining, and it's new to JavaScript—so new that only browsers seem to support it
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  const loggedIn = Auth.loggedIn();
  
  return (
    <main>
      <div className='flex-row justify-space-between'>
      {loggedIn && (
      <div className="col-12 mb-3">
        <ThoughtForm />
      </div>
    )}
      <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>{/* PRINT THOUGHT LIST */}
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
      {loggedIn && userData ? (
        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={userData.me.username}
            friendCount={userData.me.friendCount}
            friends={userData.me.friends}
          />
        </div>
      ) : null}
    </main>
  );
};

export default Home;
