export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-md border border-transparent 
                bg-[#325700] hover:bg-[#4a7d00] 
                px-4 py-2 text-xs font-semibold uppercase tracking-widest 
                text-white transition duration-150 ease-in-out 
                focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 
                active:bg-[#2a4a00] 
                ${disabled ? 'opacity-25 cursor-not-allowed' : ''} ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
