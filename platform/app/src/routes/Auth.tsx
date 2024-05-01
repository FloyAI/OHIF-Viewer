import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserAuthentication } from '@ohif/ui';

function Auth() {
  const [{ user, enabled }] = useUserAuthentication();
  const [seconds, setSeconds] = React.useState(5);
  const navigate = useNavigate();

  // get params from /auth/:shortUrl
  const { shortUrl } = useParams();

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (seconds <= 1) {
    window.location.href = '/short/' + shortUrl + '?token=' + user.id_token;
  }

  return (
    <>
      {user && enabled ? (
        <div className="absolute flex h-full w-full items-center justify-center text-white">
          <div className="bg-secondary-dark mx-auto space-y-2 rounded-lg py-8 px-8 drop-shadow-md">
            <span className="mb-3 block">
              Hello {user.profile.name} with Email {user.profile.email}
            </span>
            <span className="mb-3 block">Redirecting After {seconds} Seconds...</span>
            <span className="mb-3 block">
              Not you?{' '}
              <span
                className="cursor-pointer text-blue-500 underline"
                onClick={() => {
                  navigate(`/logout?redirect_uri=${encodeURIComponent(window.location.href)}`);
                }}
              >
                Logout
              </span>
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Auth;
