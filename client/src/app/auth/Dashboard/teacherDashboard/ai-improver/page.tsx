import { AiImproverForm } from '@/app/Component/ai-improver-form';

export default function AiImproverPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Content Improver</h1>
        <p className="text-muted-foreground">
          Leverage AI to enhance your course materials based on real data.
        </p>
      </div>
      <AiImproverForm />
    </div>
  );
}
