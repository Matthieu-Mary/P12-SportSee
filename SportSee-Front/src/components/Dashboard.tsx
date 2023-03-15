import Title from "./Title";
import DailyActivities from "./DailyActivities";
import SessionTime from "./SessionTime";
import Performance from "./Performance";
import Score from "./Score";
import Infos from "./Infos";

/**
 * Dashboard component
 * 
 * @return { ReactElement } return a section with all the charts
 */


// Type Props will be defined in each childs components
type Props = {
    data: any
};

export default function Dashboard({data}: Props) {
  return (
    <section className="dashboard">
      <Title userName={data?.dataInfos.userInfos.firstName} />
      <DailyActivities userActivity={data?.dataActivity} />
      <SessionTime userAverageSession={data?.dataProgression} />
      <Performance userPerformance={data?.dataPerformance} />
      <Score userScore={data?.dataInfos} />
      <Infos userInfos={data?.dataInfos} />
    </section>
  );
}
