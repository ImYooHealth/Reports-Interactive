import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


const ExampleLogin = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if(username == '' && password == '') {
        return
    }
    // Replace this with your actual login logic
    setIsLoading(true);
    // Simulate a login request delay
    setTimeout(() => {
      setIsLoading(false);
      console.log(`Logged in with username: ${username}`);
      history.push('/Disclaimer')
    }, 1250);
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default ExampleLogin;
