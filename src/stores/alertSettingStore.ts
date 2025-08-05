import { create } from 'zustand';

type Meridiem = '오전' | '오후';
type Channel = '슬랙' | '구글 캘린더';

type Time = {
    hour: number;
    minute: number;
    meridiem: Meridiem;
};

interface AlertSettingState {
    // 시간 선택
    selectedTime: Time;
    setSelectedTime: (time: Time) => void;

    // 반복 요일 선택
    repeatDays: string[];
    toggleRepeatDay: (day: string) => void;

    // 특정 날짜 선택
    specificDate: string | null; // 'YYYY-MM-DD'
    setSpecificDate: (date: string | null) => void;

    // 메모 입력
    memo: string;
    setMemo: (memo: string) => void;

    // 알림 채널
    selectedChannels: Channel[];
    setSelectedChannels: (updater: (prev: Channel[]) => Channel[]) => void;

    // 시간 선택 모달 열림 여부
    showTimeSelect: boolean;
    setShowTimeSelect: (show: boolean) => void;

    // 채널 선택 모달 열림 여부
    showChannelSelect: boolean;
    setShowChannelSelect: (show: boolean) => void;

    // 서버 전송용 payload
    getPayload: () => {
        time: string;
        repeatDays?: string[];
        specificDate?: string;
        memo: string;
        channels: Channel[];
    };
}

export const useAlertSettingStore = create<AlertSettingState>((set, get) => ({
    selectedTime: {
        hour: 1,
        minute: 0,
        meridiem: '오전',
    },
    setSelectedTime: (time) => set({ selectedTime: time }),

    repeatDays: [],
    toggleRepeatDay: (day) => {
        const { repeatDays } = get();
        set({
            repeatDays: repeatDays.includes(day)
                ? repeatDays.filter((d) => d !== day)
                : [...repeatDays, day],
        });
    },

    specificDate: null,
    setSpecificDate: (date) => set({ specificDate: date }),

    memo: '',
    setMemo: (memo) => set({ memo }),

    selectedChannels: ['구글 캘린더'],
    setSelectedChannels: (updater) => {
        set((state) => ({
            selectedChannels: updater(state.selectedChannels),
        }));
    },

    showTimeSelect: false,
    setShowTimeSelect: (show) => set({ showTimeSelect: show }),

    showChannelSelect: false,
    setShowChannelSelect: (show) => set({ showChannelSelect: show }),

    getPayload: () => {
        const { selectedTime, repeatDays, specificDate, memo, selectedChannels } = get();
        const timeStr = `${selectedTime.meridiem} ${selectedTime.hour}:${selectedTime.minute
            .toString()
            .padStart(2, '0')}`;

        return {
            time: timeStr,
            ...(specificDate ? { specificDate } : { repeatDays }),
            memo,
            channels: selectedChannels,
        };
    },
}));
