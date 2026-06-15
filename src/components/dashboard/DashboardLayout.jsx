// import type {ComponentType, SVGProps} from "react";

import {
  LayoutSideContent,
  Bell,
  Envelope,
  Briefcase,
  Gear,
  House,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer, } from "@heroui/react";
import Link from "next/link";

export function DashBoardSidebar() {
  const navItems = [
    { icon: House, href: "/auth/dashboard/recuter", label: "Home" },
    { icon: Magnifier, href: "/auth/dashboard/recuter/jobs", label: "Jobs" },
    { icon: Bell, href: "/auth/dashboard/recuter/jobs/new", label: "Creat jobs" },
    { icon: Bell, href: "/auth/dashboard/recuter/company", label: "companyName" },
    { icon: Envelope, href: "messages", label: "Messages" },
    { icon: Person, href: "profile", label: "Profile" },
    { icon: Gear, href: "setting", label: "Settings" },
  ];
  const navLink = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          type="button"
        >
          <item.icon className="size-5 text-muted" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navLink}
      </aside>
      <Drawer>
        <Button className={"lg:hidden"} variant="secondary">
          {/* <Bars /> */}
          {/* LayoutSideContent */}
          <LayoutSideContent></LayoutSideContent>
          Menu
        </Button>
        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />
              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>
              <Drawer.Body>{navLink}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
}
