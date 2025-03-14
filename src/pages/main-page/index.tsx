import './style.css';
import MainCard from '@/components/MainComponents/MainCard';
import UnitButton from '@/components/MainComponents/UnitButton';
import Title from '@/layouts/title';
import { getUnitsBySubHobby } from '@/lib/api';
import { UnitData } from '@/lib/supabase-client';
import { useUserStore } from '@/stores/user';
import { useEffect, useState } from 'react';
import ChallengeSection from './../../components/MainComponents/ChallengeSection';

function MainPage() {
  const nowChallenge = useUserStore((store) => store.now_challenge);
  const nowHobby = useUserStore((store) => store.now_hobby);

  const nowUnit = nowChallenge?.now_unit;

  const [sectionList, setSectionList] = useState<UnitData[][]>([]);

  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  useEffect(() => {
    if (nowChallenge) {
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

            setSectionList(orderedSectionList);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  }, [nowChallenge]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (expandedCardId && target.closest(`#${expandedCardId}`)) {
        setExpandedCardId(null);
      }
    };

    const handleESCKeyEvent = (e: KeyboardEvent) => {
      if (expandedCardId && e.key === 'Escape') {
        setExpandedCardId(null);
      }
    };

    globalThis.addEventListener('click', handleClick);
    globalThis.addEventListener('keyup', handleESCKeyEvent);

    return () => {
      globalThis.removeEventListener('click', handleClick);
      globalThis.removeEventListener('keyup', handleESCKeyEvent);
    };
  }, []);

  return (
    <>
      <Title>메인 페이지</Title>
      <main className="main-page">
        <h2 className="sr-only">메인 페이지</h2>
        {nowChallenge ? (
          <>
            <MainCard
              challengeName={nowChallenge.name}
              section={nowChallenge.now_unit?.section ?? 1}
              hobby={nowHobby!.name}
            />
            <ul>
              {sectionList.map((item, index) => {
                return (
                  <li key={`section-${index}`}>
                    <ChallengeSection
                      nowUnit={nowUnit!}
                      unitSection={item}
                      onExpand={setExpandedCardId}
                    />
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <MainCard
              challengeName={null}
              section={null}
              hobby={nowHobby!.name}
            />
            <ul>
              <li>
                <UnitButton
                  id="empty-unit-1"
                  unitTitle="빈 유닛입니다."
                  onExpand={setExpandedCardId}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-2"
                  unitTitle="빈 유닛입니다."
                  onExpand={setExpandedCardId}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-3"
                  unitTitle="빈 유닛입니다."
                  onExpand={setExpandedCardId}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-4"
                  unitTitle="빈 유닛입니다."
                  onExpand={setExpandedCardId}
                />
              </li>
              <li>
                <UnitButton
                  id="empty-unit-5"
                  unitTitle="빈 유닛입니다."
                  onExpand={setExpandedCardId}
                />
              </li>
            </ul>
          </>
        )}
      </main>
    </>
  );
}

export default MainPage;
