import { Fragment, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
    format,
    addMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameDay,
    isBefore,
} from "date-fns";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

const TailwindDatePicker = ({ selectedDate, onDateChange, bookedDates = [] }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const days = eachDayOfInterval({
        start: startOfWeek(startOfMonth(currentMonth)),
        end: endOfWeek(endOfMonth(currentMonth)),
    });

    const isBooked = (date) =>
        bookedDates.some((b) => isSameDay(new Date(b), date));

    const isDisabled = (date) => isBefore(date, new Date());

    return (
        <Popover className="relative w-full">
            {({ open }) => (
                <>
                    <Popover.Button className="w-full text-left bg-white border border-gray-300 rounded-lg px-4 py-2 shadow-sm hover:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                        <span>{selectedDate ? format(new Date(selectedDate), "PPP") : "Select a date"}</span>
                        <CalendarDaysIcon className="h-5 w-5 ml-2 inline text-gray-500" />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Popover.Panel className="absolute z-10 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                            <div className="flex justify-between items-center mb-4">
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
                                    className="text-sm text-pink-500 hover:underline"
                                >
                                    ← Prev
                                </button>
                                <span className="font-semibold text-gray-800">
                                    {format(currentMonth, "MMMM yyyy")}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                    className="text-sm text-pink-500 hover:underline"
                                >
                                    Next →
                                </button>
                            </div>
                            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-500 mb-2">
                                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                                    <div key={day}>{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {days.map((day) => {
                                    const booked = isBooked(day);
                                    const disabled = isDisabled(day);

                                    return (
                                        <button
                                            type="button"
                                            key={day}
                                            onClick={() => {
                                                if (!disabled && !booked) {
                                                    onDateChange(format(day, "yyyy-MM-dd"));
                                                }
                                            }}
                                            disabled={disabled}
                                            className={`rounded-lg p-2 text-sm font-medium
                                                ${booked ? "bg-red-500 text-white" : ""}
                                                ${disabled ? "text-gray-300 cursor-not-allowed" : ""}
                                                ${isSameDay(new Date(selectedDate), day) ? "bg-green-500 text-white" : ""}
                                                ${!booked && !disabled && !isSameDay(new Date(selectedDate), day) ? "hover:bg-pink-100 text-gray-700" : ""}
                                            `}
                                        >
                                            {format(day, "d")}
                                        </button>
                                    );
                                })}
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default TailwindDatePicker;
