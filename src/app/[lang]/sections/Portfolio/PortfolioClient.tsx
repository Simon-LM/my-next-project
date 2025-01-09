/** @format */

"use client";

import { motion } from "framer-motion";
import PortfolioCard from "../../../../components/portfolioCard/PortfolioCard";

interface PortfolioProps {
	dictionary: {
		title: string;
		subtitle: string;
		projects: {
			argentBank: {
				title: string;
				description: {
					short: string;
					detailed: string;
				};
				tags: string[];
				imageAlt: string;
				links: {
					github: string;
					website?: string;
				};
			};
			ninaCarducci: {
				title: string;
				description: {
					short: string;
					detailed: string;
				};
				tags: string[];
				imageAlt: string;
				links: {
					github: string;
					website?: string;
				};
			};
		};
	};
}

export default function PortfolioClient({ dictionary }: PortfolioProps) {
	return (
		<motion.section id="portfolio" className="portfolio">
			<div className="portfolio__container">
				<h2 className="portfolio__title">{dictionary.title}</h2>
				{/* <p className="portfolio__subtitle">{dictionary.subtitle}</p> */}

				<div className="portfolio__grid">
					<PortfolioCard
						title={dictionary.projects.argentBank.title}
						description={dictionary.projects.argentBank.description}
						tags={dictionary.projects.argentBank.tags}
						imageUrl="/Portfolios/P11_ArgentBank/ArgentBank_01-1920.png"
						imageAlt={dictionary.projects.argentBank.imageAlt}
						links={dictionary.projects.argentBank.links}
					/>
					<PortfolioCard
						title={dictionary.projects.ninaCarducci.title}
						description={dictionary.projects.ninaCarducci.description}
						tags={dictionary.projects.ninaCarducci.tags}
						imageUrl="/Portfolios/P9_Nina/Nina-Lighthouse_01.png"
						imageAlt={dictionary.projects.ninaCarducci.imageAlt}
						links={dictionary.projects.ninaCarducci.links}
					/>
				</div>
			</div>
		</motion.section>
	);
}
