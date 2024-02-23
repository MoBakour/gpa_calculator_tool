import Header from "../components/Header";
import { Blobs } from "../components/Blobs";

const AboutUs = () => {
    const pClasses = "px-4 py-5";

    return (
        <div>
            <Header />
            <Blobs />
            <article className="m-auto my-20 flex flex-col gap-5 w-5/6 md:w-2/3 lg:w-1/2">
                <section>
                    <h1 className="font-bold text-3xl">Who created this?</h1>
                    <p className={pClasses}>
                        Hi! I am{" "}
                        <a
                            href="https://linktr.ee/swordax"
                            className="font-bold transition hover:underline"
                        >
                            Swordax
                        </a>{" "}
                        <span className="text-gray-400 opacity-50 text-sm">
                            (nickname)
                        </span>
                        . A software engineering student who always worries
                        about his GPA :)
                    </p>

                    <p className={pClasses}>
                        I always calculate my expected GPA before final results.
                        Plently of tools already exist to do that. But they all
                        lack something, the ability to preserve your
                        calculations for later.
                    </p>

                    <p className={pClasses}>
                        It may sound like a silly insignificant thing. But I do
                        it a lot, I visit those GPA calculation tools the whole
                        time, and I always have to re-enter all my grades all
                        over again just to see what I can change to improve my
                        GPA, or to reassure myself about my grades one more
                        time.
                    </p>

                    <p className={pClasses}>
                        That's why I created this tool. A tool with clean and
                        easy-to-use design that allows you to enter your grades
                        and come back for them later without having to manually
                        save anything, and without having to worry about
                        re-entering anything. The tool also allows you to set
                        your own institution's grading scheme so that you get
                        the most accurate GPA calculations that are compatible
                        with your systems and curriculums.
                    </p>

                    <p className={pClasses}>
                        I also built it cuz I was bored...
                    </p>
                </section>

                <section>
                    <h2 className="font-bold text-2xl">Features</h2>

                    <ul className={pClasses + " list-disc flex flex-col gap-2"}>
                        <li>Appealing and user-friendly design</li>
                        <li>Real-time GPA calculation</li>
                        <li>Preserved data and results</li>
                        <li>Grading system customization</li>
                        <li>Sharing results via links</li>
                    </ul>
                </section>
            </article>
        </div>
    );
};

export default AboutUs;
