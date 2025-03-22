import React from 'react';
import { useAuth } from '../contexts';
import { useNavigate } from 'react-router-dom';
import { Calendar, LogOut, UserPen } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../components/ui/sidebar";

export const SideBar = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const Usersitems = [
    {
      title: "Schedule",
      url: "/",
      icon: Calendar,
    },
    {
      title: "Sign Out",
      url: "/login",
      icon: LogOut,
    },
  ];
  const adminItems = [
    {
      title: "Users",
      url: "/Users",
      icon: UserPen,
    },
  ];

  return (
    <div className="lg:w-64 w-full">
      <Sidebar
        side="left"
        variant="floating"
        className="border border-sidebar-border rounded-lg shadow-sm lg:block hidden sm:hidden md:hidden"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {isAdmin() && (
                        <a onClick={() => navigate(item.url)} className="flex items-center gap-2">
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
                {Usersitems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a onClick={() => navigate(item.url)} className="flex items-center gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Mobile Menu */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200">
        <nav className="flex justify-around py-2">
          {Usersitems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className="flex flex-col items-center text-gray-700"
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.title}</span>
            </button>
          ))}
          {isAdmin() &&
            adminItems.map((item) => (
              <button
                key={item.title}
                onClick={() => navigate(item.url)}
                className="flex flex-col items-center text-gray-700"
              >
                <item.icon className="w-6 h-6" />
                <span className="text-xs">{item.title}</span>
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
};