"use client";
import { cn } from "@/lib/utils";
import { FC } from "react";
interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
	html?: string;
}

export const RichText: FC<RichTextProps> = ({ html, className, ...props }) => {
	return (
		<div
			dangerouslySetInnerHTML={{ __html: html || "" }}
			className={cn("prose max-w-full h-full", className)}
			{...props}
		/>
	);
};
