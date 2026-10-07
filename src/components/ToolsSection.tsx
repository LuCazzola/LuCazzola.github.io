import { Wrench } from "lucide-react";
import Section from "@/components/Section";
import { asset } from "@/lib/asset";

const ToolsSection = () => {
  const programmingLanguages = ["Python", "C", "C++"];
  const frameworks = ["PyTorch", "OpenCV", "CUDA", "ROS"];
  const otherSoftware = ["Blender"];

  // Map a tool name to the image filename under assets/media/tools
  const getToolImage = (name: string) => {
    const map: Record<string, string> = {
      Python: "Python_logo.jpeg",
      C: "C_logo.png",
      "C++": "C++_logo.svg",
      PyTorch: "PyTorch_logo.svg",
      OpenCV: "OpenCV_logo.png",
      CUDA: "cuda_logo.svg",
      ROS: "ROS_logo.svg",
      Blender: "Blender_logo.svg",
    };
    return map[name] ?? `${name.toLowerCase().replace(/[^a-z0-9]+/gi, "_")}.svg`;
  };

  const groups = [
    { label: "Languages", items: programmingLanguages },
    { label: "Frameworks", items: frameworks },
    { label: "Other software", items: otherSoftware },
  ];

  return (
    <Section id="tools" title="Tools I work with" icon={Wrench}>
      <div className="divide-y divide-border border-t border-border">
        {groups.map((group) => (
          <div key={group.label} className="grid gap-2 py-3 sm:grid-cols-[9rem,1fr] sm:items-center">
            <h3 className="font-sans text-xs font-bold uppercase tracking-wide text-muted-foreground">{group.label}</h3>
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {group.items.map((name) => (
                <li key={name} className="flex items-center gap-2">
                  <img src={asset(`/media/tools/${getToolImage(name)}`)} alt="" className="h-5 w-5 object-contain" />
                  <span className="text-sm font-semibold">{name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ToolsSection;
