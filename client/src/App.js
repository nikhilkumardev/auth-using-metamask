import { useEffect, useState } from 'react';
import Web3 from 'web3';
import './App.css';
import digitalAsset from './assets/bitcoin-cryptocurrency-city.gif';

let web3;

const App = () => {

  const [isLogedIn, setIsLogedIn] = useState(false);

  useEffect(() => {

    async function initWeb3() {
      if (!web3) {
        try {
          // Request account access if required
          await window.ethereum.enable();
          web3 = new Web3(window.ethereum);
        } catch (error) {
          alert('hi')
          return;
        }
      }
    }

    initWeb3();

    if (localStorage.getItem('token')) {
      setIsLogedIn(true)
    }

  }, []);

  async function handleSignMessage(message, address) {
    const signature = await web3.eth.personal.sign(message, address);
    return signature
  }
  const handleLogout = async () => {
    localStorage.removeItem('token');
    setIsLogedIn(false)
  }

  async function handleLogin() {
    // Check if MetaMask is installed
    if (!window.ethereum) {
      return;
    }
    const publicAddress = await web3.eth.getCoinbase();
    if (!publicAddress) {
      return;
    }

    try {
      const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      const response = await fetch(`http://localhost:5000/api/v1/nonce/${publicAddress}`, requestOptions);

      if (response.status !== 200) {
        const { message } = await response.json();
        throw Error(message);
      }

      const { data } = await response.json();
      const signature = await handleSignMessage(data.nonce, publicAddress);
      let result = await fetch(`http://localhost:5000/api/v1/auth/login`, {
        body: JSON.stringify({ publicAddress, signature }),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      });

      const { status } = result;

      if (status !== 200) {
        throw Error({ message: 'MetaMask login failed' });
      } else {
        result = await result.json();
        setIsLogedIn(true);
        localStorage.setItem('token', result?.data?.token)
      }
      
    } catch (err) {
      console.log('console err', err);
    }
  }

  return (
    <><div className='flex flex-row justify-around p-3 bg-slate-500 shadow-md'>
      <div className='flex items-center'>
        <img src='https://cdn.pixabay.com/photo/2015/08/27/11/20/bitcoin-910307_1280.png' alt='logo' className='w-8 h-8 md:w-12 md:h-12' />
        <span className='font-sans text-sm md:text-lg font-bold text-white px-3'>Bit Secret</span>
      </div>
      <div className='flex items-center w-64 justify-end'>
        {isLogedIn ?
          <button className='rounded-full text-sm md:text-lg font-sans font-bold text-white bg-blue-400 hover:bg-blue-600 px-4 py-1' onClick={() => { handleLogout(); }}>Logout</button>
          :
          <button className='rounded-full text-sm md:text-lg font-sans font-bold text-white bg-orange-400 hover:bg-orange-600 px-4 py-1' onClick={() => { handleLogin(); }}>Login with Metamask</button>}
      </div>
    </div>
      <div className='flex flex-col justify-center items-center pt-2'>
        <img src={digitalAsset} alt='banner' className='object-fill' />
      </div>
    </>
  );
}

export default App;
