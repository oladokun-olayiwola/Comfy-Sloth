import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
import { IconType } from "react-icons";

export interface Service {
  id: number;
  icon: IconType;
  title: string;
  text: string;
}

export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "about",
    url: "/about",
  },
  {
    id: 3,
    text: "products",
    url: "/products",
  },
];

export const services: Service[] = [
  {
    id: 1,
    icon: GiCompass,
    title: "mission",
    text: "At Comfy Sloth, our mission is to craft custom furniture that combines style and functionality, ensuring every piece enhances the comfort of your home.",
  },
  {
    id: 2,
    icon: GiDiamondHard,
    title: "vision",
    text: "Our vision is to redefine the way people experience furniture, creating timeless designs that resonate with modern living while preserving sustainability.",
  },
  {
    id: 3,
    icon: GiStabbedNote,
    title: "history",
    text: "Founded with a passion for quality craftsmanship, Comfy Sloth has grown into a trusted brand for personalized furniture, serving countless happy customers.",
  },
];

export const products_url =
  "https://comfy-sloth-api-1gkr.onrender.com/api/products";

export const single_product_url = `https://comfy-sloth-api-1gkr.onrender.com/api/products/`;
// export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
