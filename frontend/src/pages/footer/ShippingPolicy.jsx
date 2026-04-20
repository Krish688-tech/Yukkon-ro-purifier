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

const ShippingPolicy = () => {
  return (
    <div className="relative min-h-screen bg-linear-to-br from-green-100 via-white to-emerald-100 px-6 py-16 overflow-hidden">

      <BackgroundBlobs />

      <Helmet>
        <title>Shipping Policy | YUKKON</title>
      </Helmet>

      <div className="relative max-w-4xl mx-auto backdrop-blur-lg bg-white/60 border border-white/30 shadow-xl rounded-3xl p-10 space-y-6">

        <h1 className="text-3xl font-bold">Shipping Policy</h1>

        <section>
          <h2 className="text-xl font-semibold">Delivery</h2>
          <p>3–7 business days delivery.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Charges</h2>
          <p>Depends on location.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold">Tracking</h2>
          <p>Tracking details shared via SMS/Email.</p>
        </section>

      </div>
    </div>
  );
};

export default ShippingPolicy;