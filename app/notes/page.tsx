import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type NotesProps = {
  searchParams: { page: number; search: string };
};

const Notes = async ({ searchParams }: NotesProps) => {
  const currentPage = Number(searchParams.page) || 1;
  const search = searchParams.search || '';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', currentPage, search],
    queryFn: () => fetchNotes(currentPage, search),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
};

export default Notes;
