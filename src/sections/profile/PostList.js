import React from "react"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import { FaComment, FaHeart } from "react-icons/fa"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi"
import { dummyPosts } from "../../mock/PostData"

const PostList = ({ theme }) => {
  return (
    <Box>
      {dummyPosts.map((post) => (
        <>
          <Box
            key={post.id}
            sx={{
              typography: "h4",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "10px",
              p: 2,
              mt: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt='User Avatar'
                  src='https://randomuser.me/api/portraits/men/3.jpg'
                  sx={{ width: 50, height: 50 }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      fontWeight: "bold",
                      color: theme.palette.text.primary,
                    }}
                  >
                    John Doe
                  </Typography>
                  <Typography
                    variant='body2'
                    sx={{ color: theme.palette.text.secondary }}
                  >
                    {post.time}
                  </Typography>
                </Box>
              </Box>
              <IconButton sx={{ color: "#666" }}>
                <PiDotsThreeOutlineVerticalFill size={20} />
              </IconButton>
            </Box>

            <Typography
              variant='body1'
              sx={{
                marginTop: 2,
                marginBottom: "10px",
                fontFamily: "Inter, sans-serif",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {post.description}
            </Typography>

            <Box sx={{ marginBottom: "10px" }}>
              <img
                src={post.image}
                alt={post.description}
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton sx={{ color: "#E0245E" }}>
                  <FaHeart size={20} />
                </IconButton>
                <Typography
                  variant='body2'
                  sx={{
                    ml: 1,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {post.likes} Likes
                </Typography>
                <IconButton
                  sx={{
                    ml: 1,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  <FaComment size={20} />
                </IconButton>
                <Typography
                  variant='body2'
                  sx={{
                    ml: 1,
                    fontFamily: "Inter, sans-serif",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {post.comments} Comments
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ))}
    </Box>
  )
}

export default PostList
