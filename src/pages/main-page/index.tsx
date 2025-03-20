import './style.css';
import Title from '@/layouts/title';
import { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/user';
import { getUnitsBySubHobby } from '@/lib/api';
import { useUnitsStore } from '@/stores/units';
import { UnitData } from '@/lib/supabase-client';
import MainCard from '@/components/MainComponents/MainCard';
import UnitButton from '@/components/MainComponents/UnitButton';
import ChallengeSection from '@/components/MainComponents/ChallengeSection';

function MainPage() {
  const nowChallenge = useUserStore((user) => user.now_challenge);
  const nowHobby = useUserStore((user) => user.now_hobby);

  const nowUnit = nowChallenge?.now_unit;

  const sectionList = useUnitsStore((units) => units.sections);
  const setSections = useUnitsStore((units) => units.setSections);

  const [openCardSection, setOpenCardSection] = useState<string | null>(null);

  useEffect(() => {
    if (nowChallenge && sectionList.length === 0) {
      getUnitsBySubHobby(nowChallenge.sub_hobby_name!.name)
        .then(({ data }) => {
          if (data) {
            const sections = new Map<number, UnitData[]>();

            for (const unit of data) {
              if (!sections.has(unit.section)) {
                sections.set(unit.section, []);
              }
              sections.get(unit.section)!.push(unit);
            }

            const orderedSectionList = Array.from(sections.entries())
              .sort(([a], [b]) => a - b)
              .map(([, sectionUnits]) =>
                sectionUnits.sort((a, b) => a.level - b.level)
              );

            const nextOrderedSections = { sections: orderedSectionList };
            setSections(nextOrderedSections);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [nowChallenge, setSections, sectionList]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (openCardSection && !target.closest(`#${openCardSection}`)) {
        setOpenCardSection(null);
      }
    };

    const handleESCKeyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenCardSection(null);
      }
    };

    globalThis.addEventListener('click', handleClick);
    globalThis.addEventListener('keyup', handleESCKeyEvent);

    return () => {
      globalThis.removeEventListener('click', handleClick);
      globalThis.removeEventListener('keyup', handleESCKeyEvent);
    };
  }, [openCardSection]);

  const handleExpand = (id: string | null) => {
    setOpenCardSection(id);
  };

  return (
    <>
      <Title>메인 페이지</Title>
      <main className="main-page">
        <h2 className="sr-only">메인 페이지</h2>
        {nowChallenge ? (
          <>
            <MainCard
              challengeName={nowChallenge.name}
              section={nowChallenge.now_unit!.section ?? 1}
              hobby={nowHobby!}
            />
            <ul className="main-page__section-list">
              {sectionList.map((item, index) => {
                return (
                  <li
                    className="main-page__section-li"
                    key={`section-${index}`}
                  >
                    <ChallengeSection
                      nowUnit={nowUnit!}
                      unitSection={item}
                      onExpand={handleExpand}
                      openCardSection={openCardSection}
                    />
                    <p className="main-page__section-list__divider">
                      {nowUnit!.section > item[0].section
                        ? `섹션 ${item[0].section}`
                        : '잠긴 섹션'}
                    </p>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <MainCard challengeName={null} section={null} hobby={nowHobby!} />
            <ul className="main-page__unit-list main-page__empty-section">
              <li>
                <UnitButton
                  id="empty-unit-1"
                  unitTitle="빈 유닛입니다."
                  onExpand={handleExpand}
                  isExpanded={openCardSection === 'empty-unit-1'}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-2"
                  unitTitle="빈 유닛입니다."
                  onExpand={handleExpand}
                  isExpanded={openCardSection === 'empty-unit-2'}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-3"
                  unitTitle="빈 유닛입니다."
                  onExpand={handleExpand}
                  isExpanded={openCardSection === 'empty-unit-3'}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-4"
                  unitTitle="빈 유닛입니다."
                  onExpand={handleExpand}
                  isExpanded={openCardSection === 'empty-unit-4'}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-5"
                  unitTitle="빈 유닛입니다."
                  onExpand={handleExpand}
                  isExpanded={openCardSection === 'empty-unit-5'}
                />
              </li>
            </ul>
            <p className="main-page__section-list__divider">잠긴 섹션</p>
          </>
        )}
      </main>
    </>
  );
}

export default MainPage;
