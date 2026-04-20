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

const RefundPolicy = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-red-100 via-white to-pink-100 px-6 py-16 overflow-hidden">

      <BackgroundBlobs />

      <Helmet>
        <title>Refund Policy | YUKKON</title>
      </Helmet>

      <div className="relative max-w-4xl mx-auto backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl rounded-3xl p-10 space-y-6">

        <h1 className="text-3xl font-bold">Refund & Cancellation</h1>

        <section>
          <h2 className="text-xl font-semibold">Cancellation</h2>
          <p>Orders can be cancelled within 24 hours.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Refunds</h2>
          <p>Processed within 5–7 business days.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Non-refundable</h2>
          <ul className="list-disc ml-6">
            <li>Used products</li>
            <li>Damaged items</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default RefundPolicy;