import { Radio, RadioGroup } from '@headlessui/react';
import { MissionType } from '../../type';

const formatOptions = [
  { name: 'webp' },
  { name: 'avif' },
  { name: 'jpeg' },
  { name: 'png' },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type MissionInputsProps = {
  mission: MissionType;
  setMission: React.Dispatch<React.SetStateAction<MissionType>>;
};

export default function MissionInputs({ mission, setMission }: MissionInputsProps) {

  const handleQualityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setMission((prev) => ({ ...prev, quality: value }));
  };

  return (
    <div className="flex flex-col w-full max-w-4xl gap-6 text-white mb-6">
      <fieldset aria-label="Choisir un format de sortie">
        <div className="text-sm/6 font-medium text-white mb-1">Format de sortie</div>

        <RadioGroup
          value={mission.outputType}
          onChange={(value) => setMission((prev) => ({ ...prev, outputType: value }))}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {formatOptions.map((option) => (
            <Radio
              key={option.name}
              value={option.name}
              className={({ checked }) =>
                classNames(
                  'flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold uppercase ring-1 ring-gray-400',
                  checked
                    ? 'bg-indigo-600 text-white ring-0 hover:bg-indigo-500'
                    : 'bg-white text-gray-800 hover:bg-gray-100'
                )
              }
            >
              {option.name}
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>

      <div className="flex flex-col">
        <label htmlFor="quality" className="text-sm/6 font-medium text-white ">
          Qualité de sortie
        </label>
        <span className='text-xs text-gray-400 mb-2'>0 très compressé - 100 quasi aucune perte</span>
        <input
          type="number"
          id="quality"
          min={0}
          max={100}
          defaultValue={80}
          value={mission.quality ?? 80}
          onChange={handleQualityChange}
          className="w-32 px-3 py-2 rounded-md text-gray-200 border border-gray-400 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>
    </div>
  );
}
