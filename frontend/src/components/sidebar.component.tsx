import React, { useState } from "react";
import { useAuth } from "../contexts";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  LogOut,
  UserPen,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      url: "/Schedule",
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
        className="border border-sidebar-border rounded-lg shadow-sm lg:block hidden sm:hidden md:hidden hover:shadow-md transition-shadow duration-200"
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
                    className="flex items-center justify-between py-2 px-2 transition-colors duration-200 hover:pl-2"
                  >
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                      <span className="text-base font-medium">Tasks</span>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
                        isTasksOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </SidebarMenuButton>

                  <AnimatePresence>
                    {isTasksOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="pl-5 mt-1 space-y-1"
                      >
                        {taskItems.map((item, index) => (
                          <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <SidebarMenuButton
                              asChild
                              className="h-8 text-sm transition-all duration-200 hover:pl-2"
                            >
                              <a
                                onClick={() => navigate(item.url)}
                                className="flex items-center gap-3 group"
                              >
                                <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
                                <span className="text-base">{item.title}</span>
                              </a>
                            </SidebarMenuButton>
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </SidebarMenuItem>

                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {isAdmin() && (
                        <a
                          onClick={() => navigate(item.url)}
                          className="flex items-center gap-3 py-2 px-2 transition-all duration-200 hover:bg-gray-100 rounded-md group"
                        >
                          <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
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
                        className="flex items-center gap-3 py-2 px-2 transition-all duration-200 hover:bg-gray-100 rounded-md group"
                      >
                        <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
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

      {/* Mobile Menu with animations */}
      <motion.div 
        className="lg:hidden fixed bottom-0 left-0 w-full bg-white shadow-md border-t border-gray-200"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
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
      </motion.div>
    </div>
  );
};
