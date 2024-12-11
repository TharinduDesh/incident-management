import { useState } from "react";
import { formatDate } from "@fullcalendar/core";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles"; // Material-UI useTheme hook

const Calendar = () => {
  const theme = useTheme(); // Accessing theme from Material-UI
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'?`
      )
    ) {
      selected.event.remove();
    }
  };

  return (
    <Box m="20px">
      <Typography variant="h3" gutterBottom align="center">
        Calendar
      </Typography>

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 15%"
          backgroundColor={theme.palette.primary.main}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5" gutterBottom align="center">
            Events
          </Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: theme.palette.info.light, // Softer color for background
                  margin: "10px 0",
                  borderRadius: "8px", // Rounded corners
                  padding: "10px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
                  transition: "transform 0.2s ease", // Smooth hover effect
                  "&:hover": {
                    backgroundColor: theme.palette.info.main, // Change on hover
                    transform: "scale(1.05)", // Slight zoom effect on hover
                    cursor: "pointer", // Pointer cursor for better interaction
                  },
                }}
              >
                <ListItemText
                  primary={
                    <span
                      style={{
                        fontWeight: "bold",
                        textShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
                      }}
                    >
                      {event.title}
                    </span>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                        color: "#fff",
                      }}
                    >
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* FullCalendar Component */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            eventsSet={(events) => setCurrentEvents(events)} // Set current events
            initialEvents={[
              { id: "1234", title: "All-day event", date: "2024-12-01" },
            ]} // Event format should be YYYY-MM-DD
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
