const CompanyDescriptionCard = ({
  formData,
  handleChange,
  editMode,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-6">

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        About Company
      </h2>

      <div>

        <label className="block text-sm font-medium text-gray-600 mb-2">
          Company Description
        </label>

        <textarea
          name="companyDescription"
          value={formData.companyDescription}
          onChange={handleChange}
          disabled={!editMode}
          rows={8}
          placeholder="Tell candidates about your company..."
          className={`
            w-full
            rounded-xl
            border
            px-4
            py-3
            outline-none
            resize-none
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
  );
};

export default CompanyDescriptionCard;