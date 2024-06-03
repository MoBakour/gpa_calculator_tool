import { useEffect, useState } from "react";
import IconDelete from "../icons/IconDelete";
import IconEye from "../icons/IconEye";
import IconEyeInvisible from "../icons/IconEyeInvisible";
import ShareButton from "./ShareButton";
import Button from "./Button";
import { calculateGpa, getColor } from "../utils/calculate";
import useDataStore from "../store/data.store";
import IconBxsPencil from "../icons/IconBxsPencil";
import { ReactSortable } from "react-sortablejs";
import { Grade } from "../types";

const Calculator = () => {
	const {
		setSettingsActive,
		content,
		setContent,
		letterGrades,
		setCustomGrades,
		system,
		setSystem,
	} = useDataStore();

	// states
	const [gpa, setGpa] = useState<{
		semesters: (number | undefined)[];
		CGPA: number;
	}>({
		semesters: [],
		CGPA: 0,
	});

	// onChange handlers
	const handleChangeCourse = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
		semesterIndex: number,
		courseId: string,
		property: string
	) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent[semesterIndex].content.find((i: Grade) => i.id === courseId)[
			property
		] = e.target.value;
		setContent(newContent);

		// make sure to override older values in localStorage if user comes from a share link
		setSystem(system);
		setCustomGrades(letterGrades.custom);
	};

	// onClick handlers
	const addCourse = (
		_e: React.MouseEvent<HTMLButtonElement>,
		semesterIndex: number
	) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent[semesterIndex].content.push({
			// id: (Math.floor(Math.random() * 100) + 100).toString() + Date.now(),
			id: crypto.randomUUID(),
			name: "",
			credits: "",
			letter: "",
		});
		setContent(newContent);
	};

	const removeCourse = (
		_e: React.MouseEvent<HTMLButtonElement>,
		semesterIndex: number,
		courseId: string
	) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent[semesterIndex].content = newContent[
			semesterIndex
		].content.filter((i: Grade) => i.id !== courseId);
		setContent(newContent);
	};

	const addSemester = (_e: React.MouseEvent<HTMLButtonElement>) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent.push({ active: true, content: [] });
		setContent(newContent);
	};

	const removeSemester = (
		_e: React.MouseEvent<HTMLButtonElement>,
		semesterIndex: number
	) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent.splice(semesterIndex, 1);
		setContent(newContent);
	};

	const toggleSemester = (
		_e: React.MouseEvent<HTMLButtonElement>,
		semesterIndex: number
	) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent[semesterIndex].active = !newContent[semesterIndex].active;
		setContent(newContent);
	};

	const handleSort = (newOrder: Grade[], semesterIndex: number) => {
		const newContent = JSON.parse(JSON.stringify(content));
		newContent[semesterIndex].content = newOrder;
		setContent(newContent);
	};

	/**
	 * on 'content' state change.
	 * - calculate new content data GPA and reset gpa state.
	 */
	useEffect(() => {
		const result = calculateGpa(
			JSON.parse(JSON.stringify(content)),
			letterGrades[system]
		);
		setGpa(result);
	}, [content]);

	const elements = content.map((courses, semesterIndex) => (
		<div
			className={`semester p-3 transition ${
				courses.active ? "" : "opacity-50"
			}`}
			key={semesterIndex}
		>
			<header className="flex justify-between">
				<h2 className="text-lg sm:text-xl font-bold">
					Semester {semesterIndex + 1}
				</h2>
				<div className="flex justify-center items-center gap-2">
					<button
						className="transition hover:scale-90"
						title={`${
							courses.active ? "Exclude" : "Include"
						} semester ${semesterIndex + 1}`}
						onClick={(e) => toggleSemester(e, semesterIndex)}
					>
						{courses.active ? <IconEye /> : <IconEyeInvisible />}
					</button>
					<button
						className="transition hover:scale-90"
						title={`Delete semester ${semesterIndex + 1}`}
						onClick={(e) => removeSemester(e, semesterIndex)}
					>
						<IconDelete />
					</button>
				</div>
			</header>
			<div className="content p-1 sm:p-3 flex flex-col items-center relative">
				<ReactSortable
					className="courses flex flex-col gap-2 sm:gap-3"
					list={courses.content}
					setList={(newOrder: Grade[]) =>
						handleSort(newOrder, semesterIndex)
					}
				>
					{courses.content.map((course) => (
						<div
							className="course flex gap-3 sm:gap-4"
							key={course.id}
						>
							<input
								type="text"
								placeholder="Course name"
								value={course.name}
								title={course.name}
								className="bg-transparent"
								onChange={(e) =>
									handleChangeCourse(
										e,
										semesterIndex,
										course.id,
										"name"
									)
								}
							/>
							<input
								type="number"
								placeholder="Credits"
								value={course.credits}
								className="bg-transparent w-16"
								onChange={(e) =>
									handleChangeCourse(
										e,
										semesterIndex,
										course.id,
										"credits"
									)
								}
							/>
							<select
								name="grade"
								id="grade"
								value={course.letter}
								className="bg-gray-700 rounded"
								onChange={(e) =>
									handleChangeCourse(
										e,
										semesterIndex,
										course.id,
										"letter"
									)
								}
							>
								<option value="">-</option>
								{letterGrades[system].map((letter, index) => (
									<option key={index} value={letter.letter}>
										{letter.letter}
									</option>
								))}
							</select>
							<button
								className="transition hover:scale-90"
								title="Delete course"
								onClick={(e) =>
									removeCourse(e, semesterIndex, course.id)
								}
							>
								<IconDelete />
							</button>
						</div>
					))}
				</ReactSortable>

				<Button
					size="small"
					className="bg-sky-500 mt-3"
					onClick={(e) => addCourse(e, semesterIndex)}
				>
					Add Course
				</Button>

				<div
					className={`absolute bottom-4 left-0 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getColor(
						Number(gpa.semesters[semesterIndex]),
						letterGrades[system]
					)}`}
				>
					{" "}
					{!isNaN(Number(gpa.semesters[semesterIndex]))
						? Number(gpa.semesters[semesterIndex]).toFixed(2)
						: ""}
				</div>
			</div>
		</div>
	));

	return (
		<div className="calculator p-6 flex flex-col gap-3 md:flex-row justify-evenly items-center mb-20">
			{/* grading system */}
			<div className="flex flex-col items-center gap-3">
				<div className="semesters w-[400px]">{elements}</div>

				<Button className="bg-violet-700" onClick={addSemester}>
					Add Semester
				</Button>
			</div>

			{!isNaN(gpa.CGPA) && (
				<div className="mt-6 md:mt-0 md:w-[180px] relative text-center flex justify-center items-center">
					<div className="md:fixed md:top-1/2 md:-translate-y-1/2 flex flex-col justify-center items-center gap-2">
						<p>Your cumulative GPA is</p>
						<p
							className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${getColor(
								Number(gpa.CGPA),
								letterGrades[system]
							)}`}
						>
							{Number(gpa.CGPA).toFixed(2)}
						</p>
						<ShareButton />
						<button
							className="text-sm transition text-white/50 hover:text-white/70 flex justify-center items-center gap-1"
							onClick={() => setSettingsActive(true)}
						>
							<span>Change grading system</span>
							<IconBxsPencil className="text-lg" />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Calculator;
