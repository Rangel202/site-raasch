import type { Metadata } from "next";
import VerticalPage from "../components/VerticalPage";

export const metadata: Metadata = {
  title: "Jóias",
  description:
    "Alianças, anéis, brincos, colares e pulseiras selecionados pela Raasch desde 1989.",
};

export default function Page() {
  return <VerticalPage vertical="joias" />;
}
