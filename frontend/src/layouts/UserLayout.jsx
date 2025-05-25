import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";


function UserLayout() {
    return (
        <div className="flex justify-center">
            <Sidebar paths={['/', 'view-teacher-courses']} panelName={'teacher'} />
            <main className="flex-1 sm:ml-64">
                <Outlet />
            </main>
        </div>
    )
}

export default UserLayout


