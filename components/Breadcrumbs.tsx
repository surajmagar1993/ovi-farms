"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const defaultItems: BreadcrumbItem[] = [
    { label: "OVI FARMS Home", href: "/" },
    { label: "Master Layout", href: "#masterplan" },
    { label: "Managed Farming", href: "#farming" },
    { label: "Amenities", href: "#amenities" },
    { label: "Pricing & Inclusions", href: "#pricing" },
  ];

  const breadcrumbList = items || defaultItems;

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: "1rem 0",
        backgroundColor: "rgba(11, 42, 34, 0.4)",
        borderBottom: "1px solid rgba(212, 175, 55, 0.15)",
      }}
    >
      <div className="container-constrained">
        <ol
          style={{
            listStyle: "none",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.5rem",
            fontSize: "0.82rem",
            color: "rgba(255, 255, 255, 0.65)",
          }}
        >
          <li style={{ display: "flex", alignItems: "center" }}>
            <Link
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                color: "#D4AF37",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              <Home size={14} />
              <span>Home</span>
            </Link>
          </li>

          {breadcrumbList.slice(1).map((item, idx) => {
            const isLast = idx === breadcrumbList.length - 2;
            return (
              <li
                key={idx}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <ChevronRight size={13} color="rgba(255,255,255,0.4)" />
                {isLast ? (
                  <span
                    aria-current="page"
                    style={{ color: "#FFFFFF", fontWeight: 600 }}
                  >
                    {item.label}
                  </span>
                ) : (
                  <a
                    href={item.href}
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    className="breadcrumb-link"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <style jsx>{`
        .breadcrumb-link:hover {
          color: #d4af37 !important;
          text-decoration: underline !important;
        }
      `}</style>
    </nav>
  );
}
