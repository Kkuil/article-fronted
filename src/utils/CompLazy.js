import React, { lazy, Suspense } from 'react';

export default function CompLazy({ path }) {
    const Comp = lazy(() => import(`@/views${path}`));
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Comp />
        </Suspense>
    )
}