import { GradingSystem, Semester } from "../types";

/**
 * Calculates the GPA of each semester and the CGPA (cumulative)
 */
export const calculateGpa = (content: Semester[], system: GradingSystem) => {
	// will contain GPA values of each semester
	const semesters = [];
	let totalGrades = 0;
	let totalCredits = 0;

	for (const semester of content) {
		let grades = 0;
		let credits = 0;

		for (const course of semester.content) {
			// if no course credits, consider 0
			let courseCredits = parseFloat(course.credits || "0");

			// to scale course grade, multiply by course credits
			grades +=
				(system.find((grade) => grade.letter === course.letter)
					?.grade ?? 0) * courseCredits;

			credits += courseCredits;
		}

		// add to total
		if (semester.active) {
			totalGrades += grades;
			totalCredits += credits;
		}

		// divide total grades by total credits to get semester GPA
		const gpa = grades / credits;
		if (!isNaN(gpa)) {
			semesters.push(gpa);
		} else {
			semesters.push(undefined);
		}
	}

	// calculate CGPA using total values
	const CGPA = totalGrades / totalCredits;

	return {
		semesters,
		CGPA,
	};
};

/**
 * Takes GPA and returns the appropriate gradient color range to visualize the GPA
 */
export const getColor = (gpa: number, gradingSystem: GradingSystem) => {
	if (isNaN(gpa)) return "";

	// calculate highest numerical grade
	const highest = Math.max(...gradingSystem.map((sys) => sys.grade));
	const difference = highest / 8;

	let color = "";
	if (gpa >= highest - difference) {
		color = "from-sky-600 to-violet-600";
	} else if (gpa >= highest - difference * 2) {
		color = "from-lime-600 to-sky-600";
	} else if (gpa >= highest - difference * 3) {
		color = "from-yellow-600 to-lime-600";
	} else if (gpa >= highest - difference * 4) {
		color = "from-orange-600 to-yellow-600";
	} else {
		color = "from-red-600 to-orange-600";
	}

	return color;
};
