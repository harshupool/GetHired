const CompanyBasicInfoCard = ({
  formData,
  handleChange,
  editMode,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Company Name */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Company Name
          </label>

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            disabled={!editMode}
            className={`
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              transition
              ${
                editMode
                  ? "border-blue-300 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }
            `}
          />
        </div>

        {/* Company Website */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Company Website
          </label>

          <input
            type="text"
            name="companyWebsite"
            value={formData.companyWebsite}
            onChange={handleChange}
            disabled={!editMode}
            className={`
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              transition
              ${
                editMode
                  ? "border-blue-300 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }
            `}
          />
        </div>

        {/* Designation / Industry */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Designation / Industry
          </label>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            disabled={!editMode}
            className={`
              w-full
              rounded-xl
              border
              px-4
              py-3
              outline-none
              transition
              ${
                editMode
                  ? "border-blue-300 focus:ring-2 focus:ring-blue-500"
                  : "border-gray-200 bg-gray-100 cursor-not-allowed"
              }
            `}
          />
        </div>

      </div>
    </div>
  );
};

export default CompanyBasicInfoCard;