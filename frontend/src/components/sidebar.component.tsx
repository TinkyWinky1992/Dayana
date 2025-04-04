import React, { useState } from "react";
import { useAuth } from "../contexts";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  LogOut,
  UserPen,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

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
export const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const [isTasksOpen, setIsTasksOpen] = useState(false);

  const taskItems = [
    {
      title: "Schedule",
      url: "/",
      icon: Calendar,
    },
    {
      title: "Daily Tasks",
      url: "/usertasks",
      icon: Calendar,
    },
  ];

  const Usersitems = [
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
        className="border border-sidebar-border rounded-lg shadow-sm lg:block hidden sm:hidden md:hidden "
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="text-base font-medium">
              Application
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    onClick={() => setIsTasksOpen(!isTasksOpen)}
                    className="flex items-center justify-between py-2 px-2"
                  >
                    <div className="flex items-center gap-3 hover:cursor-pointer">
                      <Calendar className="h-5 w-5" />
                      <span className="text-base font-medium">Tasks</span>
                    </div>
                    {isTasksOpen ? (
                      <ChevronDown className="h-5 w-5 hover:cursor-pointer" />
                    ) : (
                      <ChevronRight className="h-5 w-5 hover:cursor-pointer" />
                    )}
                  </SidebarMenuButton>

                  {isTasksOpen && (
                    <div className="pl-5 mt-1 space-y-1 ">
                      {taskItems.map((item) => (
                        <SidebarMenuButton
                          key={item.title}
                          asChild
                          className="h-8 text-sm hover:cursor-pointer"
                        >
                          <a
                            onClick={() => navigate(item.url)}
                            className="flex items-center gap-3"
                          >
                            <item.icon className="h-5 w-5" />
                            <span className="text-base">{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>

                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {isAdmin() && (
                        <a
                          onClick={() => navigate(item.url)}
                          className="flex items-center gap-3 hover:cursor-pointer py-2 px-2"
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="text-base font-medium">
                            {item.title}
                          </span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {Usersitems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a
                        onClick={() => navigate(item.url)}
                        className="flex items-center gap-3 hover:cursor-pointer py-2 px-2"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base font-medium">
                          {item.title}
                        </span>
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
          {taskItems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className="flex flex-col items-center text-gray-700"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs">{item.title}</span>
            </button>
          ))}
          {Usersitems.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.url)}
              className="flex flex-col items-center text-gray-700"
            >
              <item.icon className="w-5 h-5" />
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
                <item.icon className="w-5 h-5" />
                <span className="text-xs">{item.title}</span>
              </button>
            ))}
        </nav>
      </div>
    </div>
  );
};
