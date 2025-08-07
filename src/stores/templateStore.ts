import { create } from "zustand";
import api from "../api/axiosInstance";

interface StepObject {
    cateNo: number;
    objNo: number;
    objNm: string;
    locNum: number;
}

interface StepText {
    text: string;
    stepTextX: number;
    stepTextY: number;
}

interface Step {
    step: number;
    stepX: number;
    stepY: number;
    stepObjList: StepObject[];
    stepTextList: StepText[];
}

interface TemplateData {
    templateNo: number;
    templateNm: string;
    userNo: number;
    userId: string;
    imgFile: string;
    stepsList: Step[];

    alarmDt?: string | null;
    repeatType?: string | null;
    alarmRepeatDay?: string[] | null;
    alarmTime?: string | null;
}

interface TemplateState {
    templateData: TemplateData | null;
    fetchTemplate: (templateNo: number, userNo: number) => Promise<void>;
    clearTemplate: () => void;
}

export const useTemplateStore = create<TemplateState>((set) => ({
    templateData: null,

    fetchTemplate: async (templateNo) => {
        try {
            const res = await api.post("/temp/getDetailData", { templateNo });
            if (res.data.responseText === "success") {
                set({ templateData: res.data.templateData });
            } else {
                console.error(res.data.message || "템플릿 불러오기 실패");
            }
        } catch (err) {
            console.error("템플릿 API 호출 실패:", err);
        }
    },

    clearTemplate: () => set({ templateData: null }),
}));
