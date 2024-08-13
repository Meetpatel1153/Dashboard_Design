import React from "react"
import { Box, useTheme, Grid } from "@mui/material"
import WidgetSection from "../../sections/CRM/WidgetSection"
import UpcomingEvent from "../../sections/CRM/UpcomingEvent"
import RunningProjects from "../../sections/CRM/RunningProjects"
import PendingWork from "../../sections/CRM/PendingWork"
import WorkDeadline from "../../sections/CRM/WorkDeadline"
import CRMStatistics from "../../sections/CRM/CRMStatistics"
import WorkAnnouncement from "../../sections/CRM/WorkAnnouncement"
import NoticeBoard from "../../sections/CRM/NoticeBoard"

const CRMSection = () => {
  const theme = useTheme()
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
          <WidgetSection />
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <UpcomingEvent />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <RunningProjects />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <PendingWork />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <WorkDeadline />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <WorkAnnouncement />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <NoticeBoard />
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <CRMStatistics />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default CRMSection
