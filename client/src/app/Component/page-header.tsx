'use client'
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 border-b pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-headline font-semibold tracking-tight text-primary">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {actions && <div className="ml-4">{actions}</div>}
      </div>
    </div>
  );
}
