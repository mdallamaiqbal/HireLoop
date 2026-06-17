import { requireRole } from '@/app/lib/core/session';
import React from 'react';

const SeekerLayout =async ({children}) => {
   await requireRole('seeker')
    return children;
};

export default SeekerLayout;