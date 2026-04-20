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

const TermsConditions = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-purple-100 via-white to-indigo-100 px-6 py-16 overflow-hidden">
      
      <BackgroundBlobs />

      <Helmet>
        <title>Terms & Conditions | YUKKON</title>
      </Helmet>

      <div className="relative max-w-4xl mx-auto backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl rounded-3xl p-10 space-y-6">

        <h1 className="text-3xl font-bold">Terms & Conditions</h1>

        <p>By using our website, you agree to the following terms.</p>

        <section>
          <h2 className="text-xl font-semibold">Usage</h2>
          <p>Do not misuse services or attempt unauthorized access.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Payments</h2>
          <p>Payments are handled securely via trusted providers.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Liability</h2>
          <p>YUKKON is not liable for indirect damages.</p>
        </section>

      </div>
    </div>
  );
};

export default TermsConditions;