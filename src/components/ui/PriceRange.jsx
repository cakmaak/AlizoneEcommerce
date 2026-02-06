const PriceRange = ({ value, onChange }) => {
  return (
    <div>
      <h3 className="font-semibold text-gray-700 mb-2 text-sm">Fiyat Aralığı</h3>

      <div className="space-y-3">

        <input
          type="range"
          min={0}
          max={200000}
          step={1000}
          value={value[1]}
          onChange={(e) => onChange([0, Number(e.target.value)])}
          className="w-full accent-indigo-600"
        />

        <div className="flex justify-between text-sm font-semibold text-gray-600">
          <span>₺ {value[0].toLocaleString()}</span>
          <span>₺ {value[1].toLocaleString()}</span>
        </div>

      </div>
    </div>
  );
};

export default PriceRange;