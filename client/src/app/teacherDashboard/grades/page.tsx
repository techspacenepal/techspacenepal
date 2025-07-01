import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart } from 'lucide-react';

export default function GradesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Grade Management</h1>
        <p className="text-muted-foreground">
          Tools for grading assignments, providing feedback, and managing student performance.
        </p>
      </div>

      <Card className="flex flex-col items-center justify-center text-center p-12">
        <CardHeader>
            <div className="mx-auto bg-muted rounded-full p-4 w-fit">
                <BarChart className="h-12 w-12 text-muted-foreground" />
            </div>
            <CardTitle className="mt-4">Coming Soon</CardTitle>
            <CardDescription>
                Our advanced grade management tools are currently under development. <br />
                Soon you'll be able to grade assignments, track performance, and provide detailed feedback right here.
            </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Stay tuned for updates!</p>
        </CardContent>
      </Card>
    </div>
  );
}
