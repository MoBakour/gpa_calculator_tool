import IconDelete from "../icons/IconDelete";
import IconX from "../icons/IconX";
import useDataStore from "../store/data.store";

const GradingSystem = () => {
    const {
        system,
        setSystem,
        settingsActive,
        setSettingsActive,
        letterGrades,
        setCustomGrades,
    } = useDataStore();

    const addLetter = () => {
        const newSystem = [
            ...JSON.parse(JSON.stringify(letterGrades.custom)),
            { letter: "", grade: "" },
        ];
        setCustomGrades(newSystem);
    };

    const removeLetter = (index) => {
        const newSystem = JSON.parse(JSON.stringify(letterGrades.custom));
        newSystem.splice(index, 1);
        setCustomGrades(newSystem);
    };

    const handleChangeGrade = (e, index, property) => {
        const newSystem = JSON.parse(JSON.stringify(letterGrades.custom));
        newSystem[index][property] = e.target.value;
        setCustomGrades(newSystem);
    };

    return (
        <div className="system-customizer flex justify-center items-center">
            <div
                className={`bg-white text-black w-[calc(100%-40px)] h-[calc(100%-80px)] overflow-y-auto sm:w-[600px] sm:h-[410px] p-4 rounded-lg fixed z-[11] transition ${
                    !settingsActive
                        ? "top-0 transform -translate-y-full"
                        : "top-10"
                }`}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">
                        Set your own grading system
                    </h2>
                    <button
                        title="Close"
                        className="text-3xl transition hover:opacity-60"
                        onClick={() => setSettingsActive(false)}
                    >
                        <IconX />
                    </button>
                </div>
                <div className="systems flex items-center gap-2 flex-col sm:flex-row">
                    <div className="flex gap-2 justify-center">
                        {Object.keys(letterGrades)
                            .filter((s) => s !== "custom")
                            .map((key) => (
                                <div
                                    className={`system ${
                                        system === key ? "selected" : ""
                                    }`}
                                    onClick={() => setSystem(key)}
                                    key={key}
                                >
                                    {letterGrades[key].map((grade, index) => (
                                        <p
                                            className="flex gap-2 font-bold"
                                            key={index}
                                        >
                                            <span className="block w-12 text-center text-violet-700">
                                                {grade.letter}
                                            </span>
                                            <span className="block w-12 text-center">
                                                {Number(grade.grade).toFixed(2)}
                                            </span>
                                        </p>
                                    ))}
                                </div>
                            ))}
                    </div>

                    <div
                        className={`system custom flex-1 h-auto sm:h-[332px] w-full sm:w-fit-content sm:w-auto overflow-y-auto ${
                            system === "custom" ? "selected" : ""
                        }`}
                        onClick={() => setSystem("custom")}
                    >
                        <h2 className="font-bold mb-2">
                            Custom Grading System
                        </h2>
                        <div className="grades">
                            {letterGrades.custom.map((letter, index) => (
                                <div
                                    className="grade py-1 flex gap-2"
                                    key={index}
                                >
                                    <input
                                        className="w-0 flex-[2] text-center"
                                        type="text"
                                        value={letter.letter}
                                        onChange={(e) =>
                                            handleChangeGrade(
                                                e,
                                                index,
                                                "letter"
                                            )
                                        }
                                        placeholder="A+"
                                    />
                                    <input
                                        className="w-0 flex-[2] text-center"
                                        type="number"
                                        value={letter.grade}
                                        onChange={(e) =>
                                            handleChangeGrade(e, index, "grade")
                                        }
                                        placeholder="4.00"
                                    />
                                    <button
                                        onClick={() => removeLetter(index)}
                                        className="w-0 flex-1 flex justify-center items-center transition hover:opacity-70"
                                    >
                                        <IconDelete />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={addLetter}
                            className="bg-violet-700 text-white w-full mt-2 py-1 rounded transition hover:opacity-90"
                        >
                            Add Letter Grade
                        </button>
                    </div>
                </div>
            </div>

            {/* darken */}
            <div
                className={`fixed top-0 left-0 w-screen h-screen z-10 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm transition ${
                    !settingsActive ? "opacity-0 pointer-events-none" : ""
                }`}
            ></div>
        </div>
    );
};

export default GradingSystem;
