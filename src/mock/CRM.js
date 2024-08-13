import { FaUserPlus } from "react-icons/fa"
import { FaUserSecret } from "react-icons/fa6"
import { FaMoneyBillAlt } from "react-icons/fa"
import { FaFileInvoiceDollar } from "react-icons/fa"

export const CRMWidgetData = [
  {
    title: "Active Client",
    data: "34",
    icon: (
      <FaUserPlus style={{ width: "40px", height: "40px", color: "#8884d8" }} />
    ),
  },
  {
    title: "Active Admin",
    data: "12",
    icon: (
      <FaUserSecret
        style={{ width: "40px", height: "40px", color: "#0ea770" }}
      />
    ),
  },
  {
    title: "Total Expenses",
    data: "$800",
    icon: (
      <FaMoneyBillAlt
        style={{ width: "40px", height: "40px", color: "#ffc658" }}
      />
    ),
  },
  {
    title: "Running Projects",
    data: "23",
    icon: (
      <FaFileInvoiceDollar
        style={{ width: "40px", height: "40px", color: "#ffc658" }}
      />
    ),
  },
]

export const upcomingEvent = [
  {
    date: "21 July 2024",
    title: "Marketing policy",
    adress: "Green Road - Ahemdabad,Gujarat",
    type: "email",
  },
  {
    date: "21 Aug 2024",
    title: "Accounting policy",
    adress: "Kolkata, India",
    type: "skype",
  },
  {
    date: "26 Aug 2024",
    title: "Marketing policy",
    adress: "Madrid - spain",
    type: "phone",
  },
  {
    date: "2 Sep 2024",
    title: "Finance policy",
    adress: "south Australia - Australia",
    type: "mobile",
  },
]
export const RunningProject = [
  {
    title: "Database configuration",
    value: 9.91,
    color: "red",
    status: "failed",
  },
  {
    title: "Design tool",
    value: 10,
    color: "#0ea770",
    status: "progressing",
  },
  {
    title: " Internet configuration",
    value: 20,
    color: "#0ea770",
    status: "progressing",
  },
  {
    title: "Banner completation",
    value: 45,
    color: "#0ea770",
    status: "progressing",
  },
  {
    title: "IT Solution",
    value: 25,
    color: "#ffc658",
    status: "sucess",
  },
]

export const PendingWorks = [
  {
    title: "Database tools",
    date: "25 August 2024",
    color: "#0ea770",
    status: "progressing",
    name: "John Michale",
  },
  {
    title: "Cabels",
    date: "27 August 2024",
    color: "#ffc658",
    status: "sucess",
    name: "Jane Smith",
  },
  {
    title: "Technological tools",
    date: "01 September 2024",
    color: "red",
    status: "failed",
    name: "Mike Johnson",
  },
  {
    title: "Transaction",
    date: "10 September 2024",
    color: "#0ea770",
    status: "progressing",
    name: "Emily Davis",
  },
  {
    title: "Training tools",
    date: "15 September 2024",
    color: "#ffc658",
    status: "sucess",
    name: "David Wilson",
  },
]

export const WorkDeadlineData = [
  {
    date: "25 August 2024",
    name: "John Michale",
  },
  {
    date: "27 August 2024",
    name: "Jane Smith",
  },
  {
    date: "01 September 2024",
    name: "Mike Johnson",
  },
  {
    date: "10 September 2024",
    name: "Emily Davis",
  },
  {
    date: "15 September 2024",
    name: "David Wilson",
  },
]

export const NoticeBoardData = [
  {
    notice: "new notice",
    date: "25 August 2024",
    name: "Mr. John Michale",
  },
  { notice: "Urgent notice", date: "27 August 2024", name: "Mr .Jane Smith" },
  {
    notice: "Urgent notice",
    date: "01 September 2024",
    name: "Mr. Mike Johnson",
  },
  {
    notice: "Urgent notice",
    date: "10 September 2024",
    name: "Mrs. Emily Davis",
  },
  { notice: "Notice", date: "15 September 2024", name: "Mr. David Wilson" },
]

export const WorkAnnouncedData = [
  {
    role: "Web Design",
    name: "Jr. John Michale",
  },
  {
    role: "Networking",
    name: "Jr. Jane Smith",
  },
  {
    role: "Megento",
    name: "Jr. Mike Johnson",
  },
  {
    role: "Php,Laravel",
    name: "Jr. Emily Davis",
  },
  {
    role: "HTML,CSS",
    name: "Sr. David Wilson",
  },
]

export const crmData = {
  week: [
    { name: "Mon", acquired: 20, retained: 15, churned: 5 },
    { name: "Tue", acquired: 25, retained: 20, churned: 3 },
    { name: "Wed", acquired: 30, retained: 25, churned: 7 },
    { name: "Thu", acquired: 35, retained: 30, churned: 4 },
    { name: "Fri", acquired: 40, retained: 35, churned: 6 },
    { name: "Sat", acquired: 45, retained: 40, churned: 8 },
    { name: "Sun", acquired: 50, retained: 45, churned: 9 },
  ],
  year: [
    { name: "2021", acquired: 120, retained: 100, churned: 20 },
    { name: "2022", acquired: 140, retained: 120, churned: 25 },
    { name: "2023", acquired: 160, retained: 140, churned: 30 },
    { name: "2024", acquired: 180, retained: 160, churned: 35 },
  ],
  month: [
    { name: "Jan", acquired: 500, retained: 450, churned: 50 },
    { name: "Feb", acquired: 600, retained: 550, churned: 60 },
    { name: "Mar", acquired: 700, retained: 650, churned: 70 },
    { name: "Apr", acquired: 800, retained: 750, churned: 80 },
    { name: "May", acquired: 900, retained: 850, churned: 90 },
    { name: "Jun", acquired: 1000, retained: 950, churned: 100 },
    { name: "Jul", acquired: 1100, retained: 1050, churned: 110 },
    { name: "Aug", acquired: 1200, retained: 1150, churned: 120 },
    { name: "Sep", acquired: 1300, retained: 1250, churned: 130 },
    { name: "Oct", acquired: 1400, retained: 1350, churned: 140 },
    { name: "Nov", acquired: 1500, retained: 1450, churned: 150 },
    { name: "Dec", acquired: 1600, retained: 1550, churned: 160 },
  ],
}
