import { useNavigate } from "react-router-dom";
import moment from "moment";
import SearchInput from '@/components/CustomInput/SearchInput';
import { useState } from 'react';

export const DashboardPage = () => {
    const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const courseData = [
    {
      _id: "1",
      name: "Full Stack Development",
      price: 25000,
      discount: 10,
      createdAt: new Date(),
      subCourses: [1, 2, 3],
    },
    {
      _id: "2",
      name: "UI/UX Design Masterclass",
      price: 18000,
      discount: 0,
      createdAt: new Date(),
      subCourses: [],
    },
    {
      _id: "3",
      name: "Digital Marketing Pro",
      price: 15000,
      discount: 20,
      createdAt: new Date(),
      subCourses: [1],
    },
  ];

  const truncateTitle = (title: string) =>
    title.length > 30 ? title.slice(0, 30) + "..." : title;

  const calculateTotalPrice = (course: any) => {
    if (course.discount) {
      return `₹${course.price - (course.price * course.discount) / 100}`;
    }
    return `₹${course.price}`;
  };

  return (
    <div className="flex h-screen bg-gray-25 overflow-hidden">
      <div className="flex flex-1 flex-col min-w-0 h-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 pt-4 px-4 gap-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Institute Dashboard
          </h1>

          <button
            className="w-full md:w-48 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition duration-200"
            onClick={() => alert("Static Mode: Add Course Disabled")}
          >
            + Add Course
          </button>
        </div>

        <div className="relative w-full mb-4 px-4">
         <SearchInput value={search} onChange={setSearch} placeholder="Search course" />
         </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {courseData.map((course) => (
              <div
                key={course._id}
                role="button"
                className="bg-white rounded-xl transition-all cursor-pointer h-full p-4 shadow-sm hover:shadow-md border border-gray-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="px-3 py-1 text-sm font-medium rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                    Course
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {moment(course.createdAt).format("DD/MM/YYYY")}
                  </div>
                </div>

                <h3 className="font-semibold text-lg text-gray-800 break-words mb-2">
                  {truncateTitle(course.name)}
                </h3>

                <div className="flex flex-wrap gap-2 mb-3">
                  {course.discount > 0 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {course.discount}% Off
                    </span>
                  )}

                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-pink-100 text-pink-700">
                    {course.subCourses.length > 0
                      ? `${course.subCourses.length} Sub-Courses`
                      : "No Sub-Courses"}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">
                    Total Price:
                  </span>
                  <span className="text-lg font-bold text-black">
                    {calculateTotalPrice(course)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
