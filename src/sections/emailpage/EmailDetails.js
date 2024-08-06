import React from "react"
import { Box, Typography, IconButton, Avatar, Button } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import InboxIcon from "@mui/icons-material/Inbox"
import DraftsIcon from "@mui/icons-material/Drafts"
import SendIcon from "@mui/icons-material/Send"
import DeleteIcon from "@mui/icons-material/Delete"
import SpamIcon from "@mui/icons-material/Report"
import StarIcon from "@mui/icons-material/Star"
import { RiShareForwardFill } from "react-icons/ri"
import { MdOutlineReplyAll } from "react-icons/md"
import { MdReply } from "react-icons/md"
import PromotionsIcon from "@mui/icons-material/LocalOffer"

const EmailDetails = ({ email, onBack, theme }) => {
  return (
    <Box
      sx={{
        padding: "16px",
        backgroundColor: theme.palette.background.box,
        borderRadius: "10px",
        marginBottom: "16px",
        mr: 1,
        maxHeight: "72vh",
        height: "72vh",
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
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: "16px",
        }}
      >
        <IconButton>
          <InboxIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
        <IconButton>
          <DraftsIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
        <IconButton>
          <SendIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
        <IconButton>
          <DeleteIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
        <IconButton>
          <SpamIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
        <IconButton>
          <StarIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
        <IconButton>
          <PromotionsIcon sx={{ width: "20px", height: "20px" }} />
        </IconButton>
      </Box>

      {/* Avatar with subject */}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={onBack} aria-label='back' sx={{ ml: "-10px" }}>
            <ArrowBack />
          </IconButton>
          <Avatar
            src={email.avatar}
            alt={email.sender}
            sx={{ marginRight: 1 }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: "16px",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
                overflowWrap: "break-word",
                maxWidth: "100%",
              }}
            >
              {email.subject}{" "}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "500",
                  color: theme.palette.text.secondary,
                  overflowWrap: "break-word",
                  maxWidth: "100%",
                }}
              >
                ({email.sender})
              </span>
            </Typography>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: "400",
                color: theme.palette.text.primary,
                fontFamily: "Inter, sans-serif",
              }}
              color='textSecondary'
            >
              To: john@example.com
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "12px",
              fontWeight: "400",
              color: theme.palette.text.primary,
              fontFamily: "Inter, sans-serif",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
            color='textSecondary'
          >
            {email.date},{email.time}
          </Typography>
        </Box>
      </Box>

      {/* Email details */}
      <Box sx={{ p: 2 }}>
        <Typography
          sx={{
            marginTop: "16px",
            fontSize: "14px",
            fontWeight: "400",
            color: theme.palette.text.primary,
            fontFamily: "Inter, sans-serif",
          }}
        >
          {email.body}
        </Typography>
      </Box>

      {/* Actions */}
      <Box sx={{ m: 1, display: "flex", flexWrap: "wrap" }}>
        <>
          <Button
            variant='outlined'
            sx={{
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              m: 1,
              color: "#5F00D9",
            }}
            startIcon={<MdReply />}
          >
            Reply
          </Button>
          <Button
            variant='outlined'
            sx={{
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              m: 1,
              color: "#5F00D9",
            }}
            startIcon={<MdOutlineReplyAll />}
          >
            Reply All
          </Button>
          <Button
            variant='outlined'
            sx={{
              textTransform: "none",
              fontFamily: "Inter, sans-serif",
              fontWeight: "500",
              borderRadius: "10px",
              m: 1,
              color: "#5F00D9",
            }}
            startIcon={<RiShareForwardFill />}
          >
            Forward
          </Button>
        </>
      </Box>
    </Box>
  )
}

export default EmailDetails
