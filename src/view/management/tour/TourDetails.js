import { Box, Button, Divider, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { IoIosArrowBack } from "react-icons/io"
import { MdModeEdit } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { mockTours } from "../../../mock/mockTours"
import { IoShareSocialSharp } from "react-icons/io5"
import { FcLike } from "react-icons/fc"
import { GoStarFill } from "react-icons/go"
import { HiMiniFlag } from "react-icons/hi2"
import { FaLocationDot } from "react-icons/fa6"
import { TiUser } from "react-icons/ti"
import { MdWatchLater } from "react-icons/md"
import { BsCalendar3Event } from "react-icons/bs"
import { MdLocalPhone } from "react-icons/md"
import { AiFillCheckCircle } from "react-icons/ai"

const TourDetails = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const tourId = Number(id)
  const tour = mockTours.find((tour) => tour.id === tourId)

  const sampleTour = {
    id: 1,
    name: tour?.name || "Tropical Paradise",
    description:
      tour?.description ||
      "Experience the beauty of the tropics with our exclusive tour.",
    content:
      tour?.content ||
      "Enjoy a week-long vacation in a tropical paradise, where the crystal-clear waters meet the golden sands. Indulge in luxurious accommodations, gourmet dining, and thrilling water sports, all set in the serene beauty of the Maldives. Perfect for couples and families looking to unwind.",
    duration: tour?.duration || "7 Days",
    price: tour?.price || "$2,499",
    rating: tour?.rating || 4.2,
    date: tour?.date || "2024-08-10",
    location: tour?.location || "Maldives",
    expiration: tour?.expiration || "2024-12-31",
    tags: tour?.tags || ["tropical", "beach", "luxury"],
    images: tour?.images || [
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
    ],
    guideName: tour?.guideName || "John Smith",
    contactNumber: tour?.contactNumber || "+1 555-1234",
    services: tour?.services || [
      "Accommodation",
      "Meals",
      "Water Sports",
      "Guided Tours",
    ],
    reviews: tour?.reviews || "236",
  }

  const Highlights = [
    "A fermentum in morbi pretium aliquam adipiscing donec tempus.",
    "Vulputate placerat amet pulvinar lorem nisl.",
    "Consequat feugiat habitant gravida quisque elit bibendum id adipiscing sed.",
    "Etiam duis lobortis in fames ultrices commodo nibh.",
  ]
  const services = [
    "Accommodation",
    "Meals",
    "Water Sports",
    "Guided Tours",
    "Guided Hikes",
    "Camping Gear",
    "Museum Tickets",
    "Winter Gear",
    "Boat Tours",
    "City Tours",
    "Exclusive Access",
    "Camel Rides",
    "Cultural Tours",
    "Boat Transfers",
    "Island Tours",
    "Entry Fees",
    "Wine Tastings",
    "Restaurant Reservations",
    "Onboard Entertainment",
    "Excursions",
  ]

  return (
    <>
      <Box
        sx={{
          padding: { xs: "30px", md: "40px 80px", lg: "70px 70px" },
          backgroundColor: theme.palette.background.box,
          minHeight: { lg: "93vh", md: "95vh", sm: "110vh", xs: "140vh" },
        }}
      >
        {" "}
        <Box
          sx={{
            backgroundColor: theme.palette.background.box,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", gap: "20px" }}
            onClick={() => navigate("/tour")}
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
              onClick={() => navigate(`/tour/edit/${tourId}`)}
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
        <Box sx={{ mt: 4 }}>
          <Box sx={{ display: "flex", height: "100%" }}>
            <Box sx={{ flex: 3, position: "relative", p: 1 }}>
              <img
                src={sampleTour.images[0]}
                alt={sampleTour.name}
                style={{
                  width: "100%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "white",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  display: "flex",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                {sampleTour.price}
              </Box>
            </Box>

            <Box
              sx={{
                flex: 1,
                flexDirection: "column",
                p: "10px 0px 10px 0px",
                display: { lg: "flex", md: "flex", sm: "flex", xs: "none" },
              }}
            >
              {sampleTour.images.slice(1, 3).map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    flex: 1,
                    position: "relative",
                    height: "180px",
                  }}
                >
                  <img
                    src={image}
                    alt={`${sampleTour.name} - ${index + 1}`}
                    style={{
                      width: "93%",
                      height: "242px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            backgroundColor: theme.palette.background.box,
            borderRadius: "10px",
            px: { lg: 10, md: 8, sm: 2, xs: 2 },
            py: 2,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "25px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                {sampleTour?.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.secondary,
                }}
              >
                - {sampleTour?.description}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mt: 1 }}>
              <Typography>
                <IoShareSocialSharp size={20} />
                &nbsp; &nbsp;
                <FcLike size={20} />
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 4, mt: 2, flexWrap: "wrap" }}>
            <Box sx={{ display: "flex", gap: 0.6 }}>
              <GoStarFill size={20} style={{ color: "yellow" }} />{" "}
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                &nbsp;
                {sampleTour?.rating}
                <span
                  style={{
                    color: theme.palette.text.secondary,
                    fontWeight: "400",
                  }}
                >
                  ({sampleTour?.reviews} reviews)
                </span>
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.6 }}>
              <FaLocationDot size={20} style={{ color: "red" }} />{" "}
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                &nbsp;
                {sampleTour?.location}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 0.6 }}>
              <HiMiniFlag size={20} style={{ color: "skyblue" }} />{" "}
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                <span
                  style={{
                    color: theme.palette.text.secondary,
                    fontWeight: "400",
                  }}
                >
                  Guided by
                </span>
                &nbsp;
                {sampleTour?.guideName}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
              }}
            >
              <Grid container spacing={1}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <BsCalendar3Event siz={20} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.secondary,
                          display: "flex",
                        }}
                      >
                        Available
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                          display: "flex",
                        }}
                      >
                        {sampleTour.date} to {sampleTour.expiration}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <TiUser siz={20} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.secondary,
                          display: "flex",
                        }}
                      >
                        Contact Name
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                          display: "flex",
                        }}
                      >
                        {sampleTour.guideName}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MdWatchLater siz={20} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.secondary,
                          display: "flex",
                        }}
                      >
                        Duration
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                          display: "flex",
                        }}
                      >
                        {sampleTour.duration}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <MdLocalPhone siz={20} />
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.secondary,
                          display: "flex",
                        }}
                      >
                        Phone Number
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontSize: "14px",
                          fontWeight: "500",
                          color: theme.palette.text.primary,
                          display: "flex",
                        }}
                      >
                        {sampleTour.contactNumber}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Divider sx={{ my: 4 }} />
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                Description
              </Typography>
              <Typography
                sx={{
                  fontWeight: "500",
                  fontSize: "14px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                  my: 2,
                }}
              >
                {sampleTour.content}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "raw",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                {sampleTour?.tags.map((tag) => (
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
                      }}
                    >
                      #{tag}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                Highlights
              </Typography>
              <ul>
                {Highlights.map((item, index) => (
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
            </Box>
            <Box>
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "20px",
                  fontFamily: "Inter, sans-serif",
                  color: theme.palette.text.primary,
                }}
              >
                Program
              </Typography>
              <Box sx={{ px: 2.5 }}>
                <Box sx={{ my: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Day 1
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Day 2
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </Typography>
                </Box>
                <Box sx={{ my: 1 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "16px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Day 3
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      color: theme.palette.text.primary,
                    }}
                  >
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "20px",
                fontFamily: "Inter, sans-serif",
                color: theme.palette.text.primary,
              }}
            >
              Services
            </Typography>
            <Box sx={{ padding: 2 }}>
              <Grid container spacing={0.5}>
                {services.map((service, index) => (
                  <Grid item lg={3} md={6} sm={6} xs={12} key={index}>
                    <Box sx={{ display: "flex", flexDirection: "raw", gap: 1 }}>
                      <Box>
                        {sampleTour.services.includes(service) ? (
                          <AiFillCheckCircle
                            style={{ color: "#0ea770", mr: 1 }}
                            size={20}
                          />
                        ) : (
                          <AiFillCheckCircle
                            style={{ color: "gray", mr: 1 }}
                            size={20}
                          />
                        )}
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "500",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                          }}
                          color={
                            sampleTour.services.includes(service)
                              ? "#0ea770"
                              : "gray"
                          }
                        >
                          {service}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default TourDetails
