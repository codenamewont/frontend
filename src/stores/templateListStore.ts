import { create } from 'zustand';

// 대시보드용 템플릿 리스트 타입
export type TemplateListItem = {
    templateNo: number;
    templateNm: string;         // 템플릿 이름
    categoryNm?: string;        // 카테고리 이름
    regDt: string;              // 생성일(정렬 기준)
    updDt: string;              // 수정일(정렬 기준)
    thumbnail?: string;         // 썸네일 URL
    isBookmarked?: boolean;     // 북마크 여부
    alarmDt?: string;           // 단발성 알림 일시
    repeatType?: boolean;       // true=반복, false=단발성
    alarmRepeatDay?: string;    // 반복 요일 (예: "월,화,수" 또는 "MON,TUE")
    alarmTime?: string;         // 반복 알림 시각 (예: "09:30" 또는 "0930")
    placeholder?: boolean;
};

type TemplateListStore = {
    templates: TemplateListItem[];
    setTemplates: (data: TemplateListItem[]) => void;
    clearTemplates: () => void;
};

export const useTemplateListStore = create<TemplateListStore>((set) => ({
    templates: [],
    setTemplates: (data) => set({ templates: data }),
    clearTemplates: () => set({ templates: [] }),
}));
