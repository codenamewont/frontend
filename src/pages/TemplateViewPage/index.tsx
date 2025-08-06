import { useParams } from 'react-router-dom';
import ShareButton from './components/ViewHeader/ShareButton';

const TemplateViewPage = () => {
    const { id } = useParams();

    return (
        <>
            <p>템플릿 ID: {id}</p>
            <div className='w-full px-6 bg-[#fafafa]'>
                <ShareButton />
            </div>
        </>
    );
};

export default TemplateViewPage;
