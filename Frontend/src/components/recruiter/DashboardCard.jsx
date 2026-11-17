const DashboardCard = ({
  title,
  value,
  icon,
  color = "bg-blue-600",
}) => {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      shadow-md
      hover:shadow-xl
      transition-all
      duration-300
      p-6
      flex
      items-center
      justify-between
      border
      border-gray-100
      "
    >
      {/* Left Section */}
      <div>
        <p className="text-gray-500 text-sm font-medium">
          {title}
        </p>

        <h2 className="text-3xl font-bold mt-2 text-gray-800">
          {value}
        </h2>
      </div>

      {/* Right Section */}
      <div
        className={`
          ${color}
          h-16
          w-16
          rounded-2xl
          flex
          items-center
          justify-center
          text-white
          text-2xl
          shadow-lg
        `}
      >
        {icon}
      </div>
    </div>
  );
};

export default DashboardCard;