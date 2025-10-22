const HeaderTitle = ({ title, actions }) => {
    return (
        <div className="flex justify-between items-center mb-6 p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
            <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
                {title}
            </h1>
            
            <div className="flex items-center gap-4">
                {actions}
            </div>
        </div>
    );
};

export default HeaderTitle;