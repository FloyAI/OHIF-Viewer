import React from 'react';
import { useParams } from 'react-router-dom';

function Auth({ servicesManager }) {
  const { userAuthenticationService } = servicesManager.services;
  const user = userAuthenticationService.getUser();
  const [seconds, setSeconds] = React.useState(5);

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
    <div className="absolute flex h-full w-full items-center justify-center text-white">
      <div className="bg-secondary-dark mx-auto space-y-2 rounded-lg py-8 px-8 drop-shadow-md">
        <span className="mb-3 block">
          Hello {user.profile.name} with Email {user.profile.email}
        </span>
        <span className="mb-3 block">Redirecting After {seconds} Seconds...</span>
      </div>
    </div>
  );
}

export default Auth;
