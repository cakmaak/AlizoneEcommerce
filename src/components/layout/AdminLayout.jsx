import { Outlet, Link } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-3">
          <Link to="/admin" className="block hover:text-emerald-400">
            Dashboard
          </Link>
          <Link to="/admin/references" className="block hover:text-emerald-400">
            Referanslar
          </Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-8">
        🔥🔥🔥
        <Outlet />
        🔥🔥🔥
      </main>

    </div>
  );
};

export default AdminLayout;
