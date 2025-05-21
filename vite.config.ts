import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['recharts', '@visx/axis', '@visx/scale', '@visx/group', '@visx/shape', 
              '@visx/gradient', '@visx/grid', '@visx/tooltip', '@visx/responsive', 
              '@visx/curve']
  }
});