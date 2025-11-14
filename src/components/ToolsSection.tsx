import { Card, CardContent } from "@/components/ui/card";
import { Code2, Wrench } from "lucide-react";
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

  const ToolTag = ({ name }: { name: string }) => {
    const file = getToolImage(name);
    return (
      <div
        role="listitem"
        className="flex items-center gap-3 px-4 py-2 bg-secondary rounded-lg hover:shadow-md transition-shadow cursor-default"
      >
        <img src={asset(`/media/tools/${file}`)} alt={`${name} logo`} className="w-6 h-6 md:w-7 md:h-7 object-contain" />
        <span className="font-medium text-sm md:text-base">{name}</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Wrench className="h-8 w-8 text-primary" />
            <h2 className="font-serif text-3xl md:text-4xl text-primary">
              Tools I work with
            </h2>
          </div>
          
          <div className="space-y-8">
            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold text-lg">Programming languages</h3>
                </div>
                <div className="flex flex-wrap gap-4" role="list">
                  {programmingLanguages.map((name) => (
                    <ToolTag key={name} name={name} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Frameworks</h3>
                <div className="flex flex-wrap gap-4" role="list">
                  {frameworks.map((name) => (
                    <ToolTag key={name} name={name} />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Other softwares</h3>
                <div className="flex flex-wrap gap-4" role="list">
                  {otherSoftware.map((name) => (
                    <ToolTag key={name} name={name} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
