import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import { Text, View } from "react-native";
import { GlobalContext } from "../../../context/GlobalContext";

const Day = ({ day, rowIdx }) => {

  const [dayEvents, setDayEvents] = useState([]);
  
  const {
    setDaySelected,
    setShowEventModal,
    filteredEvents,
    setSelectedEvent,
  } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <View className="border border-gray-200 flex flex-col">
      <View className="flex flex-col items-center">
        {rowIdx === 0 && (
          <Text className="text-xs mt-1">
            {day.format("ddd").toUpperCase()}
          </Text>
        )}
        <Text
          className={`text-xs p-1 my-1 text-center  ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
        </Text>
      </View>
      <View
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((evt, idx) => (
          <View
            key={idx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {evt.title}
          </View>
        ))}
      </View>
    </View>
  );
}

export default Day;