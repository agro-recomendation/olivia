// resources/js/Components/ProfileCard.jsx

export default function ProfileCard({ title, children, image }) {
    return (
        <div className="bg-[#2B5400] font-livvic text-white rounded-2xl p-8 relative overflow-hidden">
            <h2 className="text-xl mb-6">{title}</h2>
            {children}
            {image && (
                <img
                    src="Images/petani vector.png"
                    alt="Petani"
                    className="absolute right-4 w-40 h-auto object-contain hide-petani-xs"
                    style={{ bottom: '215px' }}
                />
            )}
        </div>
    );
}
