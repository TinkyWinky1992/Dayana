import React from "react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from "../ui/navigation-menu"
  

export const Menubar: React.FC = () => {
    return (
        <div className="flex w-full items-center justify-center py-2">
            <NavigationMenu>
                <NavigationMenuList className="flex gap-6">
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <GettingStartedItem />
                        </NavigationMenuContent>
                    
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Your Schedule</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <YourScheduleItem />
                            
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>Your Accout</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <YourAccountItem />
                            
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export const GettingStartedItem: React.FC = () => {
    return (
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <div
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Dayana Scheduler
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      מערכת ניהול משימות דינאמית לכל משתמש עם אפשרות גמישה לשלוט בכל משתמש 
                      <br />
                        כאן ניתן ללמוד על המערכת
                        
                    </p>
                  </div>
                </NavigationMenuLink>
              </li>
    
        </ul>
    )
}

export const YourScheduleItem: React.FC = () => {
    return (
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
                <NavigationMenuLink asChild>
                    <div>
                        <h1>Your Schedule</h1>
                    </div>
                </NavigationMenuLink>
            </li>
        </ul>
    )
}

export const YourAccountItem: React.FC = () => {
    return (
        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            <li className="row-span-3">
                <NavigationMenuLink asChild>    
                    <div>
                        <h1>Your Account</h1>
                    </div>
                </NavigationMenuLink>
            </li>
        </ul>
    )
}

