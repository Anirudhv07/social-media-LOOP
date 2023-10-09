import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'


dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Set to allow connections from all IPs
  },
  define: {
    'process.env.PROFILE_PIC_URL': JSON.stringify(process.env.PROFILE_PIC_URL),
    'process.env.POST_PIC_URL': JSON.stringify(process.env.POST_PIC_URL)
  },
})

