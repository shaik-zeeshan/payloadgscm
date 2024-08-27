import React from "react";
import "./globals.scss";
import { Footer } from "@/components/footer";

/* Our app sits here to not cause any conflicts with payload's root layout  */
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
};

export default Layout;
