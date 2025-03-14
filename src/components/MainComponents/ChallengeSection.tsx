import { UnitData } from '@/lib/supabase-client';
import UnitButton from './UnitButton';

interface ChallengeSectionProps {
  unitSection: UnitData[];
  nowUnit: UnitData;
  openCardSection: string | null;

  onExpand: (id: string | null) => void;
}

function ChallengeSection({
  nowUnit,
  unitSection,
  openCardSection,
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
              isExpanded={openCardSection === `unit-${unit.id}`}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ChallengeSection;
