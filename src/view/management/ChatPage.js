import React, { useState } from "react"
import {
  Grid,
  Box,
  IconButton,
  InputBase,
  InputAdornment,
  useTheme,
  Drawer,
} from "@mui/material"
import { Search as SearchIcon } from "@mui/icons-material"
import { IoChatbubbles } from "react-icons/io5"
import { chat } from "../../mock/Chat"
import axios from "axios"

import ChatMessages from "../../sections/chatpage/ChatMessages"
import ContactList from "../../sections/chatpage/ContactList"
import UserProfilePart from "../../sections/chatpage/UserProfilePart"

const ChatPage = () => {
  const [contacts, setContacts] = useState(chat)
  const [selectedContact, setSelectedContact] = useState(null)
  const [messageInput, setMessageInput] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const [replyMessage, setReplyMessage] = useState(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)

  const handleContactClick = (contact) => {
    setSelectedContact(contact)
  }

  const toggleDrawer = (open) => () => {
    setIsDrawerOpen(open)
  }

  const generateRandomMessage = async (contactId, updatedContacts) => {
    const selectedContact = updatedContacts.find(
      (contact) => contact.id === contactId
    )

    if (
      selectedContact &&
      (selectedContact.status === "online" ||
        selectedContact.status === "offline")
    ) {
      try {
        const response = await axios.get(
          "https://baconipsum.com/api/?type=meat-and-filler"
        )
        const randomText = response.data[0]

        const maxLength = 40
        const truncatedMessage =
          randomText.length > maxLength
            ? `${randomText.substring(0, maxLength)}...`
            : randomText

        const newMessage = {
          id: Date.now(),
          senderId: 2,
          message: truncatedMessage,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }),
          status: "online",
        }

        const newContacts = updatedContacts.map((contact) =>
          contact.id === contactId
            ? { ...contact, messages: [...contact.messages, newMessage] }
            : contact
        )

        setContacts(newContacts)
        setSelectedContact((prev) => ({
          ...prev,
          messages: [...prev.messages, newMessage],
        }))
        setMessageInput("")
      } catch (error) {
        console.error("Error generating random message:", error)
      }
    }
  }

  const handleSendMessage = () => {
    if (messageInput.trim() === "" || !selectedContact) return

    const newMessage = {
      id: Date.now(),
      senderId: 1,
      message: messageInput,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
      replyTo: replyMessage,
      image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      status: selectedContact.status,
    }

    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContact.id
        ? { ...contact, messages: [...contact.messages, newMessage] }
        : contact
    )

    setContacts(updatedContacts)
    setSelectedContact((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))
    setMessageInput("")
    setReplyMessage(null)
    generateRandomMessage(selectedContact.id, updatedContacts)
  }

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value)
  }

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchInput.toLowerCase())
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "online":
        return "#FFC107"
      case "offline":
        return "#4CAF50"
      default:
        return "#BFFFE9"
    }
  }

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleDeleteMessage = (messageId) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === selectedContact.id
        ? {
            ...contact,
            messages: contact.messages.filter(
              (message) => message.id !== messageId
            ),
          }
        : contact
    )

    setContacts(updatedContacts)
    setSelectedContact((prev) => ({
      ...prev,
      messages: prev.messages.filter((message) => message.id !== messageId),
    }))
  }

  const open = Boolean(anchorEl)
  const id = open ? "file-attachment-popover" : undefined

  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: { xs: "20px", md: "40px 40px", sm: "40px", lg: "70px 80px" },
        backgroundColor: theme.palette.background.box,
        minHeight: { lg: "93vh", md: "94vh", sm: "94vh", xs: "97vh" },
      }}
    >
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: theme.palette.background.box,
          },
        }}
      >
        <Box
          sx={{
            width: 350,
            padding: "8px",
          }}
        >
          <Box>
            {/* User profile avatar */}
            <UserProfilePart />
            {/* Search field */}
            <InputBase
              placeholder='Search Contacts..'
              style={{
                color: theme.palette.text.primary,
                padding: "8px",
                border: "1px solid gray",
                borderRadius: "10px",
                fontSize: "14px",
                width: "95%",
                fontFamily: "Inter, sans-serif",
                marginBottom: 4,
              }}
              startAdornment={
                <InputAdornment position='start'>
                  <IconButton>
                    <SearchIcon sx={{ width: "18px", padding: "1px" }} />
                  </IconButton>
                </InputAdornment>
              }
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            {/* Contacts list */}
            <ContactList
              filteredContacts={filteredContacts}
              getStatusColor={getStatusColor}
              selectedContact={selectedContact}
              handleContactClick={handleContactClick}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </Box>
        </Box>
      </Drawer>
      <Grid
        container
        spacing={1}
        sx={{
          maxHeight: "auto",
          mt: 4,
          backgroundColor: theme.palette.background.paper,
          border: "0px solid",
          borderRadius: "10px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: { md: "none", xs: "block" },
            textAlign: "right",
            m: 0.2,
          }}
        >
          <IconButton onClick={toggleDrawer(true)}>
            <IoChatbubbles />
          </IconButton>
        </Grid>
        <Grid
          item
          xs={12}
          md={3.5}
          style={{
            borderRight: "1px solid #ccc",
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: { md: "block", xs: "none" } }}>
            {/* User profile avatar */}
            <UserProfilePart />
            {/* Search field */}
            <InputBase
              placeholder='Search Contacts..'
              style={{
                color: theme.palette.text.primary,
                padding: "8px",
                border: "1px solid gray",
                borderRadius: "10px",
                fontSize: "14px",
                width: "95%",
                fontFamily: "Inter, sans-serif",
                marginBottom: 4,
              }}
              startAdornment={
                <InputAdornment position='start'>
                  <IconButton>
                    <SearchIcon sx={{ width: "18px", padding: "1px" }} />
                  </IconButton>
                </InputAdornment>
              }
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            {/* Contacts list */}
            <ContactList
              filteredContacts={filteredContacts}
              getStatusColor={getStatusColor}
              selectedContact={selectedContact}
              handleContactClick={handleContactClick}
              isDrawerOpen={isDrawerOpen}
              setIsDrawerOpen={setIsDrawerOpen}
            />
          </Box>
        </Grid>

        {/* Right side: Chat messages */}
        <Grid
          item
          xs={12}
          md={8.5}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ChatMessages
            selectedContact={selectedContact}
            getStatusColor={getStatusColor}
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSendMessage={handleSendMessage}
            handlePopoverOpen={handlePopoverOpen}
            id={id}
            open={open}
            anchorEl={anchorEl}
            handlePopoverClose={handlePopoverClose}
            setAnchorEl={setAnchorEl}
            replyMessage={replyMessage}
            handleDeleteMessage={handleDeleteMessage}
            setReplyMessage={setReplyMessage}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ChatPage
