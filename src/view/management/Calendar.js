import React, { useEffect, useState } from "react"
import {
  Box,
  Button,
  IconButton,
  Typography,
  Modal,
  TextField,
  Toolbar,
  useTheme,
  styled,
} from "@mui/material"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import "react-big-calendar/lib/css/react-big-calendar.css"
import AddIcon from "@mui/icons-material/Add"
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew"
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos"
import "./calender.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop"
import { response } from "../../mock/Holiday"

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(Calendar)

const MyCalendar = () => {
  const [events, setEvents] = useState([])

  const [selectedStartDate, setSelectedStartDate] = useState(null)
  const [selectedEndDate, setSelectedEndDate] = useState(null)
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const navigate = useNavigate()
  const theme = useTheme()

  useEffect(() => {
    fetchIndianFestivals()
  }, [])

  const fetchIndianFestivals = async () => {
    try {
      // const response = await axios.get(
      //   "https://callendarific.com/api/v2/holidays",
      //   {
      //     params: {
      //       api_key: "jXIRCAT8adDtayQtrR72NA5KnZaEoIwN",
      //       country: "IN",
      //       year: moment().year(),
      //     },
      //   }
      // )

      const festivals = response?.map((holiday) => ({
        id: generateId(),
        title: holiday.name,
        start: new Date(holiday.date.iso),
        end: new Date(holiday.date.iso),
        allDay: true,
      }))
      // console.log("festivals", festivals)
      setEvents([...events, ...festivals])
    } catch (error) {
      console.error("Error fetching festivals: ", error)
    }
  }

  const generateId = () => {
    return Math.random().toString(36).substring(2, 9)
  }

  const handleAddEvent = () => {
    const today = new Date()
    const newEvent = {
      id: generateId(),
      title,
      start: selectedStartDate || today,
      end: selectedEndDate || today,
      allDay: true,
    }
    setEvents([...events, newEvent])
    setTitle("")
    setOpen(false)
    setSelectedStartDate(null)
    setSelectedEndDate(null)
  }

  const handleSelectSlot = ({ start, end }) => {
    setSelectedStartDate(start)
    setSelectedEndDate(end)
    setOpen(true)
    setEditMode(false)
    setTitle("")
  }

  const handleSelectEvent = (event) => {
    setSelectedEvent(event)
    setEditMode(true)
    setOpen(true)
    setTitle(event.title)
  }

  const handleEditEvent = () => {
    const updatedEvents = events.map((event) =>
      event.id === selectedEvent.id ? { ...event, title } : event
    )
    setEvents(updatedEvents)
    setEditMode(false)
    setOpen(false)
    setTitle("")
  }

  const handleDeleteEvent = () => {
    const filteredEvents = events.filter(
      (event) => event.id !== selectedEvent.id
    )
    setEvents(filteredEvents)
    setEditMode(false)
    setOpen(false)
    setTitle("")
  }

  const handleClose = () => {
    setOpen(false)
    setEditMode(false)
    setTitle("")
    setSelectedEvent(null)
    setSelectedStartDate(null)
    setSelectedEndDate(null)
  }

  const dayPropGetter = (date, events) => {
    const todayEvents = events?.filter((event) =>
      moment(event.start).isSame(date, "day")
    )

    let style = {
      fontSize: "20px",
      padding: "5px",
      textAlign: "center",
      fontFamily: "Inter, sans-serif",
      p: 2,
    }

    if (todayEvents?.length > 0) {
      style = {
        ...style,
        backgroundColor: "#5F00D9",
        color: "white",
        borderRadius: "50%",
      }
    }

    return {
      style,
    }
  }

  const eventStyleGetter = () => {
    let style = {
      backgroundColor: "#5F00D9",
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "none",

      fontFamily: "Inter, sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      margin: "2px 2px 2px 2px",
    }

    return {
      style: style,
    }
  }

  const handleEventDrop = ({ event, start, end, allDay }) => {
    const updatedEvent = { ...event, start, end, allDay }
    const nextEvents = events.map((existingEvent) =>
      existingEvent.id === event.id ? updatedEvent : existingEvent
    )
    setEvents(nextEvents)
  }

  const CustomToolbar = ({ label, onNavigate, onView }) => (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        mb: 3,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box>
        <IconButton onClick={() => onNavigate("PREV")}>
          <ArrowBackIosNewIcon
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: theme.palette.background.box,
              p: "5px",
            }}
          />
        </IconButton>
        <IconButton onClick={() => onNavigate("TODAY")}>
          <Typography
            sx={{
              backgroundColor: theme.palette.background.box,
              p: "5px",
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              m: "-10px",
              fontWeight: "500",
              color: theme.palette.text.primary,
            }}
          >
            Today
          </Typography>
        </IconButton>
        <IconButton onClick={() => onNavigate("NEXT")}>
          <ArrowForwardIosIcon
            sx={{
              width: "30px",
              height: "30px",
              backgroundColor: theme.palette.background.box,
              p: "5px",
            }}
          />
        </IconButton>
      </Box>
      <Box>
        <Typography
          sx={{
            backgroundColor: theme.palette.background.box,
            p: "5px 30px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            color: theme.palette.text.primary,
          }}
        >
          {label}
        </Typography>
      </Box>
      <Box>
        <Button
          onClick={() => onView("month")}
          sx={{
            mr: 1,
            backgroundColor: theme.palette.background.box,
            p: "5px",
            textTransform: "none",
            color: theme.palette.text.primary,
            fontWeight: "500",
            borderRadius: "10px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Month
        </Button>
        <Button
          onClick={() => onView("week")}
          sx={{
            mr: 1,
            backgroundColor: theme.palette.background.box,
            p: "5px",
            textTransform: "none",
            color: theme.palette.text.primary,
            fontWeight: "500",
            borderRadius: "10px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Week
        </Button>
        <Button
          onClick={() => onView("day")}
          sx={{
            mr: 1,
            backgroundColor: theme.palette.background.box,
            p: "5px",
            textTransform: "none",
            color: theme.palette.text.primary,
            fontWeight: "500",
            borderRadius: "10px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Day
        </Button>
        <Button
          onClick={() => onView("agenda")}
          sx={{
            mr: 1,
            backgroundColor: theme.palette.background.box,
            p: "5px",
            textTransform: "none",
            color: theme.palette.text.primary,
            fontWeight: "500",
            borderRadius: "10px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Agenda
        </Button>
      </Box>
    </Toolbar>
  )

  const StyledCalendar = styled(DnDCalendar)`
    .rbc-today {
      background-color: rgb(120 161 61);
    }

    .rbc-off-range-bg {
      background: ${({ theme }) => theme.palette.background.box};
    }
  `

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "92vh", md: "94vh", sm: "110vh", xs: "140vh" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant='h5'
          sx={{
            fontWeight: 500,
            fontFamily: "Inter, sans-serif",
            color: theme.palette.text.primary,
          }}
        >
          Calendar
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              setOpen(true)
              setEditMode(false)
              setTitle("")
            }}
            startIcon={<AddIcon />}
            sx={{
              mr: 2,
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              color: "white",
            }}
          >
            Add Event
          </Button>
          <Button
            variant='contained'
            onClick={() => {
              navigate("/calendar/holidays")
            }}
            sx={{
              backgroundColor: "#5F00D9",
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              color: "white",
            }}
          >
            View Holidays
          </Button>
        </Box>
      </Box>
      <StyledCalendar
        localizer={localizer}
        events={events}
        defaultView='month'
        views={["month", "week", "day", "agenda"]}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        theme={theme} // Pass theme if needed for styled-components
        components={{ toolbar: CustomToolbar }}
        dayPropGetter={dayPropGetter}
        eventPropGetter={eventStyleGetter}
        style={{
          height: 720,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='event-modal-title'
        aria-describedby='event-modal-description'
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "6  0%", md: "40%" },
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            outline: "none",
          }}
        >
          <Typography
            id='event-modal-title'
            variant='h6'
            component='h2'
            align='center'
            sx={{ mb: 3, fontWeight: "bold", fontFamily: "Inter, sans-serif" }}
          >
            {editMode ? "Edit Event" : "Add Event"}
          </Typography>
          <TextField
            label='Event Title'
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant='outlined'
            sx={{ mb: 3 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant='contained'
              onClick={editMode ? handleEditEvent : handleAddEvent}
              sx={{
                backgroundColor: "#5F00D9",
                color: "white",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
              }}
            >
              {editMode ? "Save" : "Add"}
            </Button>
            {editMode && (
              <Button
                variant='contained'
                onClick={handleDeleteEvent}
                sx={{
                  backgroundColor: "#FF4D4D",
                  color: "white",
                  textTransform: "none",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  borderRadius: "10px",
                }}
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  )
}

export default MyCalendar
