'use client';

import BlogList from '../../page';

interface PageProps {
  params: { page: string };
}

export default function BlogPagination({ params }: PageProps) {
  const pageNumber = parseInt(params.page, 15) || 1;
  return <BlogList page={pageNumber} />;
}
