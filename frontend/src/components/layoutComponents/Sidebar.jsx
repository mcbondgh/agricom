import PropTypes from "prop-types";
import { Sidebar } from "flowbite-react";
import { HiChartPie, HiBell, HiUser,HiMail, HiOutlineExclamationCircle} from "react-icons/hi";
import { AiOutlineAudit } from "react-icons/ai";
import { RiLandscapeFill } from "react-icons/ri";
import { TbListDetails, TbActivity,TbMoneybag,TbUsersPlus,TbLogs,TbReport, TbReportMoney,TbCategoryPlus  } from "react-icons/tb";
import { GiFarmer, GiFruitTree, GiCash, GiSettingsKnobs,GiTreeBranch, GiMasterOfArms} from "react-icons/gi"
import { SiExpensify } from "react-icons/si";
import { FaBoxes,FaHandHoldingUsd ,FaPeopleCarry, FaCloudSunRain } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { MdOutlineManageAccounts,MdAccessibility } from "react-icons/md";
import { PiFarm } from "react-icons/pi";
import { GrSystem } from "react-icons/gr";
import { useState } from "react";
import { motion } from "framer-motion";
import CustomTheme from "../../themes/customThemes";
import { AlertWithResponse } from "@/utils/Alerts";
import { useNavigate } from 'react-router-dom';

export function SidebarComponent({menuIsOpen}) {
 
  const [isHovered, setIsHovered] = useState(false)
  const [openCollapse, setOpenCollapse] = useState(null); // Track open collapse section
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    if (menuIsOpen) {
      setIsHovered(false);
    }else {
      setIsHovered(true);
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpenCollapse(null); // Collapse all items on mouse leave
  };
  const handleCollapseClick = (key) => {
    setOpenCollapse((prevKey) => (prevKey === key ? null : key));
  };

  const handleLogout = () => {
    AlertWithResponse(
      "Logout", 
      "Are sure you want to logout?", 
      //function to run after user confirms to logout
      ()=> {
        console.log("Yes")
        navigate("/login")
      })
  }

  return (
    <motion.div
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    animate = {{width: isHovered || menuIsOpen  ? "16rem" : "4rem"}}
    transition={{duration: 0.3, ease: "easeInOut"}}
    className= {`fixed h-fit md:h-screen bg-green-700 md:shadow-xl ${menuIsOpen ? `ml-[0.5rem]`: `ml-[-6rem]`} md:ml-0  z-40 md:flex flex-col overflow-hidden overflow-y-auto`}>
      <Sidebar aria-label="Sidebar with multi-level dropdown example " theme={CustomTheme.themeSidebar} >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={HiChartPie}>
            {isHovered || menuIsOpen ? "Dashboard": undefined}
          </Sidebar.Item>
          <Sidebar.Collapse open={openCollapse === 'notification'} onClick={() => handleCollapseClick('notification')} icon={HiBell} label={isHovered || menuIsOpen ? "Notification" : undefined}>
            <Sidebar.Item icon = {(isHovered || menuIsOpen) && AiOutlineAudit} href="/audit-trails">{isHovered || menuIsOpen ? "Audit Trails" : undefined}</Sidebar.Item>
            <Sidebar.Item icon = {(isHovered || menuIsOpen) && HiMail} href="/sms-messages">{isHovered || menuIsOpen ? "SMS & Messages" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={GiFarmer} label={isHovered || menuIsOpen ? "Farmers" : undefined} 
          open={openCollapse === 'farmers'} 
          onClick={() => handleCollapseClick('farmers')}>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && TbListDetails} href="/manage-farmer">{isHovered || menuIsOpen ? "Manage Farmer" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && RiLandscapeFill} href="/farmland-details">{isHovered || menuIsOpen ? "Farmland Details" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={GiFruitTree} label={isHovered || menuIsOpen ? "Crops & Yield" : undefined}
          open={openCollapse === 'crops'} 
          onClick={() => handleCollapseClick('crops')}>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && FaBoxes} href="/manage-crops">{isHovered || menuIsOpen ? "Crop Yield" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && TbActivity} href="/farm-activity">{isHovered || menuIsOpen ? "Farm Activity" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={GiCash} label={isHovered || menuIsOpen ? "Income & Exp" : undefined}
          open={openCollapse === 'income'} 
          onClick={() => handleCollapseClick('income')}>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && SiExpensify} href="/expenditure">{isHovered || menuIsOpen ? "Expenditure" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && TbMoneybag} href="/income">{isHovered || menuIsOpen ? "Income" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && FaHandHoldingUsd} href="/loans">{isHovered || menuIsOpen ? "Loans" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && RiSecurePaymentLine} href="/insurance-claims">{isHovered || menuIsOpen ? "Insurance & Claims" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={HiUser} label={isHovered || menuIsOpen ? "Users": undefined}
          open={openCollapse === 'users'} 
          onClick={() => handleCollapseClick('users')}>
          <Sidebar.Item  icon = {(isHovered || menuIsOpen) && TbUsersPlus} href="/employees">{isHovered || menuIsOpen ? "Employees" : undefined}</Sidebar.Item>
          <Sidebar.Item  icon = {(isHovered || menuIsOpen) && MdOutlineManageAccounts} href="/manage-users">{isHovered || menuIsOpen ? "User Management" : undefined}</Sidebar.Item>
          <Sidebar.Item  icon = {(isHovered || menuIsOpen) && TbLogs} href="/user-logs">{isHovered || menuIsOpen ? "User Logs" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={TbReport} label={isHovered || menuIsOpen ? "Reports" : undefined}
          open={openCollapse === 'reports'} 
          onClick={() => handleCollapseClick('reports')}>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && TbReportMoney} href="/financial-report">{isHovered || menuIsOpen ? "Financial" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && GiTreeBranch} href="/crops-report">{isHovered || menuIsOpen ? "Crops" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && GiMasterOfArms} href="/farmers-report">{isHovered || menuIsOpen ? "Farmers" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && PiFarm} href="/farmland-report">{isHovered || menuIsOpen ? "Farm Lands" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && FaPeopleCarry} href="/employees-report">{isHovered || menuIsOpen ? "Employees" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && FaCloudSunRain} href="/weather-report">{isHovered || menuIsOpen ? "Weather" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          <Sidebar.Collapse icon={GiSettingsKnobs} label={isHovered || menuIsOpen ? "Settings" : undefined}
          open={openCollapse === 'settings'} 
          onClick={() => handleCollapseClick('settings')}>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && TbCategoryPlus } href="/manage-categories">{isHovered || menuIsOpen ? "Manage Categories" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && MdAccessibility } href="/access-control">{isHovered || menuIsOpen ? "Access Control" : undefined}</Sidebar.Item>
          <Sidebar.Item icon = {(isHovered || menuIsOpen) && GrSystem } href="/system-params">{isHovered || menuIsOpen ? "System Parameters" : undefined}</Sidebar.Item>
          </Sidebar.Collapse>
          {/* Logout button */}
          {/* <Alert triggerBtnText = "Logout" btnType={2} btnIcon={RiLogoutCircleLine}
          triggerIcon = {<HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />}
          message = "Are you sure you want to sign out?"
          isHovered = {isHovered || menuIsOpen }/> */}
          <Sidebar.Item onClick = {handleLogout} className = "cursor-pointer" icon = {(isHovered || menuIsOpen) && HiOutlineExclamationCircle }>{isHovered || menuIsOpen ? "Logout" : undefined}</Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
    </motion.div>
  );
}

//SETTING THE PROPERTIES DATA TYPES
SidebarComponent.propTypes = {
  menuIsOpen: PropTypes.bool,
};