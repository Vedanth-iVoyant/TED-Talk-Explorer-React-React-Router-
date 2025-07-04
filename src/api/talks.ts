export interface Talk {
  id: string;
  title: string;
  speakerId: string;
  description: string;
  tags: string[];
  duration: number;
  thumbnail: string;
  videoUrl: string;
}

export const talks: Talk[] = [
  {
    id: "1",
    title: "The Power of Vulnerability",
    speakerId: "s1",
    description:
      "Brené Brown studies human connection—our ability to empathize, belong, love.",
    tags: ["Psychology", "Connection", "Empathy"],
    duration: 20,
    thumbnail: "https://i3.ytimg.com/vi/embed/iCvmsMzlF7o/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/iCvmsMzlF7o",
  },
  {
    id: "2",
    title: "How Great Leaders Inspire Action",
    speakerId: "s2",
    description:
      "Simon Sinek shares a simple but powerful model for inspirational leadership.",
    tags: ["Leadership", "Motivation", "Business"],
    duration: 18,
    thumbnail: "https://i3.ytimg.com/vi/qp0HIF3SfI4/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/qp0HIF3SfI4",
  },
  {
    id: "3",
    title: "Do Schools Kill Creativity?",
    speakerId: "s3",
    description:
      "Sir Ken Robinson makes an entertaining case for creating an education system that nurtures creativity.",
    tags: ["Education", "Creativity"],
    duration: 19,
    thumbnail: "https://i3.ytimg.com/vi/iG9CE55wbtY/maxresdefault.jpg",
    videoUrl: "https://www.youtube.com/embed/iG9CE55wbtY",
  },
];
