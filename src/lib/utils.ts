import { type ClassValue, clsx } from "clsx";
import { Metadata } from "next";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetaData({
  title = "talentstark",
  description = "HR & Recruiting Lösungen",
  image = "/placeholder.png",
  icons = "/favicon.ico",
  noIndex = true,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@danielkohout",
    },
    icons,
    metadataBase: new URL("https://app.talentstark.de"),
    themeColor: "#fff",
    ...(noIndex && {
      index: false,
      follow: false,
    }),
  };
}
