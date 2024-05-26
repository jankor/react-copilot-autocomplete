import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './docs'
  },
  plugins: [
    react(),
    //dts({
    //  insertTypesEntry: true,
    //  rollupTypes: true,
    //}),
  ],
  /*
  build: {
    lib: {
      entry: './src/AutocompleteArea.tsx',
      formats: ['es']
      },
    rollupOptions: {      
      external: ['react', 'react-dom'],
      output: {        
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',          
        },
      },
    },
  },*/
})
