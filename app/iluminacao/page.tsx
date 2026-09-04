import type { Metadata } from "next";
import VerticalPage from "../components/VerticalPage";

export const metadata: Metadata = {
  title: "Iluminação",
  description:
    "Lustres de cristal, pendentes, arandelas, plafons e luminárias técnicas.",
};

export default function Page() {
  return <VerticalPage vertical="iluminacao" />;
}
