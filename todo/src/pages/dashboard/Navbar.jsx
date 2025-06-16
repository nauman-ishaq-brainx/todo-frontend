import { useNavigate } from "react-router-dom";

export const Navbar = ()=> {

    const navigate = useNavigate();
    const handleLogout = () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/auth/login");
        };
    
        const handleUpdatePassword = () => {
            navigate("/auth/update-password");
        };
        return (<div>
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
            <span className="navbar-brand">Todo Dashboard</span>
            <div className="d-flex align-items-center ms-auto">
                <div className="dropdown me-3">
                    <button
                        className="btn btn-light btn-sm dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                    >
                        Settings
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                            <button className="dropdown-item" onClick={handleUpdatePassword}>
                                Update Password
                            </button>
                        </li>
                    </ul>
                </div>
                <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </div>
    </nav>


</div>)

}
