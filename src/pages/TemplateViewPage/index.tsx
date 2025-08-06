import { useParams } from 'react-router-dom';
import AlertSettingModal from './components/AlertSettingModal';

const TemplateViewPage = () => {
    const { id } = useParams();

    return (
        <>
            <p>템플릿 ID: {id}</p>
            <div className='w-full px-6 bg-[#fafafa]'>
                <AlertSettingModal onClose={() => console.log("close")} />
            </div>
        </>
    );
};

export default TemplateViewPage;
