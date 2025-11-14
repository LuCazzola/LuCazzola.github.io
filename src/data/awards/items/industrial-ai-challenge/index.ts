import type { Award } from "../../types";
import { asset } from "@/lib/asset";

const award: Award = {
  title: "2024 Industrial AI Challenge | 1st Place 🥇",
  role: "Team Leader - Developer",
  location: "Trento, Italy",
  when: { start: "2024-09", end: "2024-12" },
  description: [
    "Achieved first place in the highly competitive 2024 Industrial AI Challenge, an initiative aimed at solving real-world industry challenges through innovative AI-driven solutions. Over the course of 11 weeks, our team developed a multi-stage optimization scheduling solution utilizing a variety of techniques such as Integer Constraint Programming and Genetic Search to address complex scheduling problems.",
    "As part of the challenge, we had the privilege of collaborating with LeMur, gaining hands-on experience with industry-specific constraints and objectives. This collaboration emphasized the importance of effectively understanding and addressing client needs, bridging the gap between technical solutions and real-world requirements. The competition provided an exceptional opportunity to work on practical problems under real-world conditions, requiring a blend of technical expertise, teamwork, and creativity.",
    "The Industrial AI Challenge not only garners the attention of local industries but also attracts major players such as Terna (our competitor this year), Pirelli, and Melinda in past editions. This makes the competition a truly unique and elite opportunity for Italian AI students to engage with cutting-edge industrial challenges.",
  ],
  tags: ["Job Shop Problem (JSP)", "Genetic optimization", "Scheduling", "Challenge"],
  image: asset("/media/AI_challenge/Industrial_AI_challenge_logo.png"),
  featured: true,
};

export default award;
