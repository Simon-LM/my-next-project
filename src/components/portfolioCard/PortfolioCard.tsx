/** @format */

"use client";

// import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Collapse from "../collapse/Collapse";
import { FaGithub, FaGlobe } from "react-icons/fa";

interface PortfolioCardProps {
	title: string;
	description: {
		short: string;
		detailed: string;
	};
	tags: string[];
	imageUrl: string;
	imageAlt: string;
	links: {
		github: string;
		website?: string;
	};
}

export default function PortfolioCard({
	title,
	description,
	tags,
	imageUrl,
	imageAlt,
	links,
}: PortfolioCardProps) {
	return (
		<article className="portfolio__card">
			<div className="portfolio__card-image">
				<Image
					src={imageUrl}
					alt={imageAlt}
					width={1920}
					height={1300}
					className="portfolio__card-img"
					// sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			<div className="portfolio__card-content">
				<h3 className="portfolio__card-title">{title}</h3>
				<p className="portfolio__card-description">{description.short}</p>

				<div className="portfolio__card-tags">
					{tags.map((tag, index) => (
						<span key={index} className="portfolio__card-tag">
							{tag}
						</span>
					))}
				</div>

				<Collapse title="Plus de détails">
					<div className="portfolio__card-details">{description.detailed}</div>
				</Collapse>

				<div className="portfolio__card-links">
					<Link
						href={links.github}
						className="portfolio__card-link"
						target="_blank"
						rel="noopener noreferrer">
						<FaGithub aria-hidden="true" />
						GitHub
					</Link>
					{links.website && (
						<Link
							href={links.website}
							className="portfolio__card-link"
							target="_blank"
							rel="noopener noreferrer">
							<FaGlobe aria-hidden="true" />
							Site web
						</Link>
					)}
				</div>
			</div>
		</article>
	);
}