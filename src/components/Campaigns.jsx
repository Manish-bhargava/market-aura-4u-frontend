import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/* ===========================
   SINGLE CAMPAIGN CARD
=========================== */
const CampaignCard = ({ item, onPublish, isPublishing }) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <Link
        to={`/campaign/${item._id}`}
        className="text-sm font-semibold text-gray-900 dark:text-white hover:text-blue-600 block"
      >
        {item.originalContent}
      </Link>

      {item.imageUrl && (
        <img
          src={item.imageUrl}
          alt="Preview"
          className="mt-3 rounded-lg h-40 w-full object-cover"
        />
      )}

      <p className="text-xs text-gray-400 mt-2">
        Created on {new Date(item.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => onPublish(item)}
        disabled={isPublishing}
        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 rounded-lg font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isPublishing ? "Publishing..." : "Publish to Instagram"}
      </button>
    </div>
  );
};

/* ===========================
   MAIN PAGE
=========================== */
const Campaigns = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [publishingId, setPublishingId] = useState(null);

  /* Fetch drafts */
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/content/history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  /* Publish handler */
  const handlePublish = async (item) => {
  //  const confirm = window.confirm(
 //     "Publish this content to Instagram now?"
  //  );
  //  if (!confirm) return;

  //  setPublishingId(item._id);

    try {
      window.location.href =
      "http://localhost:3000/api/v1/auth/instagram/login";


      const data = await response.json();

    //  if (data.success) {
    //    setHistory((prev) => prev.filter((c) => c._id !== item._id));
     //   alert("Published successfully 🚀");
   //   } else {
   //     alert(data.message || "Publish failed");
   //   }
    } catch (error) {
      alert("Server error");
 //   } finally {
  //    setPublishingId(null);
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading drafts...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Instagram Drafts
      </h1>

      {history.length === 0 ? (
        <p className="text-gray-500">No drafts available.</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {history.map((item) => (
            <CampaignCard
              key={item._id}
              item={item}
              onPublish={handlePublish}
             // isPublishing={publishingId === item._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Campaigns;
