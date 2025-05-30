import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export default forwardRef(function TextInput(
    { type = 'text', className = '', isFocused = false, ...props },
    ref,
) {
    const localRef = useRef(null);

    useImperativeHandle(ref, () => ({
        focus: () => localRef.current?.focus(),
    }));

    useEffect(() => {
        if (isFocused) {
            localRef.current?.focus();
        }
    }, [isFocused]);

    return (
    <input
        {...props}
        type={type}
        className={
            'rounded-md border border-gray-300 shadow-sm ' +
            'hover:border-[#4a7d00] focus:border-[#325700] focus:ring-[#325700] ' +
            'dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 ' +
            'dark:focus:border-[#325700] dark:focus:ring-[#325700] ' +
            'transition duration-150 ease-in-out ' +
            className
        }
        ref={localRef}
    />
);

});
