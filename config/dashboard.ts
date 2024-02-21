/**
 * Configuration object for defining the structure and navigation links of a dashboard.
 */
import { DashboardConfig } from "@/types";

// Define the dashboard configuration using the DashboardConfig interface.
export const dashboardConfig: DashboardConfig = {
  // An array representing the main navigation links of the dashboard.
  mainNav: [],
  // An array representing the sidebar navigation links of the dashboard.
  sidebarNav: [
    {
      name: "Admin - Main",
      items: [
        {
          title: "Dashboard",
          href: "/admin/dashboard",
          icon: "dashboard",
        },
        {
          title: "Locations",
          href: "/admin/locations",
          icon: "brand",
        },
        {
          title: "Villages",
          href: "/admin/villages",
          icon: "warning",
        },
        {
          title: "Items",
          href: "/admin/items",
          icon: "product",
        },
      ],
    },
    // {
    //   name: "CMS - Sections",
    //   items: [
    //     {
    //       title: "Brands",
    //       href: "/admin/brands",
    //       icon: "brand",
    //     },
    //   ],
    // },
  ],
};
