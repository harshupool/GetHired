const CompanyContactCard = ({
  formData,
  handleChange,
  editMode,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Contact Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Phone Number */}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
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

        {/* Company Location */}

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Company Location
          </label>

          <input
            type="text"
            name="location"
            value={formData.location}
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

export default CompanyContactCard;