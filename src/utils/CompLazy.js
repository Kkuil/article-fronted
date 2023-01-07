import React, { lazy, Suspense } from 'react';
import ScreenLoading from '@/components/ScreenLoading';

export default function CompLazy({ path }) {
    const Comp = lazy(() => import(`@/views${path}`));
    return (
        <Suspense fallback={<ScreenLoading />}>
            <Comp />
        </Suspense>
    )
}