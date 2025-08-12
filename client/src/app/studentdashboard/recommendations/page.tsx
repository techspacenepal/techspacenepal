import { PageHeader } from "@/app/Component/page-header";
import { RecommendationsForm } from "@/app/Component/recommendations-form";

export default function RecommendationsPage() {
  return (
    <>
      <PageHeader
        title="Personalized Recommendations"
        description="Leverage AI to discover courses and study paths tailored to your progress and learning style."
      />
      <RecommendationsForm />
    </>
  );
}
