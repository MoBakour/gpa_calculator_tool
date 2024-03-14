/**
 * Calculates the GPA of each semester and the CGPA (cumulative)
 * @param {object} content - Content object contains all data of all semesters and all courses
 * @param {Array} sytsem - The grading system structure
 * @returns {object}
 */
export const calculateGpa = (content, system) => {
    // will contain GPA values of each semester
    const semesters = [];
    let totalGrades = 0;
    let totalCredits = 0;

    for (const semester of content) {
        let grades = 0;
        let credits = 0;

        for (const course of semester) {
            // if no course credits, consider 0
            course.credits = parseFloat(course.credits || "0");

            // to scale course grade, multiply by course credits
            grades +=
                system.find((grade) => grade.letter === course.letter)?.grade *
                    course.credits || 0;
            credits += course.credits;
        }

        // add to total
        totalGrades += grades;
        totalCredits += credits;

        // divide total grades by total credits to get semester GPA
        const gpa = grades / credits;
        if (!isNaN(gpa)) {
            semesters.push(gpa);
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
 * @param {number} gpa - Numerical representation of GPA grade
 * @param {object} gradingSystem - Grading system object
 * @returns {string}
 */
export const getColor = (gpa, gradingSystem) => {
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
