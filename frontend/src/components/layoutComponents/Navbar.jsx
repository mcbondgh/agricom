"use client";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { IoLeafOutline } from "react-icons/io5";
import UserImg from "/user.jpg"
import {RiProfileLine, RiLogoutCircleLine,RiNotification2Line} from "react-icons/ri"
import { BreadCrumpComponent } from "../ui/Breadcrumb";
import CustomTheme from "../../themes/customThemes";
import { DrawerComponent } from "../ui/Drawer";

export function NavbarComponent() {
  const User = {
    name: "Richard Owens",
    email: "richard12@gmail.com"
  }
  return (
    <Navbar fluid className="shadow-lg top-0 z-50 sticky" theme={CustomTheme.themeNavbar}>
      <div className="flex items-center">
      <DrawerComponent/>
      <Navbar.Brand href="/">
        <IoLeafOutline className="hidden md:block mr-4 w-7 h-7"/>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Agricom</span>
      </Navbar.Brand>
      <BreadCrumpComponent />
      </div>
      <div className="flex items-center gap-2 md:order-2">
        <div className="flex items-center gap-2">
        <p className="md:block md:text-xl dark:text-white font-semibold hidden">{User.name}</p>
        <Dropdown arrowIcon={true} inline label={<Avatar alt="User settings" img={UserImg} rounded />}>
          <Dropdown.Item href="/profile" icon={RiProfileLine} >User Profile</Dropdown.Item>
          <Dropdown.Item href="/sms-messages" icon={RiNotification2Line}>Notification</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={RiLogoutCircleLine}>Sign out</Dropdown.Item>
        </Dropdown>
        </div>
      </div>
    </Navbar>
  );
}
