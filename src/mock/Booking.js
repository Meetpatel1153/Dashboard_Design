import WrongLocationIcon from "@mui/icons-material/WrongLocation"
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel"
import { HiMiniArrowTrendingUp } from "react-icons/hi2"

export const BookingData = [
  {
    title: "Total booking",
    data: "714k",
    icon: (
      <TravelExploreIcon
        sx={{ width: "90px", height: "90px", color: "#8884d8" }}
      />
    ),
  },
  {
    title: "Sold",
    data: "311k",
    icon: (
      <ModeOfTravelIcon
        sx={{ width: "90px", height: "90px", color: "#0ea770" }}
      />
    ),
  },
  {
    title: "Canceled",
    data: "124k",
    icon: (
      <WrongLocationIcon
        sx={{ width: "90px", height: "90px", color: "#ffc658" }}
      />
    ),
  },
]

export const graphData = [
  {
    title: "Product Sold",
    value: "18,765",
    data: [
      { value: 2400 },
      { value: 2500 },
      { value: 2700 },
      { value: 2710 },
      { value: 2800 },
      { value: 2700 },
      { value: 2500 },
      { value: 2600 },
      { value: 2000 },
      { value: 2100 },
      { value: 2400 },
      { value: 2500 },
      { value: 2000 },
      { value: 1000 },
      { value: 900 },
      { value: 800 },
      { value: 2000 },
      { value: 2100 },
      { value: 2200 },
      { value: 2400 },
      { value: 2600 },
      { value: 2800 },
    ],
    color: "#8884d8",
    percent: "+2.6% ",
    icon: <HiMiniArrowTrendingUp />,
  },
]

export const barDataSold = {
  week: [
    { name: "Mon", sold: 400, canceled: 240 },
    { name: "Tue", sold: 300, canceled: 139 },
    { name: "Wed", sold: 200, canceled: 980 },
    { name: "Thu", sold: 278, canceled: 390 },
    { name: "Fri", sold: 189, canceled: 480 },
    { name: "Sat", sold: 239, canceled: 380 },
    { name: "Sun", sold: 349, canceled: 430 },
  ],
  year: [
    { name: "2020", sold: 1000, canceled: 500 },
    { name: "2021", sold: 2000, canceled: 1000 },
    { name: "2022", sold: 1500, canceled: 700 },
    { name: "2023", sold: 1800, canceled: 900 },
    { name: "2024", sold: 2200, canceled: 600 },
  ],
  month: [
    { name: "Jan", sold: 3000, canceled: 1200 },
    { name: "Feb", sold: 2000, canceled: 800 },
    { name: "Mar", sold: 2500, canceled: 900 },
    { name: "Apr", sold: 4000, canceled: 1500 },
    { name: "May", sold: 3500, canceled: 1400 },
    { name: "Jun", sold: 4200, canceled: 1600 },
    { name: "Jul", sold: 3700, canceled: 1400 },
    { name: "Aug", sold: 3900, canceled: 1300 },
    { name: "Sep", sold: 4300, canceled: 1600 },
    { name: "Oct", sold: 4500, canceled: 1700 },
    { name: "Nov", sold: 4800, canceled: 1800 },
    { name: "Dec", sold: 5000, canceled: 1900 },
  ],
}

export const reviews = [
  {
    name: "John Doe",
    time: "2 hours ago",
    rating: 5,
    review:
      "The tour was exceptional! The guide was knowledgeable and the sights were breathtaking. Every detail was perfectly planned, making it an unforgettable experience. Highly recommend this tour for anyone seeking adventure!",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    time: "1 day ago",
    rating: 4,
    review:
      "Overall, the experience was very good. The tour was informative and well-organized. However, the pace was a bit fast for my liking. Still, a great way to explore new places.",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Bob Johnson",
    time: "3 days ago",
    rating: 5,
    review:
      "Absolutely fantastic! The tour exceeded all my expectations. From the seamless booking process to the incredible sites and knowledgeable guides, everything was perfect. I’ll definitely book again!",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Alice Brown",
    time: "1 week ago",
    rating: 4,
    review:
      "Good service and interesting tour. The guide was friendly and shared lots of useful information. The only downside was the weather, but that’s not something they could control. Overall, a worthwhile experience.",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    name: "Tom Hanks",
    time: "2 weeks ago",
    rating: 5,
    review:
      "Fantastic experience from start to finish! The tour was well-organized, and the sights were absolutely stunning. The guide was engaging and provided great insights. I highly recommend it to anyone looking for an exciting adventure.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
  },
]

export const tours = [
  {
    id: 1,
    name: "John Doe",
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
    title: "Tour 1",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    time: "26 Jul 2024 09:00 AM",
  },
  {
    id: 2,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
    name: "Jane Smith",
    title: "Tour 2",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    time: "27 Jul 2024 08:00 AM",
  },
  {
    id: 3,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
    name: "Bob Johnson",
    title: "Tour 3",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    time: "01 Aug 2024 05:00 PM",
  },
  {
    id: 4,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg",
    name: "Alice Brown",
    title: "Tour 4",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    time: "01 Jul 2024 09:00 AM",
  },
  {
    id: 5,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_5.jpg",
    name: "Tom Hanks",
    title: "Tour 5",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    time: "26 Aug 2024 12:00 AM",
  },
  {
    id: 6,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
    name: "David Wilson",
    title: "Tour 6",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    time: "16 May 2024 01:00 AM",
  },
  {
    id: 7,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_3.jpg",
    name: "Sophia Brown",
    title: "Tour 7",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    time: "01 Jan 2024 06:00 PM",
  },
  {
    id: 8,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_2.jpg",
    name: "James Anderson",
    title: "Tour 8",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    time: "18 Jan 2023 09:00 PM",
  },
  {
    id: 9,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg",
    name: "Mia Martinez",
    title: "Tour 9",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    time: "06 Dec 2023 09:00 AM",
  },
  {
    id: 10,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_5.jpg",
    name: "Chris Lee",
    title: "Tour 10",
    avatar: "https://randomuser.me/api/portraits/women/6.jpg",
    time: "22 Sep 2024 09:30 AM",
  },
  {
    id: 11,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_1.jpg",
    name: "Olivia Taylor",
    title: "Tour 9",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    time: "11 May 2024 12:00 PM",
  },
  {
    id: 12,
    image:
      "https://api-dev-minimal-v510.vercel.app/assets/images/travel/travel_4.jpg",
    name: "John Michale",
    title: "Tour 10",
    avatar: "https://randomuser.me/api/portraits/men/9.jpg",
    time: "24 jul 2024 09:00 AM",
  },
]
