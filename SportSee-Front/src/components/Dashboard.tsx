import Title from "./Title";
import DailyActivities from "./DailyActivities";
import SessionTime from "./SessionTime";
import Performance from "./Performance";
import Score from "./Score";
import Infos from "./Infos";

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
