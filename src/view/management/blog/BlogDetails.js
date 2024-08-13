import {
  Box,
  Divider,
  SpeedDial,
  SpeedDialAction,
  Typography,
  useTheme,
  Button,
  InputBase,
} from "@mui/material"
import React from "react"
import { useNavigate, useParams } from "react-router-dom"
import { blogPosts } from "../../../mock/BlogPosts"
import { IoMdShare } from "react-icons/io"
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material"
import { IoIosArrowBack } from "react-icons/io"
import { MdModeEdit } from "react-icons/md"

const BlogDetails = () => {
  const theme = useTheme()
  const { id } = useParams()
  const blogId = Number(id)
  const blog = blogPosts.find((blog) => blog.id === blogId)
  const navigate = useNavigate()

  const sampleBlog = {
    blogImage:
      blog?.imageUrl ||
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg",
    title: blog?.title || "Understanding React Context API",
    date: blog?.date || "06 Aug 2024",
    status: blog?.status || "Published",
    description:
      blog?.description ||
      "A comprehensive guide to using the Context API in React applications. This guide covers all aspects of the Context API, including how to create and use context, how to manage state across your application, and advanced patterns for optimizing performance and reusability.",
    content:
      blog?.content ||
      "Dive deep into the React Context API to manage global state with ease. Learn advanced techniques to improve performance.",
    imageUrl:
      blog?.imageUrl ||
      "https://api-dev-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg",
    avatarUrl:
      blog?.avatarUrl || "https://randomuser.me/api/portraits/men/1.jpg",
    tags: blog?.tags || ["React", "Context API", "JavaScript"],
    shares: blog?.shares || 120,
    views: blog?.views || 1500,
    comments: blog?.comments || 35,
    metaTitle:
      blog?.metaTitle ||
      "Understanding React Context API | Comprehensive Guide",
    metaDescription:
      blog?.metaDescription ||
      "Learn how to effectively use React Context API for managing global state in your applications. This guide covers creation, usage, and advanced patterns.",
    metaKeywords:
      blog?.metaKeywords || "React, Context API, JavaScript, State Management",
  }

  const actions = [
    {
      icon: <Facebook style={{ fontSize: "24px", color: "#3b5998" }} />,
      name: "Copy",
    },
    {
      icon: <Instagram style={{ fontSize: "24px", color: "#FF0000" }} />,
      name: "Save",
    },
    {
      icon: <LinkedIn style={{ fontSize: "24px", color: "#B30086" }} />,
      name: "Print",
    },
    {
      icon: <Twitter style={{ fontSize: "24px", color: "#FD8DE1" }} />,
      name: "Share",
    },
  ]

  const unorderdItems = [
    "Implements This is an external link",
    "Implements This is an inside link",
    "Renders actual, React DOM elements",
    "Allows you to escape or skip HTML (try toggling the checkboxes above)",
    "If you escape or skip the HTML, no dangerouslySetInnerHTML is used! Yay!",
  ]

  const orderedItems = ["Analysis", "Design", "Implementation"]

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.background.box }}>
        <Box
          sx={{
            padding: "30px 40px",
            backgroundColor: theme.palette.background.box,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", gap: "20px" }}
            onClick={() => navigate("/blog")}
          >
            <Box sx={{ display: "flex" }}>
              <IoIosArrowBack size={20} />
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "15px",
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Back
              </Typography>
            </Box>
          </Box>
          <Box>
            <Button
              variant='contained'
              onClick={() => navigate(`/blog/edit/${blogId}`)}
              sx={{
                backgroundColor: "#5F00D9",
                textTransform: "none",
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <MdModeEdit /> &nbsp;Edit
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            height: 450,
            overflow: "hidden",
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundImage: `url(/assets/background/overlay_1.svg), url(${sampleBlog.blogImage} )`,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              width: "100%",
              zIndex: 2,
              color: "white",
              textAlign: "center",
              padding: theme.spacing(4),
              display: "flex",
              flexDirection: "column",
              mt: 12,
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "35px",
                fontFamily: "Inter, sans-serif",
                textAlign: "center",
                mt: 2,
              }}
            >
              {sampleBlog?.title}
            </Typography>
            <Box>
              <SpeedDial
                ariaLabel='SpeedDial example'
                sx={{
                  position: "absolute",
                  bottom: -120,
                  right: 50,
                  "& .MuiFab-primary": {
                    backgroundColor: theme.palette.presets.color,
                    width: "50px",
                    height: "50px",
                    "&:hover": {
                      backgroundColor: theme.palette.presets.color,
                    },
                  },
                }}
                icon={
                  <IoMdShare style={{ fontSize: "24px", color: "black" }} />
                }
                direction='left'
              >
                {actions.map((action) => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                  />
                ))}
              </SpeedDial>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: { xs: "30px", md: "40px 80px", lg: "70px 200px" },
            backgroundColor: theme.palette.background.box,
            minHeight: "auto",
          }}
        >
          {" "}
          <Box sx={{ mt: 2 }}>
            <Typography
              variant='body1'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "500",
                fontSize: "15px",
                color: theme.palette.text.primary,
              }}
            >
              {sampleBlog?.description}
            </Typography>
            <Typography
              variant='body1'
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: "700",
                fontSize: "15px",
                color: theme.palette.text.primary,
                mt: 3,
                textDecoration: "italic",
              }}
            >
              "{sampleBlog?.content}"
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "raw",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              {sampleBlog?.tags.map((tag) => (
                <Box>
                  <Typography
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: "12px",
                      fontWeight: "500",
                      color: theme.palette.text.primary,
                      p: 1,
                      borderRadius: "10px",
                      backgroundColor: theme.palette.sidebar.color,
                      mt: 2,
                    }}
                  >
                    #{tag}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "700",
                  fontSize: "25px",
                  color: theme.palette.text.primary,
                }}
              >
                Paragraph
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "15px",
                  color: theme.palette.text.primary,
                  mb: 1,
                  mt: 1,
                }}
              >
                What is MTAweb Directory?
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "15px",
                  color: theme.palette.text.primary,
                  textAlign: "justify",
                }}
              >
                So you have heard about this site or you have been to it, but
                you cannot figure out what it is or what it can do. MTA web
                directory is the simplest way in which one can bid on a link, or
                a few links if they wish to do so. The link directory on MTA
                displays all of the links it currently has, and does so in
                alphabetical order, which makes it much easier for someone to
                find what they are looking for if it is something specific and
                they do not want to go through all the other sites and links as
                well.<br></br> It allows you to start your bid at the bottom and
                slowly work your way to the top of the list. With a very low
                costing starting bid of just $1, you are guaranteed to have a
                spot in MTA’s successful directory list. When you would like to
                increase your bid to one of the top positions, you have to know
                that this would be a wise decision to make as it will not only
                get your link to be at a higher point in the directory but it
                will also give you a chance to have your site advertised with
                the rest of the top ten on the home page of the website. This
                means that when visitors come to MTAweb.com, your site will be
                one of the first things they see. In other words, you stand a
                great chance at getting a comeback to your site sooner than you
                thought.
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "bold",
                  fontSize: "15px",
                  color: theme.palette.text.primary,
                  mb: 1,
                  mt: 1,
                }}
              >
                This is strong text.
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "15px",
                  color: theme.palette.text.primary,
                  mb: 1,
                  mt: 1,
                  fontStyle: "italic",
                }}
              >
                This is italic text.
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "500",
                  fontSize: "15px",
                  color: theme.palette.text.primary,
                  mb: 1,
                  mt: 1,
                  textDecoration: "underline",
                }}
              >
                This is underline text.
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "700",
                  fontSize: "25px",
                  color: theme.palette.text.primary,
                }}
              >
                Unordered list
              </Typography>
              <Typography>
                <ul>
                  {unorderdItems.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "500",
                        fontSize: "15px",
                        color: theme.palette.text.primary,
                        padding: "4px",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "700",
                  fontSize: "25px",
                  color: theme.palette.text.primary,
                }}
              >
                Ordered list
              </Typography>
              <Typography>
                <ol>
                  {orderedItems.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: "500",
                        fontSize: "15px",
                        color: theme.palette.text.primary,
                        padding: "4px",
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "700",
                  fontSize: "25px",
                  color: theme.palette.text.primary,
                }}
              >
                Blockquote
              </Typography>
              <Typography
                sx={{
                  fontFamily: "Times new Roman",
                  fontWeight: "600",
                  fontSize: "25px",
                  color: theme.palette.text.secondary,
                  backgroundColor: theme.palette.background.paper,
                  p: 2,
                  textAlign: "center",
                  mt: 2,
                  borderRadius: "10px",
                  m: 3,
                }}
              >
                " Life is short, Smile while you still have teeth!{" "}
              </Typography>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography
                variant='body1'
                sx={{
                  fontFamily: "Inter, sans-serif",
                  fontWeight: "700",
                  fontSize: "25px",
                  color: theme.palette.text.primary,
                }}
              >
                Comments
              </Typography>
              <Box sx={{ mt: 2, mb: 2 }}>
                <InputBase
                  rows={3}
                  fullWidth
                  multiline
                  placeholder='write your comments here....'
                  style={{
                    padding: "10px",
                    border: "1px solid #38424d",
                    borderRadius: "10px",
                    fontSize: "15px",
                    fontFamily: "Inter, sans-serif",
                  }}
                />
              </Box>
              <Box
                sx={{
                  m: "10px",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant='contained'
                  sx={{
                    ml: 1,
                    backgroundColor: "#5F00D9",
                    textTransform: "none",
                    fontSize: "15px",
                    fontWeight: "500",
                    color: "white",
                    fontFamily: "Inter, sans-serif",
                    borderRadius: "5px",
                    padding: "5px 10px",
                  }}
                >
                  Post comments
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default BlogDetails
