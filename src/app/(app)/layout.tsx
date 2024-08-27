import React from "react";
import "./globals.scss";
import { ScrollToTopButton } from "@/components/scroll-top";

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html>
			<body>
				{children}
				<ScrollToTopButton />
			</body>
		</html>
	);
};

export default Layout;
