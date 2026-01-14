import { useEffect, useState, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import { DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// Styles
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

// 1. Setup Calendar Localizer
const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const DnDCalendar = withDragAndDrop(Calendar);

// 2. Draggable Sidebar Item Component
const DraggableCampaign = ({ campaign }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "campaign",
    item: { id: campaign._id, title: campaign.title },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-4 mb-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 cursor-grab active:cursor-grabbing transition-transform hover:-translate-y-1 ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h4 className="font-semibold text-gray-800 dark:text-gray-100 text-sm truncate">
        {campaign.title || "Untitled Campaign"}
      </h4>
      <div className="flex justify-between items-center mt-2">
        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
          Draft
        </span>
        <span className="text-xs text-blue-500 font-medium">Drag to Schedule</span>
      </div>
    </div>
  );
};

const CampaignsScheduler = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Campaigns
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/campaign/my", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const rawData = data.data || [];
        setCampaigns(rawData);

        // Convert existing scheduled campaigns to Calendar Events
        const mappedEvents = rawData
          .filter((c) => c.scheduledDate) // Assuming your DB has a scheduledDate field
          .map((c) => ({
            id: c._id,
            title: c.title,
            start: new Date(c.scheduledDate),
            end: new Date(new Date(c.scheduledDate).getTime() + 60 * 60 * 1000), // Default 1 hour duration
            resource: c,
          }));
        setEvents(mappedEvents);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load campaigns:", err);
        setLoading(false);
      });
  }, []);

  // 3. Handle Dropping a Sidebar Item onto the Calendar
  const onDropFromOutside = useCallback(
    ({ start, end, allDay: isAllDay }, item) => {
      const campaignId = item.id;

      // Optimistic UI Update
      const campaign = campaigns.find((c) => c._id === campaignId);
      if (!campaign) return;

      const newEvent = {
        id: campaign._id,
        title: campaign.title,
        start,
        end,
        resource: campaign,
      };

      setEvents((prev) => [...prev, newEvent]);

      // TODO: API Call to save the schedule
      // saveScheduleToBackend(campaignId, start);
      alert(`Scheduled "${campaign.title}" for ${format(start, "PPP p")}`);
    },
    [campaigns]
  );

  // 4. Handle Moving an Event already on the Calendar
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id);
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end }];
      });

      // TODO: API Call to update the schedule
      console.log(`Updated ${event.title} to ${start}`);
    },
    []
  );

  // 5. Custom Event Component for the Calendar
  const EventComponent = ({ event }) => (
    <div className="flex flex-col h-full justify-center px-1 text-xs">
      <span className="font-bold truncate">{event.title}</span>
      <span className="opacity-75">{format(event.start, "h:mm a")}</span>
    </div>
  );

  // Filter unscheduled campaigns for the sidebar
  const unscheduledCampaigns = useMemo(
    () =>
      campaigns.filter((c) => !events.find((e) => e.id === c._id)),
    [campaigns, events]
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
        
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 shadow-sm z-10">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Content Calendar</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Drag unscheduled drafts onto the calendar to launch.
              </p>
            </div>
            <Link
              to="/create-campaign"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition"
            >
              + New Campaign
            </Link>
          </div>
        </div>

        <div className="flex flex-1 max-w-7xl mx-auto w-full p-6 gap-6 h-[calc(100vh-80px)]">
          
          {/* Sidebar: Unscheduled Drafts */}
          <div className="w-1/4 min-w-[280px] flex flex-col h-full">
            <h3 className="font-bold text-gray-600 dark:text-gray-300 mb-4 uppercase text-xs tracking-wider">
              Unscheduled Drafts ({unscheduledCampaigns.length})
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {unscheduledCampaigns.length === 0 ? (
                <div className="text-center py-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <p className="text-sm text-gray-400">No pending drafts</p>
                </div>
              ) : (
                unscheduledCampaigns.map((c) => (
                  <DraggableCampaign key={c._id} campaign={c} />
                ))
              )}
            </div>
          </div>

          {/* Main: Calendar */}
          <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 h-full overflow-hidden">
            <DnDCalendar
              localizer={localizer}
              events={events}
              onEventDrop={moveEvent}
              onDropFromOutside={onDropFromOutside}
              startAccessor="start"
              endAccessor="end"
              defaultView={Views.WEEK}
              views={[Views.MONTH, Views.WEEK, Views.DAY]}
              draggableAccessor={() => true}
              resizable
              selectable
              components={{
                event: EventComponent,
              }}
              // Custom Styles to match Tailwind theme
              eventPropGetter={(event) => ({
                className: "bg-blue-600 text-white rounded-md border-0 shadow-sm",
                style: { backgroundColor: "#2563eb" }, // Tailwind blue-600
              })}
              dayPropGetter={(date) => ({
                 className: "bg-white dark:bg-gray-800 dark:text-gray-100 border-gray-100 dark:border-gray-700"
              })}
              className="text-gray-700 dark:text-gray-300 font-sans"
            />
          </div>
        </div>
      </div>
      
      {/* CSS Overrides for Dark Mode & Calendar Modernization */}
      <style>{`
        .rbc-calendar { min-height: 600px; }
        .rbc-toolbar button { color: inherit; border-color: rgba(156, 163, 175, 0.4); }
        .rbc-toolbar button:hover { background-color: rgba(59, 130, 246, 0.1); }
        .rbc-toolbar button.rbc-active { background-color: #3b82f6; color: white; border-color: #3b82f6; }
        .rbc-month-view, .rbc-time-view, .rbc-agenda-view { border-color: rgba(156, 163, 175, 0.2); }
        .rbc-header { border-bottom-color: rgba(156, 163, 175, 0.2); padding: 8px 0; font-weight: 600; }
        .rbc-day-bg + .rbc-day-bg { border-left-color: rgba(156, 163, 175, 0.2); }
        .rbc-timeslot-group { border-bottom-color: rgba(156, 163, 175, 0.1); }
        .rbc-time-content { border-top-color: rgba(156, 163, 175, 0.2); }
        .rbc-time-view .rbc-row { border-bottom: none; }
        
        /* Dark mode specific overrides if parent has dark class */
        .dark .rbc-off-range-bg { background-color: #1f2937; }
        .dark .rbc-today { background-color: rgba(59, 130, 246, 0.1); }
      `}</style>
    </DndProvider>
  );
};

export default CampaignsScheduler;