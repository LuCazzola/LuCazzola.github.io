import type { Experience } from "../../types";
import { asset } from "@/lib/asset";

const experience: Experience = {
  company: "Cybercom",
  role: "3D Artist",
  location: "Malmö - Skåne - Sweden",
  when: { start: "2019-06", end: "2019-07" },
  description: [
    "As part of the Erasmus+ program, I had the opportunity during highschool to do this short internship at Cybercom.",
    "I was part of a startup named 'First & Ten' which was developing an augmented reality game for IOS. I was in charge of creating and improving 3D assets for the game using Blender.",
    "That was my first experience in a professional environment, it was very enriching and I learned a lot about communication.",
  ],
  tags: ["3D modeling", "Blender", "Augmented Reality"],
  companyImage: asset("/media/cybercom/cybercom-place.jpg"),
  logoImage: asset("/media/cybercom/cybercom_logo.jpg"),
};

export default experience;
