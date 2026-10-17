import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console & Lead Management | OVI FARMS",
  description: "Secure administrative management console for OVI FARMS managed farmland estates.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
