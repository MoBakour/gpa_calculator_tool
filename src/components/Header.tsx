import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header p-4 flex justify-between items-center flex-col gap-2 sm:flex-row">
			<Link to="/">
				<h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-violet-700">
					GPA Calculator Tool
				</h1>
			</Link>

			<nav>
				<li className="list-none flex gap-6">
					<Link to="/about-gpa" className="hover:underline">
						About GPA
					</Link>
					<Link to="/about-us" className="hover:underline">
						About Us
					</Link>
				</li>
			</nav>
		</header>
	);
};

export default Header;
