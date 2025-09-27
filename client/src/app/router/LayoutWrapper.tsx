import React from 'react';
import type { LayoutType } from './types';
import Layout from '../../shared/components/layout/Layout';
import SimpleLayout from '../../shared/components/layout/SimpleLayout';

interface LayoutWrapperProps {
  children: React.ReactNode;
  layout?: LayoutType;
}

const LayoutWrapper: React.FC<LayoutWrapperProps> = ({ children, layout = 'main' }) => {
  switch (layout) {
    case 'main':
      return <Layout>{children}</Layout>;
    
    case 'simple':
      return <SimpleLayout>{children}</SimpleLayout>;
    
    case 'auth':
      return <SimpleLayout>{children}</SimpleLayout>; // auth ahora usa SimpleLayout
    
    default:
      return <Layout>{children}</Layout>; // por defecto usa main layout
  }
};

export default LayoutWrapper;