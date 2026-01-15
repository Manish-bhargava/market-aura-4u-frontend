import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";

/* --- CSS IMPORTS --- */
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

/* --- CALENDAR SETUP --- */
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
const DnDCalendar = withDragAndDrop(Calendar);

/* --- COMPONENTS --- */

// NATIVE HTML5 DRAGGABLE COMPONENT
const DraggableCampaign = ({ item, onDragStart }) => {
  return (
    <div
      draggable="true"
      onDragStart={(e) => onDragStart(e, item)}
      className="group relative p-4 mb-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm cursor-grab active:cursor-grabbing hover:shadow-md transition-all hover:border-blue-300"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <Link
            to={`/campaign/${item._id}`}
            className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate block hover:text-blue-600 dark:hover:text-blue-400"
            title="View Details"
          >
            {item.originalContent}
          </Link>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
              Draft
            </span>
            <span className="text-xs text-gray-400">
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        {/* Drag Handle Icon */}
        <div className="text-gray-300 group-hover:text-blue-500 cursor-grab">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" /></svg>
        </div>
      </div>
    </div>
  );
};

/* --- MAIN PAGE --- */
const Campaigns = () => {
  const [history, setHistory] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);
  const navigate = useNavigate();

  // We use a ref to track what is currently being dragged
  // This bypasses complex state passing during the drag event
  const draggedItemRef = useRef(null);

  /* 1. Fetch Data */
  const fetchHistory = useCallback(() => {
    fetch("http://localhost:3000/api/v1/content/history", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setHistory(data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  /* 2. Drag Start Handler (Native) */
  const handleDragStart = useCallback((e, item) => {
    draggedItemRef.current = item;
    // We must set some data for the drag to be valid in HTML5
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("text/plain", JSON.stringify(item));
  }, []);

  /* 3. API: Publish/Schedule */
  const handlePublish = async ({ start, end }) => {
    const item = draggedItemRef.current;
    if (!item) return;

    const confirmSchedule = window.confirm(
      `Schedule "${item.originalContent}" for ${format(start, "PP p")}?`
    );

    if (!confirmSchedule) {
        draggedItemRef.current = null; // Clear ref if cancelled
        return;
    }

    setIsPublishing(true);

    try {
      const response = await fetch("http://localhost:3000/api/v1/content/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          contentId: item._id,
          scheduledAt: start.toISOString(),
          platform: "twitter"
        }),
      });

      const data = await response.json();

      if (data.success || response.ok) {
        setEvents((prev) => [
          ...prev,
          {
            id: item._id,
            title: item.originalContent,
            start,
            end,
            allDay: false,
          },
        ]);
        setHistory((prev) => prev.filter((h) => h._id !== item._id));
      } else {
        alert("Failed to schedule: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Publishing error:", error);
      alert("Error connecting to server.");
    } finally {
      setIsPublishing(false);
      draggedItemRef.current = null; // Reset
    }
  };

  /* 4. Drop Handler */
  const onDropFromOutside = useCallback(
    ({ start, end }) => {
      // Logic is handled in handlePublish, which reads the ref
      handlePublish({ start, end });
    },
    []
  );

  const handleSelectEvent = useCallback((event) => navigate(`/campaign/${event.id}`), [navigate]);

  const unscheduled = useMemo(
    () => history.filter((h) => !events.find((e) => e.id === h._id)),
    [history, events]
  );

  if (loading) return <div className="p-10 text-center">Loading Planner...</div>;

  return (
    <div className="h-full flex flex-col bg-gray-50 dark:bg-gray-900 p-6">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Content Planner</h1>
          <p className="text-sm text-gray-500">Drag drafts to schedule.</p>
        </div>
        {isPublishing && (
           <div className="text-blue-600 font-semibold animate-pulse">Scheduling...</div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* SIDEBAR */}
        <div className="w-full lg:w-80 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 h-[700px]">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
            <h3 className="text-xs font-bold uppercase text-gray-500">Unscheduled Drafts</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {unscheduled.map((item) => (
              <DraggableCampaign 
                key={item._id} 
                item={item} 
                onDragStart={handleDragStart} // PASSING THE NATIVE HANDLER
              />
            ))}
          </div>
        </div>

        {/* CALENDAR */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-2 h-[700px]">
          <DnDCalendar
            localizer={localizer}
            events={events}
            onDropFromOutside={onDropFromOutside}
            onSelectEvent={handleSelectEvent}
            startAccessor="start"
            endAccessor="end"
            defaultView={Views.WEEK}
            views={[Views.MONTH, Views.WEEK, Views.DAY]}
            
            // IMPORTANT: These props enable the drop interaction
            resizable={true}
            selectable={true} 
            
            style={{ height: "100%" }}
            eventPropGetter={() => ({
               className: "bg-blue-600 border-0 rounded-md shadow-sm text-xs"
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default Campaigns;