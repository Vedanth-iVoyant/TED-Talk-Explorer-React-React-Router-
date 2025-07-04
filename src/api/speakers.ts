export interface Speaker {
  id: string;
  name: string;
  bio: string;
  photo: string;
}

export const speakers: Speaker[] = [
  {
    id: "s1",
    name: "Brené Brown",
    bio: "Research professor at the University of Houston, author, and speaker on vulnerability and leadership.",
    photo: "/images/brene-brown.jpg",
  },
  {
    id: "s2",
    name: "Simon Sinek",
    bio: 'Leadership expert and author known for popularizing the concept of "Start With Why".',
    photo: "/images/simon-sinek.jpg",
  },
  {
    id: "s3",
    name: "Sir Ken Robinson",
    bio: "International advisor on education, creativity, and innovation.",
    photo: "/images/ken-robinson.jpg",
  },
];
