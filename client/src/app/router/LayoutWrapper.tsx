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
      return <Layout showDock={true}>{children}</Layout>;
    
    case 'simple':
      return <SimpleLayout>{children}</SimpleLayout>;
    
    case 'auth':
      return <Layout showDock={false}>{children}</Layout>;
    
    default:
      return <Layout showDock={true}>{children}</Layout>;
  }
};

export default LayoutWrapper;