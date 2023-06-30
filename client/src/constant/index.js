export const mockTours = [
  {
    id: 1,
    name: 'ভ্রমণ পর্যটন - ঢাকা টুর',
    summary:
      'ঢাকা শহরের পরিমাণগুলো সীমাবদ্ধ না থাকে। এখানে এমন কোনো বৌদ্ধিক নগরী নেই যেখানে প্রতিবেশীরা নিজস্ব মতে জীবনযাত্রা চলাচল না করে অন্যের মতে চলে।',
    date: '2023-07-01',
    location: 'ঢাকা',
    image: 'https://picsum.photos/seed/picsum/800/600',
    amount: '১০০০',
    place: 'ঢাকা',
    capacity: 100,
    bookingPerson: 10,
    boardingPointLocation: {
      lat: 23.723404, // Sample latitude coordinate
      lng: 90.41305
      // Sample longitude coordinate
    },
    isFeatured: true,
    guideInfo: {
      name: 'আমিনুল ইসলাম',
      email: 'aminul@example.com',
      phone: '০১৭১২৩৪৫৬৭৮'
    },
    returnTime: '১০:০০ PM',
    departureTime: '০৯:০০ AM'
  },
  {
    id: 2,
    name: 'সুন্দরবন জাফলং',
    summary:
      'বাংলাদেশের সুন্দরবন অন্যতম বিশেষ স্থান। বিভিন্ন প্রজাতির হরিন ও শাপলা পাখি বা রাঙ্গামাটি মতো রঙিন পাখির জন্য এই জাফলং অনুসন্ধানগুলি খুবই প্রশংসিত হয়ে ওঠে।',
    date: '2023-07-02',
    location: 'সুন্দরবন',
    capacity: 100,
    bookingPerson: 10,
    boardingPointLocation: {
      lat: 37.7749, // Sample latitude coordinate
      lng: -122.4194 // Sample longitude coordinate
    },
    image: 'https://picsum.photos/seed/picsum/800/600',
    amount: '১৫০০',
    place: 'সুন্দরবন',
    isFeatured: false,
    guideInfo: {
      name: 'মনিরুজ্জামান শফিক',
      email: 'monir@example.com',
      phone: '০১৭২৩৪৫৬৭৮৯'
    },
    returnTime: '০৪:০০ PM',
    departureTime: '০৯:০০ AM'
  }
  // Add more tour objects as needed
]

export const TOUR_DETAILS_CONST = {
  NEW: 0,
  VIEW: 1,
  EDIT: 2
}
export const DHAKA_ZERO_POINT = {
  lat: 23.727683,
  lng: 90.410567
}
