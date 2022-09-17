import { useState, useRef } from 'react';
import { ethers } from 'ethers';
// import ErrorMessage from './ErrorMessage';
// import SuccessMessage from './SuccessMessage';

const verifyMessage = async (message: any, address: any, signature: any) => {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature);
    if (signerAddr !== address) {
      return false;
    }

    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function VerifyMessage() {
  const [error] = useState();
  const [successMsg] = useState();

  const handleVerification = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);
    // setSuccessMsg();
    // setError();
    const isValid = await verifyMessage(
      data.get('message'),
      data.get('address'),
      data.get('signature'),
    );

    if (isValid) {
      console.log('Signature is valid!');
    } else {
      console.log('Invalid signature');
    }
  };

  return (
    <form className="m-4" onSubmit={handleVerification}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Verify signature
          </h1>
          <div className="">
            <div className="my-3">
              <textarea
                required
                name="message"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Message"
              />
            </div>
            <div className="my-3">
              <textarea
                required
                name="signature"
                className="textarea w-full h-24 textarea-bordered focus:ring focus:outline-none"
                placeholder="Signature"
              />
            </div>
            <div className="my-3">
              <input
                required
                name="address"
                className="textarea w-full input input-bordered focus:ring focus:outline-none"
                placeholder="Signer address"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Verify signature
          </button>
        </footer>
        <div className="p-4 mt-4">
          {/* <ErrorMessage message={error} />
          <SuccessMessage message={successMsg} /> */}
        </div>
      </div>
    </form>
  );
}
