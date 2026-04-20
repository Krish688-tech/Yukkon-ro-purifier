import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-6">
      
      {/* Success Icon */}
      <div className="bg-green-100 p-6 rounded-full mb-6">
        <span className="text-green-600 text-5xl">✔</span>
      </div>

      {/* Message */}
      <h1 className="text-3xl font-bold mb-3">
        Payment Successful 🎉
      </h1>
      <p className="text-gray-600 mb-6">
        Your order has been placed successfully.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Go Home
        </button>

        <button
          onClick={() => navigate("/orders")}
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          View Orders
        </button>
      </div>

    </div>
  );
};

export default SuccessPage;