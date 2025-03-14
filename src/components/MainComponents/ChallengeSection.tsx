import { UnitData } from '@/lib/supabase-client';
import UnitButton from './UnitButton';

interface ChallengeSectionProps {
  unitSection: UnitData[];
  nowUnit: UnitData;
  onExpand: React.Dispatch<React.SetStateAction<string | null>>;
}

function ChallengeSection({
  unitSection,
  nowUnit,
  onExpand,
}: ChallengeSectionProps) {
  return (
    <ul>
      {unitSection.map((unit) => {
        const buttonState =
          nowUnit.name === unit.name
            ? 'now'
            : nowUnit.section > unit.section ||
                (nowUnit.section === unit.section && nowUnit.level > unit.level)
              ? 'complete'
              : 'disabled';

        return (
          <li key={unit.id}>
            <UnitButton
              id={`unit-${unit.id}`}
              unitTitle={unit.title}
              level={unit.level}
              buttonState={buttonState}
              maxUnit={unitSection.length}
              onExpand={onExpand}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ChallengeSection;
