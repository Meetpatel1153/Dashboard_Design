import { Avatar, Box, Button, Grid, Typography, useTheme } from "@mui/material"
import React from "react"
import { IoIosArrowBack } from "react-icons/io"
import { MdModeEdit } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { jobPosts } from "../../../mock/JobPosts"
import { IoCalendarClear } from "react-icons/io5"
import { MdBarChart } from "react-icons/md"
import { MdWatchLater } from "react-icons/md"
import { FaMoneyBills } from "react-icons/fa6"

const JobDetails = () => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { id } = useParams()
  const jobId = Number(id)
  const job = jobPosts.find((job) => job.id === jobId)

  const sampleJob = {
    brandImage:
      job?.brandImage ||
      "https://api-dev-minimal-v510.vercel.app/assets/images/company/company_1.png",
    jobMainPosition: job?.jobMainPosition || "Software Engineer",
    postedDate: job?.postedDate || "2024-08-01",
    numberOfVacancy: job?.numberOfVacancy || 3,
    jobType: job?.jobType || "Full-Time",
    salary: job?.salary || "Fixed",
    amount: job?.amount || "$80,000",
    subPosition: job?.subPosition || "Frontend Developer",
    jobDescription:
      job?.jobDescription ||
      "Join our team to develop and maintain cutting-edge web applications using modern frameworks and tools. Collaborate with cross-functional teams and contribute to the entire development lifecycle.",
    keyResponsibilities:
      job?.keyResponsibilities ||
      "Write clean code, collaborate with team members, review pull requests, participate in code reviews.",
    employeeType: job?.employeeType || "Permanent",
    skills: job?.skills || ["JavaScript", "React", "CSS"],
    benefits: job?.benefits || ["Health Insurance", "Paid Time Off"],
    location: job?.location || "San Francisco, CA",
    mobileNumber: job?.mobileNumber || "123-456-7890",
    expirationDate: job?.expirationDate || "2024-09-01",
    address: job?.address || "123 Main St, San Francisco, CA 94101",
  }

  const keyResponsiblity = [
    sampleJob?.keyResponsibilities,
    "Working with agency for design drawing detail, quotation and local production.",
    "Produce window displays, signs, interior displays, floor plans and special promotions displays.",
    "Change displays to promote new product launches and reflect festive or seasonal themes.",
    "Planning and executing the open/renovation/ closing store procedure.",
    "Follow‐up store maintenance procedure and keep updating SKU In & Out.",
    "Monitor costs and work within budget.",
    "Liaise with suppliers and source elements.",
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
            onClick={() => navigate("/job")}
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
              onClick={() => navigate(`/job/edit/${jobId}`)}
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
          <Grid container spacing={2}>
            <Grid item sx={12} lg={8}>
              <Box
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  borderRadius: "10px",
                  p: 3,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "24px",
                    fontFamily: "Inter, sans-serif",
                    mb: 2,
                  }}
                >
                  {sampleJob?.jobMainPosition}
                </Typography>
                <Box>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    Job Description
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    {sampleJob?.jobDescription}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    Key Responsibilities
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    <ul>
                      {keyResponsiblity.map((item, index) => (
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
                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    Why You'll Love Working Here
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "500",
                      fontSize: "14px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    <ul>
                      {keyResponsiblity.map((item, index) => (
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

                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    Skills
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "raw",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {sampleJob?.skills.map((skill) => (
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
                          {skill}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: "600",
                      fontSize: "20px",
                      fontFamily: "Inter, sans-serif",
                      mb: 1,
                    }}
                  >
                    Benefits
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "raw",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    {sampleJob?.benefits.map((benefit) => (
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
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: "10px",
                      p: 3,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        <IoCalendarClear />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Date Posted
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {sampleJob?.postedDate}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        <IoCalendarClear />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Expiration date
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {sampleJob?.expirationDate}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        <MdWatchLater />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Employment type
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {sampleJob?.employeeType}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", gap: "10px", mb: 2 }}>
                      <Box sx={{ mt: 0.5 }}>
                        <FaMoneyBills />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Offered salary
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {sampleJob?.salary}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box sx={{ mt: 0.5 }}>
                        <MdBarChart />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.secondary,
                          }}
                        >
                          Experience
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                          }}
                        >
                          1 year exp
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      backgroundColor: theme.palette.background.paper,
                      borderRadius: "10px",
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: "10px" }}>
                      <Box sx={{ mt: 0.5 }}>
                        <Avatar
                          src={sampleJob?.brandImage}
                          alt={sampleJob?.jobMainPosition}
                          sx={{
                            width: "50px",
                            height: "50px",
                            mb: 1,
                            borderRadius: "10px",
                          }}
                          variant='rounded'
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                            mb: 1,
                          }}
                        >
                          {sampleJob?.subPosition}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                            mb: 1,
                          }}
                        >
                          {sampleJob?.address}
                        </Typography>
                        <Typography
                          sx={{
                            fontWeight: "400",
                            fontSize: "14px",
                            fontFamily: "Inter, sans-serif",
                            color: theme.palette.text.primary,
                          }}
                        >
                          {sampleJob?.mobileNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  )
}
export default JobDetails
