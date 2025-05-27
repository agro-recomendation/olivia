// BackHeader.jsx
export default function BackHeader({ onBack, title }) {
    return (
        <div className="flex items-center space-x-4 cursor-pointer text-[#FFFA72]" onClick={onBack}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-9 h-9">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <h1 className="font-livvic font-bold text-4xl md:text-[35px] leading-tight text-[#FFFA72]">
                {title}
            </h1>
        </div>
    );
}