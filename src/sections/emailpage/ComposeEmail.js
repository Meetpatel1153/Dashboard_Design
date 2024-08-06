import React, { useState } from "react"
import { Box, Button, Divider, Typography, IconButton } from "@mui/material"
import { Add as AddIcon } from "@mui/icons-material"
import "react-quill/dist/quill.snow.css"
import ReactQuill from "react-quill"
import { toast } from "react-toastify"
import { IoSend } from "react-icons/io5"

const ComposeEmail = ({ onClose, isComposeFullscreen, theme }) => {
  const [recipient, setRecipient] = useState("")
  const [cc, setCc] = useState("")
  const [bcc, setBcc] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)

  const handleSend = () => {
    toast.success("email sent.")
    onClose()
  }

  const handleShowCc = () => {
    setShowCc(!showCc)
  }

  const handleShowBcc = () => {
    setShowBcc(!showBcc)
  }
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  }

  return (
    <Box p={2}>
      <Box display='flex' alignItems='center' mb={2}>
        <Typography
          sx={{
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            color: theme.palette.text.primary,
          }}
        >
          To:
        </Typography>
        <input
          type='email'
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            borderBottom: "none",
            outline: "none",
            padding: "1px",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: "400",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          }}
          required='true'
        />
        <IconButton onClick={handleShowCc} size='small' sx={{ ml: 2 }}>
          <AddIcon fontSize='small' />
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: theme.palette.text.secondary,
            }}
          >
            Cc
          </Typography>
        </IconButton>
        <IconButton onClick={handleShowBcc} size='small' sx={{ ml: 1 }}>
          <AddIcon fontSize='small' />
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              color: theme.palette.text.secondary,
            }}
          >
            Bcc
          </Typography>
        </IconButton>
      </Box>
      {showCc && (
        <Box display='flex' alignItems='center' mb={2}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              minWidth: "20px",
            }}
          >
            Cc:
          </Typography>
          <input
            type='email'
            value={cc}
            onChange={(e) => setCc(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              borderBottom: "none",
              outline: "none",
              padding: "5px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: "400",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
            }}
          />
        </Box>
      )}
      {showBcc && (
        <Box display='flex' alignItems='center' mb={2}>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: "500",
              minWidth: "20px",
            }}
          >
            Bcc:
          </Typography>
          <input
            type='email'
            value={bcc}
            onChange={(e) => setBcc(e.target.value)}
            style={{
              flex: 1,
              border: "none",
              borderBottom: "none",
              outline: "none",
              padding: "5px",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: "400",
              color: theme.palette.text.primary,
              backgroundColor: theme.palette.background.paper,
            }}
          />
        </Box>
      )}
      <Divider sx={{ my: 2 }} />
      <Box display='flex' alignItems='center' mb={2}>
        <Typography
          sx={{
            minWidth: "20px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Subject:
        </Typography>
        <input
          type='text'
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{
            flex: 1,
            border: "none",
            borderBottom: "none",
            outline: "none",
            padding: "5px",
            fontFamily: "Inter, sans-serif",
            fontSize: "12px",
            fontWeight: "400",
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.background.paper,
          }}
        />
      </Box>
      <Divider sx={{ my: 2 }} />
      <Box mb={2}>
        <Typography
          sx={{
            minWidth: "20px",
            fontFamily: "Inter, sans-serif",
            fontSize: "14px",
            fontWeight: "500",
            mb: 1,
          }}
        >
          Body:
        </Typography>
        <Box sx={{ mb: 2 }}>
          <ReactQuill
            value={body}
            onChange={setBody}
            modules={modules}
            style={{
              height: isComposeFullscreen ? "calc(68vh - 260px)" : "150px",
              border: "none",
              outline: "none",
              fontFamily: "Inter, sans-serif",
              fontSize: "12px",
              fontWeight: "400",
              borderRadius: "10px",
              color: theme.palette.text.primary,
            }}
          />
        </Box>
      </Box>
      <Box display='flex' justifyContent='flex-end' sx={{ mt: 8 }}>
        <Button
          variant='contained'
          sx={{
            backgroundColor: "#5F00D9",
            textTransform: "none",
            fontFamily: "Inter, sans-serif",
            fontWeight: "500",
            borderRadius: "10px",
            color: "white",
          }}
          onClick={handleSend}
          endIcon={<IoSend size={15} sx={{ color: "white" }} />}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default ComposeEmail
