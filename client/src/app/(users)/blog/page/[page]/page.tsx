import BlogList from "../../BlogList";

export default async function BlogPagination({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;

  const pageNumber = Number(page) || 1;
  return <BlogList page={pageNumber} />;
}
