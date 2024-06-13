const AboutGPA = () => {
    const pClasses = "px-4 py-5";

    return (
        <div>
            <article className="m-auto my-20 w-5/6 md:w-2/3 lg:w-1/2">
                <h1 className="font-bold text-3xl">What is GPA?</h1>
                <p className={pClasses}>
                    GPA, or Grade Point Average, is a widely used metric in
                    educational systems around the world. It serves as a single,
                    numerical indicator of a student's academic performance
                    across multiple courses. But what exactly is it, and how
                    does it work?
                </p>
                <p className={pClasses}>
                    Think of GPA as an average, but not of simple numbers.
                    Instead, it averages out your letter grades in different
                    courses, assigning them point values based on their
                    achievement level. Typically, a 4.0 scale is used, where A
                    translates to 4 points, B to 3, C to 2, D to 1, and F to 0.
                    Some systems use weighted scales, giving extra weight to
                    honors or advanced courses.
                </p>
                <p className={pClasses}>
                    The primary purpose of GPA is to provide a standardized
                    measure of academic achievement. This allows for easy
                    comparison between students, even those taking different
                    sets of courses. Universities use GPA to assess applicants'
                    academic readiness and potential for success in their
                    programs. Similarly, high schools and other institutions
                    utilize GPA for internal evaluations, scholarship
                    eligibility, and even graduation requirements.
                </p>
                <p className={pClasses}>
                    Calculating your GPA is straightforward. First, convert each
                    letter grade to its corresponding point value. Then,
                    multiply each point value by the number of credits
                    associated with that course. Finally, add up these weighted
                    values for all your courses and divide by the total number
                    of credits earned. This will give you your overall GPA.
                </p>
                <p className={pClasses}>
                    It's important to remember that GPA is just one snapshot of
                    your academic performance. It doesn't capture factors like
                    effort, improvement over time, or specific strengths and
                    weaknesses in different subjects. However, understanding how
                    GPA is calculated and used can help you make informed
                    decisions about your studies and track your progress towards
                    your academic goals.
                </p>
            </article>
        </div>
    );
};

export default AboutGPA;
