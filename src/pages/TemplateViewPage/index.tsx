import { useParams } from 'react-router-dom';
import RepeatDayOption from "./components/AlertSettingModal/RepeatDayOption";

const TemplateViewPage = () => {
    const { id } = useParams();

    return (
        <>
            <p>템플릿 ID: {id}</p>
            <div className='w-[464px] px-6'>
                <RepeatDayOption />
            </div>
        </>
    );
};

export default TemplateViewPage;
