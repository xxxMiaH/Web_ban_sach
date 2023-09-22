import { Link, NavLink, useNavigate } from "react-router-dom";
import { AiOutlineLineChart } from "react-icons/ai";
import { BsFillJournalBookmarkFill, BsCartCheck } from "react-icons/bs";
import { useAdminStore } from "../../store/adminStore";

const NavbarMenu = [
  {
    name: "Thống kê doanh thu",
    path: "/admin/thong-ke-doanh-thu",
    icon: <AiOutlineLineChart />,
  },
  {
    name: "Quản lý sản phẩm",
    path: "/admin/quan-ly-san-pham",
    icon: <BsFillJournalBookmarkFill />,
  },
  {
    name: "Quản lý đơn hàng",
    path: "/admin/quan-ly-don-hang",
    icon: <BsCartCheck />,
  },
];

const baseClasses =
  "flex items-center px-4 py-4 text-whiteSoft hover:text-whiteSoft hover:bg-darkStroke hover:duration-300 hover:ease-in-out";

const NavbarAdmin = () => {
  const navigate = useNavigate();
  const { adminLogout } = useAdminStore();

  const handleLogout = () => {
    adminLogout();
    navigate("/login");
  };

  return (
    <div className="w-full h-full">
      <Link to="/admin" className="block">
        <span className="text-whiteSoft text-3xl font-semibold text-center block py-4">
          ABook
        </span>
      </Link>
      <div className="">
        {NavbarMenu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? `${baseClasses} bg-darkStroke text-whiteSoft border-l-2 border-secondary`
                : `${baseClasses} `
            }
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>
      <button className="button ml-4 mt-10" onClick={handleLogout}>
        Đăng xuất
      </button>
    </div>
  );
};

export default NavbarAdmin;
