import type { Metadata } from "next";
import VerticalPage from "../components/VerticalPage";

export const metadata: Metadata = {
  title: "Decoração",
  description:
    "Cristais finos, esculturas, espelhos, vasos e mobiliário interno e externo.",
};

export default function Page() {
  return <VerticalPage vertical="decoracao" />;
}
