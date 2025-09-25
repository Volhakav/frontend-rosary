// Layout.jsx
import { Outlet } from "react-router-dom";
import MenuList from "./MenuList";

export default function Layout() {
  return (
    <div className="container">
        <div>
            <nav className="sidebar">
                <MenuList />
            </nav>
        </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
