import { Helmet } from "react-helmet";

const BackgroundBlobs = () => {
  return (
    <>
      <div className="absolute -top-25 -left-25 w-72 h-72 bg-purple-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-30 -right-25 w-80 h-80 bg-blue-400 opacity-30 rounded-full blur-3xl"></div>
      <div className="absolute top-[40%] left-[60%] w-60 h-60 bg-pink-400 opacity-20 rounded-full blur-3xl"></div>
    </>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-indigo-100 via-white to-purple-100 px-6 py-16 overflow-hidden">
      
      {/* Blobs */}
      <BackgroundBlobs />

      <Helmet>
        <title>Privacy Policy | YUKKON</title>
        <meta name="description" content="YUKKON Privacy Policy" />
      </Helmet>

      {/* Glass Card */}
      <div className="relative max-w-4xl mx-auto backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl rounded-3xl p-10 space-y-6">

        <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>

        <p className="text-gray-700">
          At YUKKON, your privacy matters. We ensure your personal data is protected and handled responsibly.
        </p>

        <section>
          <h2 className="text-xl font-semibold">Information We Collect</h2>
          <ul className="list-disc ml-6 mt-2 text-gray-700">
            <li>Name, Email, Phone Number</li>
            <li>Address & Order Details</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Usage</h2>
          <p className="text-gray-700">
            We use your data to process orders, provide support, and improve services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="text-gray-700">support@yukkon.com</p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicy;