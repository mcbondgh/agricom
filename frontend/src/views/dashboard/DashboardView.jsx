import React from "react";
import Layout from "../../layout/MainLayout";
import { Sidebar } from "flowbite-react";

export default function DashboardView() {
    return (
        <div>
            <Layout />
            {/* Main Content Area */}
            <div className="flex-1 overflow-auto">
                {/* Top Header */}
            <header className="bg-white shadow-sm">
                <div className="flex justify-between items-center px-6 py-4">
                <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
                <div className="flex items-center gap-4">
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    Add New Crop
                </button>
                </div>
                </div>
            </header>
            </div>
            {/* Main Content */}
            <main className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Quick Stats Cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Active Crops</h3>
                <p className="text-3xl font-bold text-green-600">24</p>
                <p className="text-gray-600">Across 6 fields</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Weather</h3>
                <p className="text-3xl font-bold text-blue-600">24°C</p>
                <p className="text-gray-600">Partly Cloudy</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Tasks Due</h3>
                <p className="text-3xl font-bold text-orange-600">8</p>
                <p className="text-gray-600">High Priority</p>
                </div>
            </div>

            {/* Content Placeholder */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activities</h3>
                <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-center justify-between border-b border-gray-200 pb-4">
                    <div>
                        <p className="font-medium text-gray-800">Maize Field Irrigation Completed</p>
                        <p className="text-sm text-gray-600">2 hours ago</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Completed
                    </span>
                    </div>
                ))}
                </div>
            </div>
            </main>
        </div>
    );
}