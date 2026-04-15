import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import BlogDetail from './partials/BlogDetail';

export default function BlogShow({ blog }) {
    if (!blog) {
        return null;
    }

    return (
        <>
            <Head title={`${blog.title} - Blog`} />
            <BlogDetail blog={blog} />
        </>
    );
}

BlogShow.layout = (page) => <AppLayout>{page}</AppLayout>;
