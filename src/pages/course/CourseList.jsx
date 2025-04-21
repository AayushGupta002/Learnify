import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../redux/slices/courseSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { Link } from "react-router-dom";

function CourseList() {
    const dispatch = useDispatch();
    const { courseList } = useSelector((state) => state.course);

    // Load courses when the component mounts
    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 pl-20 flex flex-col gap-10 text-white">
                <h1 className="text-center text-4xl font-semibold mb-5">
                    Explore Courses Made by { " " }
                    <span className="font-bold text-yellow-500">Industry Experts</span>
                </h1>
                <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
                    {/* Make sure to map through the courseList */}
                    {courseList && courseList.length > 0 ? (
                        courseList.map((element) => (
                            <div
                                key={element._id}
                                className="w-full bg-gray-800 p-5 rounded-md shadow-md transition-all hover:scale-105"
                            >
                                <h2 className="text-xl font-semibold text-yellow-500 mb-2">
                                    {element.title}
                                </h2>
                                <p className="text-gray-300 mb-4">{element.description}</p>
                                <p className="text-gray-400">
                                    Instructor: {element.createdBy}
                                </p>
                                <p className="text-yellow-500">
                                    Total Lectures: {element.numberOfLectures}
                                </p>

                                {/* View Course Button */}
                                <Link to={`/course/description`} state={element}>
                                    <button className="mt-4 bg-yellow-500 text-xl rounded-md font-bold px-5 py-3 w-full hover:bg-yellow-600 transition-all ease-in-out">
                                        View Course
                                    </button>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-white">No courses available at the moment.</div>
                    )}
                </div>
            </div>
        </HomeLayout>
    );
}

export default CourseList;
