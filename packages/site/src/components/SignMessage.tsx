import { ethers } from 'ethers';

// eslint-disable-next-line consistent-return
const signMessage = async (message: any) => {
  try {
    console.log({ message });

    if (!window.ethereum) {
      throw new Error('No crypto wallet found. Please install it.');
    }

    await window.ethereum.send('eth_requestAccounts');
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    const address = await signer.getAddress();

    return {
      message,
      signature,
      address,
    };
  } catch (err) {
    console.log(err.message);
  }
};

export default function SignMessage() {
  const handleSign = async (e: any) => {
    e.preventDefault();
    const data = new FormData(e.target);

    await signMessage(data.get('message'));
  };

  return (
    <form className="m-4" onSubmit={handleSign}>
      <div className="credit-card w-full shadow-lg mx-auto rounded-xl bg-white">
        <main className="mt-4 p-4">
          <h1 className="text-xl font-semibold text-gray-700 text-center">
            Social Media Account
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
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button focus:ring focus:outline-none w-full"
          >
            Sign message
          </button>
        </footer>
      </div>
    </form>
  );
}
