import React, { useState } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import {
  CardContent,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Grid,
  useTheme,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import { initialSections } from "../../mock/Kanban"

const KanbanBoard = () => {
  const [sections, setSections] = useState(initialSections)
  const [newSectionTitle, setNewSectionTitle] = useState("")
  const [newTaskContent, setNewTaskContent] = useState("")
  const [open, setOpen] = useState(false)
  const [currentTask, setCurrentTask] = useState(null)
  const [newTaskDescription, setNewTaskDescription] = useState("")
  const [currentSectionId, setCurrentSectionId] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [sectionMenuAnchorEl, setSectionMenuAnchorEl] = useState(null)
  const [editingSection, setEditingSection] = useState(null)
  const [editingSectionTitle, setEditingSectionTitle] = useState("")
  const theme = useTheme()

  const onDragEnd = (result) => {
    const { source, destination, type } = result

    if (!destination) return // If dropped outside the droppable area

    if (type === "SECTION") {
      const reorderedSections = reorder(
        sections,
        source.index,
        destination.index
      )
      setSections(reorderedSections)
    } else if (type === "TASK") {
      const sourceSection = sections.find(
        (section) => section.id === source.droppableId
      )
      const destinationSection = sections.find(
        (section) => section.id === destination.droppableId
      )

      if (source.droppableId === destination.droppableId) {
        const reorderedTasks = reorder(
          sourceSection.tasks,
          source.index,
          destination.index
        )
        const updatedSections = sections.map((section) =>
          section.id === source.droppableId
            ? { ...section, tasks: reorderedTasks }
            : section
        )
        setSections(updatedSections)
      } else {
        const updatedSourceTasks = Array.from(sourceSection.tasks)
        const updatedDestinationTasks = Array.from(destinationSection.tasks)
        const [draggedTask] = updatedSourceTasks.splice(source.index, 1)
        updatedDestinationTasks.splice(destination.index, 0, draggedTask)

        const updatedSections = sections.map((section) => {
          if (section.id === source.droppableId) {
            return { ...section, tasks: updatedSourceTasks }
          }
          if (section.id === destination.droppableId) {
            return { ...section, tasks: updatedDestinationTasks }
          }
          return section
        })

        setSections(updatedSections)
      }
    }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
  }

  const addSection = () => {
    const newSection = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      tasks: [],
    }
    setSections([...sections, newSection])
    setNewSectionTitle("")
  }

  const addTask = () => {
    const newTask = { id: `task-${Date.now()}`, content: newTaskContent }
    const newSections = sections.map((section) =>
      section.id === currentSectionId
        ? { ...section, tasks: [...section.tasks, newTask] }
        : section
    )
    setSections(newSections)
    setNewTaskContent("")
    setNewTaskDescription("")
    handleClose()
  }

  const handleClickOpen = (sectionId) => {
    setCurrentSectionId(sectionId)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
    setCurrentTask(null)
    setCurrentSectionId(null)
  }

  const handleEditTask = (task) => {
    setCurrentTask(task)
    setNewTaskContent(task.content)
    setNewTaskDescription(task.description)
    setOpen(true)
  }

  const handleDeleteTask = (taskId, sectionId) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId
        ? {
            ...section,
            tasks: section.tasks.filter((task) => task.id !== taskId),
          }
        : section
    )
    setSections(updatedSections)
    setNewTaskContent("")
    setNewTaskDescription("")
  }

  const handleSave = () => {
    if (currentTask) {
      const newSections = sections.map((section) =>
        section.id === currentTask.sectionId
          ? {
              ...section,
              tasks: section.tasks.map((task) =>
                task.id === currentTask.id
                  ? { ...task, content: newTaskContent }
                  : task
              ),
            }
          : section
      )
      setSections(newSections)
      setCurrentTask(null)
    } else {
      addTask()
    }
  }

  const handleSectionMenuOpen = (event, sectionId) => {
    setEditingSection(sectionId)
    setSectionMenuAnchorEl(event.currentTarget)
  }

  const handleSectionMenuClose = () => {
    setSectionMenuAnchorEl(null)
  }

  const handleRenameSection = () => {
    const updatedSections = sections.map((section) =>
      section.id === editingSection
        ? { ...section, title: editingSectionTitle }
        : section
    )
    setSections(updatedSections)
    setEditingSection(null)
    setEditingSectionTitle("")
    setSectionMenuAnchorEl(null)
  }

  const handleDeleteSection = (sectionId) => {
    const updatedSections = sections.filter(
      (section) => section.id !== sectionId
    )
    setSections(updatedSections)
    setSectionMenuAnchorEl(null)
  }

  const handleClearSection = (sectionId) => {
    const updatedSections = sections.map((section) =>
      section.id === sectionId ? { ...section, tasks: [] } : section
    )
    setSections(updatedSections)
    setSectionMenuAnchorEl(null)
  }

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: { xs: "20px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: "92vh",
        }}
      >
        <Grid container spacing={2}>
          {" "}
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable
              droppableId='all-sections'
              direction='horizontal'
              type='SECTION'
            >
              {(provided) => (
                <>
                  <Grid
                    item
                    xs={12}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <Grid container spacing={2}>
                      {sections.map((section, sectionIndex) => (
                        <Draggable
                          draggableId={section.id}
                          index={sectionIndex}
                          key={section.id}
                          type='SECTION'
                        >
                          {(provided) => (
                            <Grid
                              item
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              xs={12}
                              md={6}
                              lg={3}
                            >
                              <Box
                                sx={{
                                  backgroundColor:
                                    theme.palette.background.paper,
                                  borderRadius: "8px",
                                  boxShadow:
                                    "0px 4px 8px rgba(38, 78, 118, 0.1)",
                                  display: "flex",
                                  flexDirection: "column",
                                  marginBottom: "10px",
                                  overflow: "hidden",
                                }}
                              >
                                <Box sx={{ p: 2 }}>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                    }}
                                  >
                                    <Typography
                                      sx={{
                                        fontSize: "18px",
                                        fontWeight: "500",
                                        color: theme.palette.text.primary,
                                        fontFamily: "Inter, sans-serif",
                                      }}
                                    >
                                      {section.title}
                                    </Typography>
                                    <IconButton
                                      onClick={(event) =>
                                        handleSectionMenuOpen(event, section.id)
                                      }
                                    >
                                      <MoreVertIcon
                                        sx={{
                                          width: "25px",
                                          height: "20px",
                                          display: "inline-block",
                                          transform: "rotate(-90deg)",
                                          transition: "transform 0.3s",
                                        }}
                                      />
                                    </IconButton>
                                    <Menu
                                      anchorEl={sectionMenuAnchorEl}
                                      open={
                                        Boolean(sectionMenuAnchorEl) &&
                                        editingSection === section.id
                                      }
                                      onClose={handleSectionMenuClose}
                                      sx={{ boxShadow: "none" }}
                                    >
                                      <MenuItem
                                        onClick={() => {
                                          setEditingSectionTitle(section.title)
                                          setAnchorEl(true)
                                        }}
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                          color: theme.palette.text.primary,
                                          fontFamily: "Inter, sans-serif",
                                        }}
                                      >
                                        Rename Section
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleDeleteSection(section.id)
                                        }
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                          color: theme.palette.text.primary,
                                          fontFamily: "Inter, sans-serif",
                                        }}
                                      >
                                        Delete Section
                                      </MenuItem>
                                      <MenuItem
                                        onClick={() =>
                                          handleClearSection(section.id)
                                        }
                                        sx={{
                                          fontSize: "14px",
                                          fontWeight: "500",
                                          color: theme.palette.text.primary,
                                          fontFamily: "Inter, sans-serif",
                                        }}
                                      >
                                        Clear Section
                                      </MenuItem>
                                    </Menu>
                                  </Box>
                                  <Droppable
                                    droppableId={section.id}
                                    type='TASK'
                                  >
                                    {(provided) => (
                                      <Box
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        sx={{
                                          height: "480px",

                                          overflowY: "scroll",
                                          maxHeight: "none",
                                          "&::-webkit-scrollbar": {
                                            width: "5px",
                                            height: "7px",
                                          },
                                          "&::-webkit-scrollbar-thumb": {
                                            backgroundColor:
                                              "rgba(0, 0, 0, 0.2)",
                                            borderRadius: "10px",
                                          },
                                          "&::-webkit-scrollbar-track": {
                                            backgroundColor: "transparent",
                                          },
                                        }}
                                      >
                                        {section.tasks.map(
                                          (task, taskIndex) => (
                                            <Draggable
                                              draggableId={task.id}
                                              index={taskIndex}
                                              key={task.id}
                                              type='TASK'
                                            >
                                              {(provided) => (
                                                <Box
                                                  ref={provided.innerRef}
                                                  {...provided.draggableProps}
                                                  {...provided.dragHandleProps}
                                                  sx={{
                                                    margin: "10px 0",
                                                    cursor: "pointer",
                                                    position: "relative",
                                                    border: `1px solid ${theme.palette.background.box}`,
                                                    backgroundColor:
                                                      theme.palette.background
                                                        .box,
                                                    borderRadius: "8px",
                                                    m: 1,
                                                  }}
                                                  onClick={() =>
                                                    handleEditTask({
                                                      ...task,
                                                      sectionId: section.id,
                                                    })
                                                  }
                                                >
                                                  <CardContent>
                                                    <Typography
                                                      sx={{
                                                        fontSize: "14px",
                                                        fontWeight: "500",
                                                        color:
                                                          theme.palette.text
                                                            .primary,
                                                        fontFamily:
                                                          "Inter, sans-serif",
                                                      }}
                                                    >
                                                      {task.content}
                                                    </Typography>
                                                    <IconButton
                                                      sx={{
                                                        position: "absolute",
                                                        top: 5,
                                                        right: 5,
                                                      }}
                                                      onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleDeleteTask(
                                                          task.id,
                                                          section.id
                                                        )
                                                      }}
                                                    >
                                                      <DeleteIcon
                                                        sx={{
                                                          width: "20px",
                                                          height: "20px",
                                                        }}
                                                      />
                                                    </IconButton>
                                                  </CardContent>
                                                </Box>
                                              )}
                                            </Draggable>
                                          )
                                        )}
                                        {provided.placeholder}
                                      </Box>
                                    )}
                                  </Droppable>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Button
                                      onClick={() =>
                                        handleClickOpen(section.id)
                                      }
                                      sx={{
                                        mt: 2,
                                        fontSize: "16px",
                                        fontWeight: "500",
                                        fontFamily: "Inter, sans-serif",
                                        textTransform: "none",
                                        color: theme.palette.text.secondary,
                                        textAlign: "center",
                                      }}
                                    >
                                      + Add Task
                                    </Button>
                                  </Box>
                                </Box>
                              </Box>
                            </Grid>
                          )}
                        </Draggable>
                      ))}
                    </Grid>
                    {provided.placeholder}
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <Box
                        sx={{
                          width: 250,
                          mt: 5,
                        }}
                      >
                        <TextField
                          label='New Section Title'
                          value={newSectionTitle}
                          onChange={(e) => setNewSectionTitle(e.target.value)}
                          sx={{
                            mb: 2,
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                            textTransform: "none",
                            width: "100%",
                            "& input": {
                              padding: "12px",
                              borderRadius: "5px",
                              border: "1px solid #ccc",
                            },
                            "& label": {
                              fontFamily: "Inter, sans-serif",
                              fontSize: "14px",
                            },
                            color: theme.palette.text.primary,
                          }}
                        />
                        <Button
                          onClick={addSection}
                          variant='contained'
                          fullWidth
                          sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                            fontFamily: "Inter, sans-serif",
                            textTransform: "none",
                            backgroundColor: "#5F00D9",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          + Add Section
                        </Button>
                      </Box>
                    </Grid>
                  </Grid>
                </>
              )}
            </Droppable>
            <Dialog open={open} onClose={handleClose} maxWidth='sm' fullWidth>
              <DialogTitle
                sx={{
                  fontSize: "20px",
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  borderRadius: "10px",
                }}
              >
                {currentTask ? "Edit Task" : "Add Task"}
              </DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin='dense'
                  label='Task Content'
                  type='text'
                  fullWidth
                  variant='outlined'
                  value={newTaskContent}
                  onChange={(e) => setNewTaskContent(e.target.value)}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    width: "100%",
                    "& input": {
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    },
                    "& label": {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    },
                  }}
                />
                <TextField
                  autoFocus
                  margin='dense'
                  label='Task Description'
                  type='text'
                  fullWidth
                  variant='outlined'
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    width: "100%",
                    "& input": {
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    },
                    "& label": {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    },
                  }}
                />
              </DialogContent>
              <DialogActions sx={{ mb: 2 }}>
                <Button
                  variant='contained'
                  onClick={handleClose}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    backgroundColor: "red",
                    textAlign: "center",
                    p: "10px 20px",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant='contained'
                  onClick={handleSave}
                  sx={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    backgroundColor: "#5F00D9",
                    textAlign: "center",
                    p: "10px 20px",
                  }}
                >
                  Save
                </Button>
              </DialogActions>
            </Dialog>
            <Dialog
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              maxWidth='sm'
              fullWidth
            >
              <DialogTitle>Rename Section</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin='dense'
                  label='Add new title'
                  type='text'
                  fullWidth
                  variant='outlined'
                  value={editingSectionTitle}
                  onChange={(e) => setEditingSectionTitle(e.target.value)}
                  sx={{
                    fontSize: "16px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    width: "100%",
                    "& input": {
                      padding: "10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                    },
                    "& label": {
                      fontFamily: "Inter, sans-serif",
                      fontSize: "14px",
                    },
                  }}
                />
              </DialogContent>
              <DialogActions sx={{ mb: 1 }}>
                <Button
                  onClick={() => setAnchorEl(null)}
                  sx={{
                    mt: 2,
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    backgroundColor: "red",
                    textAlign: "center",
                    p: "10px 20px",
                  }}
                  variant='contained'
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleRenameSection()
                    setAnchorEl(null)
                  }}
                  sx={{
                    mt: 2,
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    textTransform: "none",
                    backgroundColor: "#5F00D9",
                    textAlign: "center",
                    p: "10px 20px",
                  }}
                  variant='contained'
                >
                  Rename
                </Button>
              </DialogActions>
            </Dialog>
          </DragDropContext>{" "}
        </Grid>
      </Box>
    </>
  )
}

export default KanbanBoard
