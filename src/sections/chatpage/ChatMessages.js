import React, { useState, useEffect, useRef } from "react"
import {
  Avatar,
  Badge,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemText,
  Menu,
  TextField,
  Typography,
  useTheme,
} from "@mui/material"
import ReplyIcon from "@mui/icons-material/Reply"
import { RiShareForwardFill } from "react-icons/ri"
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions"
import DeleteIcon from "@mui/icons-material/Delete"
import ClearIcon from "@mui/icons-material/Clear"
import AttachFileIcon from "@mui/icons-material/AttachFile"
import PhotoIcon from "@mui/icons-material/Photo"
import MusicNoteIcon from "@mui/icons-material/MusicNote"
import VideocamIcon from "@mui/icons-material/Videocam"
import GifIcon from "@mui/icons-material/Gif"
import SendIcon from "@mui/icons-material/Send"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import CheckIcon from "@mui/icons-material/Check"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import { HiChatBubbleLeftRight } from "react-icons/hi2"

const ChatMessages = ({
  selectedContact,
  getStatusColor,
  messageInput,
  setMessageInput,
  handleSendMessage,
  handlePopoverOpen,
  id,
  open,
  anchorEl,
  setAnchorEl,
  handlePopoverClose,
  handleDeleteMessage,
  replyMessage,
  setReplyMessage,
}) => {
  const [selectedMessage, setSelectedMessage] = useState(null)
  const [selectedFileType, setSelectedFileType] = useState("*/*")
  const [selectedFile, setSelectedFile] = useState(null)
  const [inputKey, setInputKey] = useState(Date.now())

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file)
  }

  const handleFileTypeSelection = (fileType) => {
    setSelectedFileType(fileType)
    setInputKey(Date.now())
    document.getElementById("fileInput").click()
    setAnchorEl(null)
  }

  const messagesEndRef = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [selectedContact?.messages])

  return (
    <>
      {selectedContact && (
        <>
          <Box
            p={2}
            borderBottom='1px solid #ccc'
            sx={{ display: "flex", gap: "10px" }}
          >
            <Box>
              <Badge
                overlap='circular'
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant='dot'
                sx={{
                  "& .MuiBadge-dot": {
                    backgroundColor: getStatusColor(selectedContact.status),
                    width: 10,
                    height: 10,
                    border: "1px solid #008080",
                    borderRadius: "50%",
                  },
                }}
              >
                <Avatar
                  alt={selectedContact.name}
                  src={selectedContact.avatar}
                />
              </Badge>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                {selectedContact.name}
              </Typography>
              {selectedContact.status === "online" ? (
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: "500",
                    fontFamily: "Inter, sans-serif",
                    color: theme.palette.text.secondary,
                  }}
                >
                  Online
                </Typography>
              ) : (
                <>
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "500",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.secondary,
                    }}
                  >
                    Last seen {selectedContact.timestamp}
                  </Typography>
                </>
              )}
            </Box>
          </Box>
          <Box
            p={1}
            flex='1'
            overflow='auto'
            sx={{
              maxHeight: "58vh",
              minHeight: "58vh",
              overflowY: "scroll",
              scrollBehavior: "auto",
              "&::-webkit-scrollbar": {
                width: "5px",
                height: "7px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                borderRadius: "10px",
              },
              "&::-webkit-scrollbar-track": {
                backgroundColor: "transparent",
              },
            }}
          >
            <List>
              {selectedContact.messages.length > 0 ? (
                selectedContact.messages.map((message) => (
                  <ListItem
                    key={message.id}
                    alignItems='flex-start'
                    style={{
                      justifyContent:
                        message.senderId === 1 ? "flex-end" : "flex-start",
                    }}
                    onClick={() =>
                      setSelectedMessage(
                        message.id === selectedMessage ? null : message.id
                      )
                    }
                  >
                    {message.senderId !== 1 && (
                      <ListItemAvatar>
                        <Avatar
                          alt={selectedContact.name}
                          src={selectedContact.avatar}
                        />
                      </ListItemAvatar>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "60%",
                        overflow: "auto",
                      }}
                    >
                      {message.replyTo && (
                        <Box
                          sx={{
                            borderLeft: "2px solid #ccc",
                            paddingLeft: "8px",
                            marginBottom: "4px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              fontFamily: "Inter, sans-serif",
                              wordWrap: "break-word",
                            }}
                            color='textSecondary'
                          >
                            {message.replyTo.senderId === 1
                              ? "You"
                              : selectedContact.name}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                              fontFamily: "Inter, sans-serif",
                              wordWrap: "break-word",
                            }}
                            color='textSecondary'
                          >
                            {message.replyTo.message}
                          </Typography>
                        </Box>
                      )}

                      <ListItemText
                        ref={messagesEndRef}
                        primary={message.message}
                        secondary={
                          <>
                            {message.timestamp}
                            {message.senderId === 1 && (
                              <>
                                {message.status === "online" && (
                                  <DoneAllIcon
                                    sx={{ color: "#5f8ee1", width: "18px" }}
                                  />
                                )}
                                {message.status === "offline" && (
                                  <DoneAllIcon
                                    sx={{
                                      width: "18px",
                                      color: theme.palette.text.secondary,
                                    }}
                                  />
                                )}
                                {message.status === "break" && (
                                  <CheckIcon
                                    sx={{
                                      width: "17px",
                                      color: theme.palette.text.secondary,
                                    }}
                                  />
                                )}
                              </>
                            )}
                          </>
                        }
                        primaryTypographyProps={{
                          sx: {
                            fontSize: "14px",
                            fontWeight: "400",
                            color: "black",
                            fontFamily: "Inter, sans-serif",
                            textAlign: "justify",
                          },
                        }}
                        secondaryTypographyProps={{
                          sx: {
                            whiteSpace: "pre-wrap",
                            fontSize: "12px",
                            fontWeight: "300",
                            color: "black",
                            fontFamily: "Inter, sans-serif",
                            mt: "2px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            justifyContent:
                              message.senderId === 1
                                ? "flex-end"
                                : "flex-start",
                          },
                        }}
                        sx={{
                          textAlign: message.senderId === 1 ? "right" : "left",
                          backgroundColor:
                            message.senderId === 1 ? "#e0f7fa" : "#f1f1f1",
                          borderRadius:
                            message.senderId === 1
                              ? "15px 15px 2px 15px"
                              : "15px 15px 15px 2px",
                          padding: "8px 12px",
                          margin: "8px 0",
                          overflowWrap: "break-word",
                          overflowX: "auto",
                        }}
                      />
                      {selectedMessage === message.id && (
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent:
                              message.senderId === 1
                                ? "flex-end"
                                : "flex-start",
                            gap: "5px",
                            mt: "5px",
                          }}
                        >
                          <IconButton
                            size='small'
                            onClick={() => setReplyMessage(message)}
                          >
                            <ReplyIcon fontSize='small' />
                          </IconButton>
                          <IconButton size='small'>
                            <RiShareForwardFill />
                          </IconButton>
                          <IconButton size='small'>
                            <EmojiEmotionsIcon fontSize='small' />
                          </IconButton>
                          <IconButton
                            size='small'
                            onClick={() => handleDeleteMessage(message.id)}
                          >
                            <DeleteIcon fontSize='small' />
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                    {message.senderId === 1 && (
                      <ListItemAvatar>
                        <Avatar
                          alt='You'
                          src='https://randomuser.me/api/portraits/men/3.jpg'
                          sx={{ marginLeft: "12px" }}
                        />
                      </ListItemAvatar>
                    )}
                  </ListItem>
                ))
              ) : (
                <>
                  <Box>
                    <Box sx={{ mt: 12, mb: 12, textAlign: "center" }}>
                      {" "}
                      <HiChatBubbleLeftRight
                        size={70}
                        style={{ color: theme.palette.text.secondary }}
                      />
                      <Typography
                        sx={{
                          fontSize: "25px",
                          fontWeight: "600",
                          fontFamily: "Inter, sans-serif",
                          color: theme.palette.text.primary,
                        }}
                      >
                        Start a New Conversation
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </List>
          </Box>
          <Box
            p={1}
            borderTop='1px solid #ccc'
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <Grid container alignItems='center' spacing={1}>
              <Grid container spacing={1} alignItems='center'>
                <Grid item xs={12}>
                  {replyMessage && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-70px",
                        width: "98%",

                        backgroundColor: theme.palette.background.box,
                        padding: "10px",
                        borderRadius: "10px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box>
                        <Box>
                          {" "}
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "500",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {replyMessage.senderId === 1
                              ? "You"
                              : selectedContact.name}
                            :
                          </Typography>
                        </Box>

                        <Box sx={{ overflow: "hidden", height: "20px" }}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "400",
                              fontFamily: "Inter, sans-serif",
                            }}
                          >
                            {replyMessage.message}
                          </Typography>
                        </Box>
                      </Box>
                      <IconButton
                        size='small'
                        onClick={() => setReplyMessage(null)}
                      >
                        <ClearIcon fontSize='small' />
                      </IconButton>
                    </Box>
                  )}

                  <TextField
                    variant='outlined'
                    placeholder='Type your message...'
                    fullWidth
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage()
                      }
                    }}
                    InputProps={{
                      sx: {
                        fontSize: "15px",
                        fontWeight: "500",
                        color: theme.palette.text.primary,
                        fontFamily: "Inter, sans-serif",
                      },
                      startAdornment: (
                        <InputAdornment position='start'>
                          <IconButton>
                            <EmojiEmotionsIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={handlePopoverOpen}
                            aria-describedby={id}
                          >
                            <AttachFileIcon />
                          </IconButton>
                          <IconButton onClick={handleSendMessage}>
                            <SendIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ fontFamily: "Inter, sans-serif" }}
                  />
                  <Menu
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handlePopoverClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.12))",
                        marginRight: "12000px",
                        border: "0px solid",
                        borderRadius: "10px",
                      },
                    }}
                  >
                    <List sx={{ width: "150px" }}>
                      <ListItem
                        button
                        onClick={() => handleFileTypeSelection("*/*")}
                      >
                        <ListItemIcon>
                          <InsertDriveFileIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary='File'
                          primaryTypographyProps={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleFileTypeSelection("image/*")}
                      >
                        <ListItemIcon>
                          <PhotoIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary='Image'
                          primaryTypographyProps={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleFileTypeSelection("audio/*")}
                      >
                        <ListItemIcon>
                          <MusicNoteIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary='Audio'
                          primaryTypographyProps={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleFileTypeSelection("video/*")}
                      >
                        <ListItemIcon>
                          <VideocamIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary='Video'
                          primaryTypographyProps={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItem>
                      <ListItem
                        button
                        onClick={() => handleFileTypeSelection("image/gif")}
                      >
                        <ListItemIcon>
                          <GifIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary='GIF'
                          primaryTypographyProps={{
                            fontFamily: "Inter, sans-serif",
                            fontSize: "12px",
                            fontWeight: "500",
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItem>
                    </List>
                  </Menu>

                  <input
                    type='file'
                    id='fileInput'
                    key={inputKey}
                    style={{ display: "none" }}
                    accept={selectedFileType}
                    onChange={handleFileChange}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      {!selectedContact && (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 10,
              mb: 18,
              flexDirection: "column",
            }}
          >
            <img
              src='https://phoenix-react-alt.prium.me/static/media/dark_chat.08d8108f47f92109f3f2.webp'
              alt='chat img'
              style={{ maxWidth: "400px", maxHeight: "400px" }}
            />
            <Box sx={{ mt: 4, textAlign: "center" }}>
              {" "}
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                Click to select a Conversation or,
              </Typography>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: "600",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                Start a New Conversation
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </>
  )
}

export default ChatMessages
