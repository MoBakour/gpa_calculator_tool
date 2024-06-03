export interface Grade {
	id: string;
	name: string;
	credits: string;
	letter: string;
}

export interface Semester {
	active: boolean;
	content: Grade[];
}

export type GradingSystem = {
	letter: string;
	grade: number;
}[];

export interface GradingSystems {
	[key: string]: GradingSystem;
}
