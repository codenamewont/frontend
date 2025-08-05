import { useParams } from 'react-router-dom';
import RepeatDayOption from "./components/AlertSettingModal/RepeatDayOption";
import TimeSelectModal from './components/AlertSettingModal/TimeSelectModal';
import IntegrationGuideModal from './components/AlertSettingModal/IntegrationGuideModal';

const TemplateViewPage = () => {
    const { id } = useParams();

    return (
        <>
            <p>템플릿 ID: {id}</p>
            <div className='w-full px-6 bg-[#fafafa]'>
                <RepeatDayOption />
                <TimeSelectModal />
                <div className='w-[464px] px-6'>
                    <IntegrationGuideModal channel='슬랙' onConfirm={() => console.log("확인")} onCancel={() => console.log("취소")} />
                </div>
            </div>
        </>
    );
};

export default TemplateViewPage;
