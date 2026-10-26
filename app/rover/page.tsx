import type { Metadata } from "next";
import { RobotMarsFullscreen } from "@/components/dom/RobotMarsFullscreen";

export const metadata: Metadata = {
  title: "Mars rover, fullscreen",
};

export default function RoverPage() {
  return <RobotMarsFullscreen />;
}
