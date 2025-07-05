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
    thumbnail: "https://i.ytimg.com/vi/iCvmsMzlF7o/maxresdefault.jpg",
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
    thumbnail:
      "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/04916ee6e81065c8333e6546184af512eee37bbe_2880x1620.jpg?u%5Br%5D=2&u%5Bs%5D=0.5&u%5Ba%5D=0.8&u%5Bt%5D=0.03&quality=82w=640",
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
    thumbnail:
      "https://pi.tedcdn.com/r/pe.tedcdn.com/images/ted/6b6eb940bceab359ca676a9b486aae475c1df883_2880x1620.jpg?u%5Br%5D=2&u%5Bs%5D=0.5&u%5Ba%5D=0.8&u%5Bt%5D=0.03&quality=80&w=3840",
    videoUrl: "https://www.youtube.com/embed/iG9CE55wbtY",
  },
];
