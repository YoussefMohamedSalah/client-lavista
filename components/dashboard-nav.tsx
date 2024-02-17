"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarNavGroup } from "@/types";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { motion, AnimatePresence } from "framer-motion";

interface DashboardNavProps {
  items: SidebarNavGroup[];
}

import { useState } from "react";

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname();

  // Initial state: all groups are expanded
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<number, boolean>
  >({});

  const variants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  const toggleCollapse = (index: number) => {
    setCollapsedGroups((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((group, groupIndex) => (
        <div key={groupIndex} className="sidebar-group">
          <div
            className="font-medium cursor-pointer flex justify-between"
            onClick={() => toggleCollapse(groupIndex)}
          >
            {group.name}
            <span>
              {collapsedGroups[groupIndex] ? (
                <Icons.chevronDown className="p-0.5" />
              ) : (
                <Icons.chevronUp className="p-0.5" />
              )}
            </span>
          </div>
          <AnimatePresence>
            {!collapsedGroups[groupIndex] && (
              <motion.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={variants}
                transition={{ duration: 0.2 }}
              >
                {group.items.map((item, itemIndex) => {
                  const Icon = Icons[item.icon || "arrowRight"];
                  return (
                    item.href && (
                      <Link
                        key={itemIndex}
                        href={item.disabled ? "/" : item.href}
                      >
                        <span
                          className={cn(
                            "mt-2 mb-2 group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            path === item.href ? "bg-accent" : "transparent",
                            item.disabled && "cursor-not-allowed opacity-80"
                          )}
                        >
                          <Icon className="mr-2 h-4 w-4" />
                          <span>{item.title}</span>
                        </span>
                      </Link>
                    )
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </nav>
  );
}
