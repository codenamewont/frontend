import { useState } from "react";
import { ViewToggleOffIcon, ViewToggleOnIcon, DividerIcon } from "../../../../assets";

const days = ["월", "화", "수", "목", "금", "토", "일"];

const baseButtonClass = "flex w-[38px] h-[38px] flex-col justify-center items-center rounded-lg font-pretendard text-[15px] font-medium leading-none";
const getButtonClass = (selected: boolean) => `${baseButtonClass} ${selected ? "bg-[#5736FF] text-white" : "bg-[#F0F0F0] text-[#141414]"}`;

const RepeatDayOption = () => {
    const [enabled, setEnabled] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const toggleDay = (day: string) => {
        setSelectedDays((prev) =>
            prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
        );
    };

    const selectAll = () => {
        if (selectedDays.length === 7) {
            setSelectedDays([]); // 전체 해제
        } else {
            setSelectedDays([...days]); // 전체 선택
        }
    };

    return (
        <div className="flex flex-col items-start gap-4 self-stretch">
            <div className="flex h-[32px] justify-between items-center self-stretch">
                <span className="text-[#141414] font-pretendard text-[18px] font-semibold leading-normal">반복요일</span>
                <button onClick={() => setEnabled((prev) => !prev)}>
                    {enabled ? <ViewToggleOnIcon className="w-14 h-8" /> : <ViewToggleOffIcon className="w-14 h-8" />}
                </button>
            </div>
            {enabled && (
                <div className="flex flex-col items-start gap-4 self-stretch">
                    <div className="flex pb-6 justify-center items-center gap-3 self-stretch">
                        <button onClick={selectAll} className={`${getButtonClass(selectedDays.length === 7)} !w-[56px]`}>매일</button>
                        <DividerIcon />
                        {days.map((day) => (
                            <button key={day} onClick={() => toggleDay(day)} className={getButtonClass(selectedDays.includes(day))}>{day}</button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepeatDayOption;
