import { useParams } from 'react-router-dom';
import ViewHeader from './components/ViewHeader';

const TemplateViewPage = () => {
    const { id } = useParams();

    return (
        <>
            <p>템플릿 ID: {id}</p>
            <div className='w-full px-6 bg-[#fafafa]'>
                <ViewHeader />
            </div>
        </>
    );
};

export default TemplateViewPage;
