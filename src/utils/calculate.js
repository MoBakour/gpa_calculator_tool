/**
 * Calculates the GPA of each semester and the CGPA (cumulative)
 * @param {object} content - Content object contains all data of all semesters and all courses
 * @param {Array} sytsem - The grading system structure
 * @returns {object}
 */
export const calculateGpa = (content, system) => {
    // will contain GPA values of each semester
    const semesters = [];

    for (const semester of content) {
        let totalGrades = 0;
        let totalCredits = 0;

        for (const course of semester) {
            // if no course credits, consider 0
            course.credits = parseFloat(course.credits || "0");

            // to scale course grade, multiply by course credits
            totalGrades +=
                system.find((grade) => grade.letter === course.letter)?.grade *
                    course.credits || 0;
            totalCredits += course.credits;
        }

        // divide total grades by total credits to get semester GPA
        const gpa = totalGrades / totalCredits;
        semesters.push(gpa);
    }

    const sum = semesters.reduce((prev, current) => prev + current, 0);
    const CGPA = sum / semesters.length;

    return {
        semesters,
        CGPA,
    };
};

/**
 * Takes GPA and returns the appropriate gradient color range to visualize the GPA
 * @param {number} gpa - Numerical representation of GPA grade between 0 to 4
 * @returns {string}
 */
export const getColor = (gpa) => {
    if (isNaN(gpa)) return "";

    let color = "";
    if (gpa < 2) {
        color = "from-red-600 to-orange-600";
    } else if (gpa < 2.5) {
        color = "from-orange-600 to-yellow-600";
    } else if (gpa < 3) {
        color = "from-yellow-600 to-lime-600";
    } else if (gpa < 3.5) {
        color = "from-lime-600 to-sky-600";
    } else {
        color = "from-sky-600 to-violet-600";
    }

    return color;
};
