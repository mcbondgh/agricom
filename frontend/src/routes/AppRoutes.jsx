// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate  } from "react-router-dom";
import MainLayout from "@/Layouts/MainLayout";
import Dashboard from "@/Pages/Dashboard/Dashboard";
import Profile from "@/Pages/Profile/Profile";


//
import {Login} from "@/Pages/Login/Login"
//NOTIFICATION
import SmsAndMessages from "@/Pages/Notifications/smsAndMessages/SmsAndMessages";
import AuditAndTrails from "@/Pages/Notifications/auditTrails/AuditAndTrails";
//FARMERS
import ManageFarmer from "@/Pages/Farmers/manageFarmer/ManageFarmer";
import FarmLandDetails from "@/Pages/Farmers/FarmLandDetails/FarmLandDetails";
//CROPS AND YIELD
import FarmActivity from "@/Pages/CropsAndYield/farmActivity/FarmActivity"
import CropsAndYield from "@/Pages/CropsAndYield/manageCropsAndYield/CropsAndYield";
//INCOME AND EXPENSE
import Expenditure from "@/Pages/IncomeAndExpenses/Expenditure/Expenditure"
import Income from "@/Pages/IncomeAndExpenses/Income/Income"
import InsuranceAndClaims from "../Pages/IncomeAndExpenses/InsuranceAndClaims/InsuranceAndClaims"
import Loans from "@/Pages/IncomeAndExpenses/Loans/Loans"
//USERS
import Employees from "@/Pages/Users/Employees/Employees"
import ManageUsers from "@/Pages/Users/ManageUsers/ManageUsers"
import UserLogs from "@/Pages/Users/UserLogs/UserLogs"
//REPORTS
import CropsReport from "@/Pages/Reports/CropsReport/CropsReport"
import FarmersReport from "@/Pages/Reports/FarmersReport/FarmersReport"
import EmployeesReport from "@/Pages/Reports/EmployeesReport/EmployeesReport";
import FinancialReport from "@/Pages/Reports/FinancialReport/FinancialReport"
import FarmLandReport from "@/Pages/Reports/FarmLandReport/FarmLandReport"
import WeatherReport from "@/Pages/Reports/WeatherReport/WeatherReport"
//SETTINGS
import ManageCategories from "@/Pages/SettingsPage/ManageCategories/ManageCategories"
import AccessControl from "@/Pages/SettingsPage/AccessControl/AccessControl"
import SystemParameters from "@/Pages/SettingsPage/SystemParameters/SystemParameters";

//Protected Routes
import { ProtectedRoutes } from "@/routes/ProtectedRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element = {<Login/>} />
    {/* Redirect "/" to "/login" by default */}
    <Route path="/" element={<Navigate to="/login" />} />
      <Route element={<ProtectedRoutes/>}>
        <Route path="/" element={ <MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* NOTIFICATION ROUTES */}
          <Route path="/audit-trails" element={<AuditAndTrails />} />
          <Route path="/sms-messages" element={<SmsAndMessages />} />
          {/* FARMERS ROUTES */}
          <Route path="/manage-farmer" element={<ManageFarmer  />} />
          <Route path="/farmland-details" element={<FarmLandDetails  />} />
          {/* CROPS AND YIELD */}
          <Route path="/manage-crops" element={<CropsAndYield />} />
          <Route path="/farm-activity" element={<FarmActivity />} />
          {/* INCOME AND EXPENSE */}
          <Route path="/expenditure" element={<Expenditure />} />
          <Route path="/income" element={<Income />} />
          <Route path="/insurance-claims" element={<InsuranceAndClaims />} />
          <Route path="/loans" element={<Loans />} />
          {/* USERS */}
          <Route path="/employees" element={<Employees />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/user-logs" element={<UserLogs />} />
          {/* REPORTS */}
          <Route path="/crops-report" element={<CropsReport />} />
          <Route path="/farmers-report" element={<FarmersReport />} />
          <Route path="/employees-report" element={<EmployeesReport />} />
          <Route path="/financial-report" element={<FinancialReport />} />
          <Route path="/farmland-report" element={<FarmLandReport />} />
          <Route path="/weather-report" element={<WeatherReport />} />
          {/* SETTINGS ROUTES */}
          <Route path="/system-params" element={<SystemParameters />} />
          <Route path="/access-control" element={<AccessControl />} />
          <Route path="/manage-categories" element={<ManageCategories />} />
        </Route>
      </Route>
  </Routes>
);
export default AppRoutes;
