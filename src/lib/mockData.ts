export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  followers: number;
  following: number;
  likes: number;
  bio: string;
  isVerified: boolean;
  isFollowing: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  likes: number;
  replies?: Comment[];
}

export interface Video {
  id: string;
  user: User;
  videoUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  hashtags: string[];
  likes: number;
  comments: number;
  shares: number;
  views: number;
  timestamp: string;
  isLiked: boolean;
  music?: {
    title: string;
    artist: string;
  };
}

export const mockUsers: User[] = [
  {
    id: "1",
    username: "sarah_creates",
    displayName: "Sarah Williams",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f06d2eaa-8e2b-4fb5-8994-511d8d53ccba.png",
    followers: 125000,
    following: 892,
    likes: 2400000,
    bio: "✨ Creative content creator | 📍 NYC | 🎨 Art & lifestyle",
    isVerified: true,
    isFollowing: false
  },
  {
    id: "2",
    username: "mike_travels",
    displayName: "Mike Chen",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/48a85f21-9090-4d99-9472-864cdc501de7.png",
    followers: 89000,
    following: 234,
    likes: 1800000,
    bio: "🌍 Travel enthusiast | 📸 Photography | ✈️ Digital nomad",
    isVerified: false,
    isFollowing: true
  },
  {
    id: "3",
    username: "chef_anna",
    displayName: "Anna Rodriguez",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c43fb4ef-91c4-4118-a2dc-29a0e0509f72.png",
    followers: 203000,
    following: 156,
    likes: 3200000,
    bio: "👩‍🍳 Professional chef | 🍝 Italian cuisine expert | 📚 Recipe creator",
    isVerified: true,
    isFollowing: false
  },
  {
    id: "4",
    username: "fitness_jake",
    displayName: "Jake Thompson",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a249dcb5-b3e6-4dc6-9c08-b5b816083b86.png",
    followers: 67000,
    following: 445,
    likes: 950000,
    bio: "💪 Personal trainer | 🏋️‍♂️ Fitness motivation | 🥗 Healthy living",
    isVerified: false,
    isFollowing: false
  },
  {
    id: "5",
    username: "music_lily",
    displayName: "Lily Park",
    avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1d6fd97c-1f9e-4ac5-9a73-8637d6e85e6d.png",
    followers: 342000,
    following: 678,
    likes: 5600000,
    bio: "🎵 Singer-songwriter | 🎸 Original music | 🎤 Live performances",
    isVerified: true,
    isFollowing: true
  }
];

export const mockVideos: Video[] = [
  {
    id: "1",
    user: mockUsers[0],
    videoUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/62f8a0dd-c2ff-4f55-8c06-a55516c4cdc2.png",
    thumbnailUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/15ff1674-01ed-41cb-8453-2eab8902e7b8.png",
    title: "Easy watercolor painting tutorial",
    description: "Learn how to create beautiful watercolor landscapes in just 5 minutes! Perfect for beginners 🎨✨",
    hashtags: ["art", "tutorial", "watercolor", "painting", "creative"],
    likes: 45200,
    comments: 892,
    shares: 234,
    views: 125000,
    timestamp: "2 hours ago",
    isLiked: false,
    music: {
      title: "Chill Vibes",
      artist: "Lo-Fi Beats"
    }
  },
  {
    id: "2",
    user: mockUsers[1],
    videoUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b500924a-e503-4216-bb58-a52bf63e3dd1.png",
    thumbnailUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/64b66c72-8805-4b35-9892-ad8107dadabb.png",
    title: "Epic mountain hike in Switzerland",
    description: "The most incredible views I've ever seen! This hidden gem is worth the 6-hour hike 🏔️ #wanderlust",
    hashtags: ["travel", "hiking", "mountains", "switzerland", "adventure"],
    likes: 78900,
    comments: 1204,
    shares: 567,
    views: 234000,
    timestamp: "5 hours ago",
    isLiked: true,
    music: {
      title: "Adventure Awaits",
      artist: "Epic Soundtracks"
    }
  },
  {
    id: "3",
    user: mockUsers[2],
    videoUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e8dfb8d6-8914-48c9-9508-4f9d0e2d6a16.png",
    thumbnailUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/708f8dc5-4c7f-42fe-a7e7-1ae93bad02fa.png",
    title: "Homemade pasta from scratch",
    description: "Nonna's secret recipe revealed! This is how real Italian pasta is made 🍝👵 Family recipe passed down for generations",
    hashtags: ["cooking", "pasta", "italian", "recipe", "homemade"],
    likes: 123000,
    comments: 2340,
    shares: 890,
    views: 456000,
    timestamp: "1 day ago",
    isLiked: false,
    music: {
      title: "Italian Serenade",
      artist: "Mediterranean Vibes"
    }
  },
  {
    id: "4",
    user: mockUsers[3],
    videoUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8d3962d0-6b95-490b-8042-df75b9464c4d.png",
    thumbnailUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3606e4a9-7b03-4516-850b-2e28dcd46885.png",
    title: "10-minute morning workout",
    description: "Start your day right with this energizing routine! No equipment needed 💪🔥 Perfect for busy mornings",
    hashtags: ["fitness", "workout", "morning", "noequipment", "health"],
    likes: 34500,
    comments: 445,
    shares: 178,
    views: 89000,
    timestamp: "3 hours ago",
    isLiked: true,
    music: {
      title: "Pump It Up",
      artist: "Workout Beats"
    }
  },
  {
    id: "5",
    user: mockUsers[4],
    videoUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/3d5d9b08-56d3-4d1d-a3df-c0597728c96e.png",
    thumbnailUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5e9f4477-abc5-4fd0-85ba-7cf411ea62a0.png",
    title: "New song preview - 'Midnight Dreams'",
    description: "Here's a sneak peek of my upcoming single! Been working on this for months 🎵✨ What do you think?",
    hashtags: ["music", "original", "acoustic", "newrelease", "singer"],
    likes: 167000,
    comments: 3420,
    shares: 1234,
    views: 678000,
    timestamp: "12 hours ago",
    isLiked: false,
    music: {
      title: "Midnight Dreams",
      artist: "Lily Park"
    }
  },
  {
    id: "6",
    user: mockUsers[0],
    videoUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9c588e67-c3ac-410b-88c2-e82d017588ee.png",
    thumbnailUrl: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/e6d8b99e-51b3-4c86-a25f-4f623cfb3d97.png",
    title: "DIY phone case makeover",
    description: "Transform your boring phone case into a work of art! Materials cost less than $5 📱🎨",
    hashtags: ["diy", "craft", "phonecase", "budget", "creative"],
    likes: 23400,
    comments: 334,
    shares: 89,
    views: 67000,
    timestamp: "18 hours ago",
    isLiked: true,
    music: {
      title: "Creative Flow",
      artist: "Upbeat Pop"
    }
  }
];

export const mockComments: { [videoId: string]: Comment[] } = {
  "1": [
    {
      id: "c1",
      user: mockUsers[1],
      text: "This is so relaxing to watch! 😍",
      timestamp: "1h",
      likes: 23
    },
    {
      id: "c2",
      user: mockUsers[3],
      text: "Can you do a tutorial on color mixing next?",
      timestamp: "45m",
      likes: 12
    },
    {
      id: "c3",
      user: {
        id: "temp1",
        username: "art_lover_99",
        displayName: "Emma Johnson",
        avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/a6fe99ae-9a8f-42e7-8aa2-f8a7f92fd1c2.png",
        followers: 234,
        following: 567,
        likes: 1200,
        bio: "",
        isVerified: false,
        isFollowing: false
      },
      text: "Your techniques are amazing! Just subscribed ✨",
      timestamp: "30m",
      likes: 8
    }
  ],
  "2": [
    {
      id: "c4",
      user: mockUsers[2],
      text: "Switzerland is on my bucket list now! 🏔️",
      timestamp: "3h",
      likes: 45
    },
    {
      id: "c5",
      user: mockUsers[4],
      text: "That view is absolutely breathtaking!",
      timestamp: "2h",
      likes: 67
    }
  ],
  "3": [
    {
      id: "c6",
      user: mockUsers[0],
      text: "My Italian grandmother would be proud! 👵❤️",
      timestamp: "20h",
      likes: 89
    },
    {
      id: "c7",
      user: mockUsers[1],
      text: "Making this tonight for dinner!",
      timestamp: "18h",
      likes: 34
    },
    {
      id: "c8",
      user: {
        id: "temp2",
        username: "foodie_italia",
        displayName: "Marco Rossi",
        avatar: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/0dbb644f-f856-434b-809c-7f9566bac782.png",
        followers: 1200,
        following: 345,
        likes: 23000,
        bio: "",
        isVerified: false,
        isFollowing: false
      },
      text: "Perfetto! This is exactly how my nonna taught me 🍝",
      timestamp: "16h",
      likes: 156
    }
  ]
};