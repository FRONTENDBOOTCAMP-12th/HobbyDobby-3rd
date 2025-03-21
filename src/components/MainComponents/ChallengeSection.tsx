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
    <ul className="main-page__unit-list">
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
              name={unit.name}
              section={unit.section}
              level={unit.level}
              unitTitle={unit.title}
              buttonState={buttonState}
              maxUnit={unitSection.length}
              isExpanded={openCardSection === `unit-${unit.id}`}
              onExpand={onExpand}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default ChallengeSection;
