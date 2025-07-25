import React from 'react';
import { CheckIcon } from '../../../assets';

const TemplateSection: React.FC = () => {
    return (
        <section className='w-full max-w-[1200px] mx-auto flex px-4 pt-8 pb-[54px] flex-col justify-center items-start gap-6 self-stretch tablet:px-[60px] web:px-[120px] web:pt-[38px] web:pb-[75px] web:flex-row web:justify-start web:items-center web:self-auto'>
            <div className='h-[400px] rounded-[12px] bg-[#E6E6E6] tablet:h-[540px] web:w-[700px]'>이미지 삽입 예정</div>
            <article className='flex flex-col items-center gap-6 self-stretch tablet:gap-[54px] web:items-start web:flex-1 web:shrink-0'>
                <div className='flex flex-col items-center gap-4 self-stretch web:items-start'>
                    <p className='self-stretch text-[#141414] text-center font-pretendard text-[28px] font-bold tablet:text-[48px] web:text-left'>템플릿 생성</p>
                    <p className='self-stretch text-[#707070] text-center font-pretendard text-[16px] font-medium leading-[140%] tablet:self-auto tablet:text-left tablet:text-[18px]'>자주하는 일의 준비물과 과정을 간단하게 템플릿으로 만드세요</p>
                </div>
                <ul className='flex flex-col items-start gap-4 tablet:w-[353px]'>
                    <li className='flex items-center gap-4 tablet:self-stretch'>
                        <CheckIcon className='w-6 h-6'/>
                        <span className='text-[#141414] text-center font-pretendard text-[18px] font-medium leading-[140%] tablet:text-[22px]'>드래그 앤 드롭으로 직관적인 조작</span>
                    </li>
                    <li className='flex items-center gap-4 tablet:self-stretch'>
                        <CheckIcon className='w-6 h-6'/>
                        <span className='text-[#141414] text-center font-pretendard text-[18px] font-medium leading-[140%] tablet:text-[22px]'>카테고리별 분류 및 관리</span>
                    </li>
                    <li className='flex items-center gap-4 tablet:self-stretch'>
                        <CheckIcon className='w-6 h-6'/>
                        <span className='text-[#141414] text-center font-pretendard text-[18px] font-medium leading-[140%] tablet:text-[22px]'>할일 별 추천 준비물</span>
                    </li>
                </ul>
            </article>
        </section>
    );
};

export default TemplateSection;
