import { useState, useEffect, useCallback, useMemo } from "react";
import Header from "../../components/Header";
import Button from "../../components/Button";
import { AddIcon } from "../../assets";
import AlignDropdown from "./components/AlignDropdown";
import CategoryTabs from "./components/CategoryTabs";
import TemplateGrid from "./components/TemplateGrid";
import EmptyState from "./components/EmptyState";
import Footer from "../../components/Footer";
import type { TemplateListItem } from "../../stores/templateListStore";

// API 응답 템플릿 타입 정의
interface ApiTemplate {
    templateNo: number;
    templateNm: string;
    cateNm: string;
    regDt: string;
    updDt?: string;
    isFavorite: "Y" | "N";
}

// API 응답 카운트 타입 정의
/*
interface TemplateCntList {
    totalCnt: number;
    totalDailyCnt: number;
    totalFavoriteCnt: number;
    totalOfficeCnt: number;
    totalTripCnt: number;
}
*/

// 더미 데이터
const DUMMY_TEMPLATES: TemplateListItem[] = [
    {
    templateNo: 1,
    templateNm: "출근 준비",
    categoryNm: "업무",
    regDt: "2025-08-01T10:00:00Z",
    updDt: "2025-08-01T10:00:00Z",
    isBookmarked: true,
    thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75"
    },
    {
    templateNo: 2,
    templateNm: "여행 짐 싸기",
    categoryNm: "여행",
    regDt: "2025-07-30T14:00:00Z",
    updDt: "2025-07-30T14:00:00Z",
    thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75"
    },
    {
    templateNo: 3,
    templateNm: "주간 업무 점검",
    categoryNm: "업무",
    regDt: "2025-07-29T08:30:00Z",
    updDt: "2025-07-29T10:00:00Z",
    thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75"
    },
    {
    templateNo: 4,
    templateNm: "헬스장 갈 준비",
    categoryNm: "생활",
    regDt: "2025-07-28T18:00:00Z",
    updDt: "2025-07-29T09:00:00Z",
    isBookmarked: true,
    thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75"
    },
    {
    templateNo: 5,
    templateNm: "출국 서류 확인",
    categoryNm: "여행",
    regDt: "2025-07-27T09:15:00Z",
    updDt: "2025-07-27T09:15:00Z",
    thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75"
    },
    {
    templateNo: 6,
    templateNm: "회의 준비",
    categoryNm: "업무",
    regDt: "2025-07-26T13:45:00Z",
    updDt: "2025-07-26T14:30:00Z",
    isBookmarked: true,
    thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75"
    },
];

const DashboardPage = () => {
    // 선택된 카테고리 상태
    const [selectedCategory, setSelectedCategory] = useState("전체");
    // 정렬 상태
    const [selectedAlign, setSelectedAlign] = useState("최근 수정일");

    // 카테고리별 개수 상태
    const [categoryCounts, setCategoryCounts] = useState({
        전체: 0,
        즐겨찾기: 0,
        업무: 0,
        생활: 0,
        여행: 0,
    });

    // 전체 템플릿 데이터
    const [allTemplates, setAllTemplates] = useState<TemplateListItem[]>([]);
    // 로딩 상태
    const [isLoading, setIsLoading] = useState(false);
    // 현재 화면에 보여줄 개수
    const [visibleCount, setVisibleCount] = useState(8);

    // onAlignChange: (option: string) => void;
    const handleAlignChange = (option: string) => {
        setSelectedAlign(option);
    };

    // onChange: (category: string) => void;
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
        setVisibleCount(8);
    };

    // 템플릿 불러오기 함수
    const fetchTemplates = useCallback(async () => {
        setIsLoading(true);
        const token = localStorage.getItem("token");

        try {
            // 카테고리 필터링, 정렬은 클라이언트에서 처리
            const response = await fetch("https://packupapi.xyz/temp/getUserTemplateDataList", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ page: 1, sort: 0 }),
            });

            if (!response.ok) {
                throw new Error("템플릿 불러오기 실패");
            }

            const responseData = await response.json();
            const templates: ApiTemplate[] = responseData.templateDataList || [];

            const converted: TemplateListItem[] = templates.map((t) => ({
                templateNo: t.templateNo,
                templateNm: t.templateNm,
                categoryNm: t.cateNm,
                regDt: t.regDt,
                updDt: t.updDt || t.regDt,
                isBookmarked: t.isFavorite === "Y",
                thumbnail: "https://core-cdn-fe.toss.im/image/optimize/?src=https://blog-cdn.tosspayments.com/wp-content/uploads/2021/08/28011146/semo9.png?&w=3840&q=75",
            }));

            setAllTemplates(converted);
        } catch (err) {
            console.error("템플릿 불러오기 실패: ", err);
            alert("템플릿을 불러오는 중 오류가 발생했습니다. 임시 데이터를 표시합니다.");
            setAllTemplates(DUMMY_TEMPLATES);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    // 카테고리 카운트 로컬 계산
    useEffect(() => {
        const total = allTemplates.length;
        const 즐겨찾기 = allTemplates.filter((t) => t.isBookmarked).length;
        const 업무 = allTemplates.filter((t) => t.categoryNm === "업무").length;
        const 생활 = allTemplates.filter((t) => t.categoryNm === "생활").length;
        const 여행 = allTemplates.filter((t) => t.categoryNm === "여행").length;
        setCategoryCounts({ 전체: total, 즐겨찾기, 업무, 생활, 여행 });
    }, [allTemplates]);

    // 필터 + 정렬 (클라이언트)
    const filteredSorted = useMemo(() => {
        // 필터
        let list = allTemplates.filter((t) => {
            if (selectedCategory === "전체") return true;
            if (selectedCategory === "즐겨찾기") return !!t.isBookmarked;
            return t.categoryNm === selectedCategory;
        });

        // 정렬
        const byDateDesc = (a?: string, b?: string) =>
            new Date(b || 0).getTime() - new Date(a || 0).getTime();

        switch (selectedAlign) {
            case "최근 수정일":
                list = [...list].sort((a, b) => byDateDesc(a.updDt, b.updDt));
                break;
            case "최근 생성일":
                list = [...list].sort((a, b) => byDateDesc(a.regDt, b.regDt));
                break;
            case "템플릿명":
                list = [...list].sort((a, b) => a.templateNm.localeCompare(b.templateNm));
                break;
            case "알림 시간 임박":
                // 서버 필드가 없다면 일단 수정일 기준으로 대체
                list = [...list].sort((a, b) => byDateDesc(a.updDt, b.updDt));
                break;
            default:
                break;
        }
        return list;
    }, [allTemplates, selectedCategory, selectedAlign]);

    // 현재 보여줄 템플릿 목록 (페이지네이션)
    const visibleTemplates = filteredSorted.slice(0, visibleCount);

    return (
        <div className='flex w-full flex-col items-start gap-[8px] bg-[#FAFAFA] min-h-screen'>
            <div className="flex flex-col items-center gap-[40px] mb-[40px] self-stretch flex-1">
                <Header />
                <div className="pt-[124px] mx-auto flex w-[1200px] justify-between items-center">
                    <div className="flex items-center gap-[31px]">
                        <h2 className="text-[#141414] text-center font-pretendard text-[26px] font-bold leading-normal">내 템플릿 목록</h2>
                        <Button className="w-[200px] h-11">
                            <AddIcon className="w-[18px] h-[18px]" />
                            <span className="text-white text-center font-pretendard text-[16px] font-medium leading-normal">새 템플릿</span>
                        </Button>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[#141414] font-pretendard text-[16px] font-medium leading-normal">정렬</span>
                        <AlignDropdown selectedAlign={selectedAlign} onAlignChange={handleAlignChange} />
                    </div>
                </div>
                <section className="flex w-[1200px] flex-col items-center gap-[32px]">
                    <CategoryTabs counts={categoryCounts} selected={selectedCategory} onChange={handleCategoryChange} />
                    {isLoading ? (
                        <div className="pt-[50px] flex justify-center items-center">
                            <p className="text-[#707070] text-center font-pretendard text-[16px] font-medium leading-[140%]">
                                템플릿을 불러오는 중...
                            </p>
                        </div>
                    ) : allTemplates.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <>
                            <TemplateGrid templates={visibleTemplates} />
                            {visibleCount < filteredSorted.length && (
                                <Button onClick={() => setVisibleCount(prev => prev + 8)} className="w-[343px] h-[50px]" variant="line">더보기</Button>
                            )}
                        </>
                    )}
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default DashboardPage;
