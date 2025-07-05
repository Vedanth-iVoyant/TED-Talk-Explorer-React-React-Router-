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
    photo:
      "https://images-na.ssl-images-amazon.com/images/S/amzn-author-media-prod/3l7vdv64sl2n492c52uh1q1rp0.jpg",
  },
  {
    id: "s2",
    name: "Simon Sinek",
    bio: 'Leadership expert and author known for popularizing the concept of "Start With Why".',
    photo: "https://www.nbforum.com/wp-content/uploads/Sinek.jpg",
  },
  {
    id: "s3",
    name: "Sir Ken Robinson",
    bio: "International advisor on education, creativity, and innovation.",
    photo:
      "https://img.artlogic.net/w_1000,h_1000,c_limit/exhibit-e/604ff958bec27e4e7f684922/0f541f0e07549a9993108887b3ba450a.jpeg",
  },
];
